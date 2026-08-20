import { AssessmentRepository } from "@/repositories/assessment.repository";

import { AIAnalysisService } from "./ai-analysis.service";
import { AIChatService } from "./ai-chat.service";

import { createClient } from "@/lib/supabase/server";

import {
  AssessmentQuestion,
  AssessmentSubmission,
  AssessmentCategory,
} from "@/types/assessment";

export class AssessmentService {
  // ============================================
  // QUESTIONS
  // ============================================

  /**
   * Get all active assessment questions.
   */
  static async getQuestions(): Promise<
    AssessmentQuestion[]
  > {
    return await AssessmentRepository.getAllQuestions();
  }

  // ============================================
  // LATEST ASSESSMENT
  // ============================================

  /**
   * Get the latest assessment of the
   * currently authenticated user.
   */
  static async getLatestAssessment() {
    const user =
      await AssessmentRepository.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    const assessment =
      await AssessmentRepository.getLatestAssessment(
        user.id
      );

    if (!assessment) {
      throw new Error("No assessment found.");
    }

    return assessment;
  }

  // ============================================
  // SUBMIT ASSESSMENT
  // ============================================

  /**
   * Submit assessment.
   *
   * This method:
   * 1. Validates questions
   * 2. Calculates score
   * 3. Creates assessment
   * 4. Saves answers
   *
   * Gemini analysis is NOT performed here.
   */
  static async submitAssessment(
    payload: AssessmentSubmission
  ) {
    const user =
      await AssessmentRepository.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    // --------------------------------------------
    // 1. Get submitted question IDs
    // --------------------------------------------

    const questionIds =
      payload.answers.map(
        (answer) => answer.questionId
      );

    // --------------------------------------------
    // 2. Validate questions
    // --------------------------------------------

    const questions =
      await AssessmentRepository.getQuestionsByIds(
        questionIds
      );

    if (
      questions.length !==
      payload.answers.length
    ) {
      throw new Error(
        "Invalid assessment questions."
      );
    }

    // --------------------------------------------
    // 3. Calculate score
    // --------------------------------------------

    const score =
      this.calculateScore(
        payload.answers,
        questions
      );

    // --------------------------------------------
    // 4. Calculate category scores
    // --------------------------------------------

    const categoryScores =
      this.calculateCategoryScores(
        payload.answers,
        questions
      );

    // --------------------------------------------
    // 5. Determine initial mental state
    // --------------------------------------------

    const mentalState =
      this.getMentalState(score);

    // --------------------------------------------
    // 6. Create assessment
    // --------------------------------------------

    const assessment =
      await this.createAssessment(
        user.id,
        score,
        mentalState
      );

    // --------------------------------------------
    // 7. Save answers
    // --------------------------------------------

    await this.saveAnswers(
      assessment.id,
      payload.answers,
      questions
    );

    // --------------------------------------------
    // 8. Return immediately
    // --------------------------------------------

    return {
      assessmentId: assessment.id,
      score,
      mentalState,
      categoryScores,
      status: "processing" as const,
    };
  }

  // ============================================
  // AI ANALYSIS
  // ============================================

  /**
   * Run AI analysis for an assessment.
   *
   * Flow:
   *
   * processing
   *      ↓
   * analyzing
   *      ↓
   * Gemini
   *      ↓
   * completed
   *      ↓
   * AI Counselor conversation
   *
   * If analysis fails:
   *
   * analyzing
   *      ↓
   * failed
   */
  static async analyzeAssessment(
    assessmentId: string
  ) {
    const user =
      await AssessmentRepository.getCurrentUser();

    if (!user) {
      throw new Error("Unauthorized");
    }

    // --------------------------------------------
    // 1. Get assessment
    // --------------------------------------------

    const assessment =
      await AssessmentRepository.getAssessmentById(
        assessmentId
      );

    if (!assessment) {
      throw new Error(
        "Assessment not found."
      );
    }

    // --------------------------------------------
    // 2. Security check
    // --------------------------------------------

    if (
      assessment.user_id !==
      user.id
    ) {
      throw new Error(
        "You are not allowed to analyze this assessment."
      );
    }

    // --------------------------------------------
    // 3. Prevent duplicate analysis
    // --------------------------------------------

    if (
      assessment.status ===
      "completed"
    ) {
      return {
        assessmentId: assessment.id,
        status: "completed" as const,
      };
    }

    if (
      assessment.status ===
      "analyzing"
    ) {
      return {
        assessmentId: assessment.id,
        status: "analyzing" as const,
      };
    }

    // --------------------------------------------
    // 4. Mark as analyzing
    // --------------------------------------------

    await AssessmentRepository.updateAssessment(
      assessment.id,
      {
        status: "analyzing",
      }
    );

    try {
      // ------------------------------------------
      // 5. Load saved answers
      // ------------------------------------------

      const supabaseAnswers =
        await AssessmentRepository.getAssessmentAnswers(
          assessmentId
        );

      if (
        !supabaseAnswers.length
      ) {
        throw new Error(
          "Assessment answers not found."
        );
      }

      // ------------------------------------------
      // 6. Load questions
      // ------------------------------------------

      const questionIds =
        supabaseAnswers.map(
          (answer) =>
            answer.question_id
        );

      const questions =
        await AssessmentRepository.getQuestionsByIds(
          questionIds
        );

      if (!questions.length) {
        throw new Error(
          "Assessment questions not found."
        );
      }

      // ------------------------------------------
      // 7. Convert DB answers
      // ------------------------------------------

      const answers: AssessmentSubmission["answers"] =
        supabaseAnswers.map(
          (answer) => ({
            questionId:
              answer.question_id,

            selectedValue:
              answer.selected_value,
          })
        );

      // ------------------------------------------
      // 8. Run Gemini analysis
      // ------------------------------------------

      const aiResult =
        await AIAnalysisService.analyze(
          questions,
          answers,
          assessment.score
        );

      // ------------------------------------------
      // 9. Normalize confidence
      // ------------------------------------------

      const confidence = Math.round(
        aiResult.confidence
      );

      // ------------------------------------------
      // 10. Save AI result
      // ------------------------------------------

      const updatedAssessment =
        await AssessmentRepository.updateAssessment(
          assessment.id,
          {
            confidence,

            mental_state:
              aiResult.mentalState,

            ai_summary:
              aiResult.summary,

            stress:
              aiResult.categories
                .stress.level,

            anxiety:
              aiResult.categories
                .anxiety.level,

            depression:
              aiResult.categories
                .depression.level,

            burnout:
              aiResult.categories
                .burnout.level,

            sleep:
              aiResult.categories
                .sleep.level,

            focus:
              aiResult.categories
                .focus.level,

            social:
              aiResult.categories
                .social.level,

            ai_analysis:
              aiResult.categories,

            recommendations:
              aiResult.recommendations,

            status: "completed",
          }
        );

      // ------------------------------------------
      // 11. Create AI Counselor conversation
      // ------------------------------------------
      //
      // This happens AFTER the assessment is
      // successfully completed.
      //
      // If chat creation fails, the assessment
      // remains completed.
      // ------------------------------------------

      try {
        const supabase =
          await createClient();

        const chatService =
          new AIChatService(
            supabase
          );

        await chatService.createAssessmentConversation(
          user.id,
          updatedAssessment
        );

        console.log(
          "AI Counselor conversation created:",
          assessment.id
        );
      } catch (chatError) {
        console.error(
          "Failed to create AI Counselor conversation:",
          chatError
        );
      }

      // ------------------------------------------
      // 12. Return completed result
      // ------------------------------------------

      return {
        assessmentId:
          updatedAssessment.id,

        status:
          "completed" as const,
      };
    } catch (error) {
      // ------------------------------------------
      // Analysis failed
      // ------------------------------------------

      try {
        await AssessmentRepository.updateAssessment(
          assessment.id,
          {
            status: "failed",
          }
        );
      } catch (updateError) {
        console.error(
          "Failed to update assessment status:",
          updateError
        );
      }

      console.error(
        "Assessment AI analysis failed:",
        error
      );

      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to analyze assessment."
      );
    }
  }

  // ============================================
  // SCORE CALCULATION
  // ============================================

  /**
   * Calculate overall assessment score.
   */
  private static calculateScore(
    answers: AssessmentSubmission["answers"],
    questions: AssessmentQuestion[]
  ): number {
    let earnedScore = 0;
    let maximumScore = 0;

    for (const answer of answers) {
      const question =
        questions.find(
          (q) =>
            q.id ===
            answer.questionId
        );

      if (!question) {
        continue;
      }

      earnedScore +=
        answer.selectedValue *
        question.weight;

      maximumScore +=
        3 * question.weight;
    }

    if (maximumScore === 0) {
      return 0;
    }

    return Math.round(
      (earnedScore /
        maximumScore) *
        100
    );
  }

  // ============================================
  // CATEGORY SCORES
  // ============================================

  /**
   * Calculate category-level scores.
   */
  private static calculateCategoryScores(
    answers: AssessmentSubmission["answers"],
    questions: AssessmentQuestion[]
  ) {
    const result: Record<
      AssessmentCategory,
      number[]
    > = {
      stress: [],
      anxiety: [],
      depression: [],
      burnout: [],
      sleep: [],
      social: [],
      focus: [],
      mood: [],
    };

    for (const answer of answers) {
      const question =
        questions.find(
          (q) =>
            q.id ===
            answer.questionId
        );

      if (!question) {
        continue;
      }

      result[
        question.category
      ].push(
        answer.selectedValue
      );
    }

    return Object.fromEntries(
      Object.entries(result).map(
        ([key, values]) => [
          key,
          values.length === 0
            ? 0
            : values.reduce(
                (sum, value) =>
                  sum + value,
                0
              ) / values.length,
        ]
      )
    ) as Record<
      AssessmentCategory,
      number
    >;
  }

  // ============================================
  // INITIAL MENTAL STATE
  // ============================================

  /**
   * Determine initial mental state
   * from the calculated score.
   */
  private static getMentalState(
    score: number
  ): string {
    if (score <= 25) {
      return "Excellent";
    }

    if (score <= 45) {
      return "Good";
    }

    if (score <= 65) {
      return "Moderate";
    }

    if (score <= 85) {
      return "High Risk";
    }

    return "Critical";
  }

  // ============================================
  // CREATE ASSESSMENT
  // ============================================

  /**
   * Create initial assessment record.
   */
  private static async createAssessment(
    userId: string,
    score: number,
    mentalState: string
  ) {
    return await AssessmentRepository.createAssessment(
      {
        user_id: userId,

        score,

        confidence: 0,

        mental_state:
          mentalState,

        stress: "Pending",

        anxiety: "Pending",

        depression: "Pending",

        burnout: "Pending",

        sleep: "Pending",

        social: "Pending",

        focus: "Pending",

        ai_summary: null,

        ai_analysis: null,

        recommendations: [],

        assessment_version: 1,

        status: "processing",
      }
    );
  }

  // ============================================
  // SAVE ANSWERS
  // ============================================

  /**
   * Save submitted assessment answers.
   */
  private static async saveAnswers(
    assessmentId: string,
    answers: AssessmentSubmission["answers"],
    questions: AssessmentQuestion[]
  ) {
    const payload =
      answers.map(
        (answer) => {
          const question =
            questions.find(
              (q) =>
                q.id ===
                answer.questionId
            );

          const option =
            question?.options.find(
              (item) =>
                item.value ===
                answer.selectedValue
            );

          return {
            assessment_id:
              assessmentId,

            question_id:
              answer.questionId,

            selected_label:
              option?.label ?? "",

            selected_value:
              answer.selectedValue,
          };
        }
      );

    await AssessmentRepository.createAssessmentAnswers(
      payload
    );
  }
}
