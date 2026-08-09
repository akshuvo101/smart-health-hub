import { ASSESSMENT_PROMPT } from "@/lib/gemini/assessment-prompt";
import { GEMINI_MODEL } from "@/lib/gemini/config";
import { ai } from "@/lib/gemini/gemini";

import {
  AssessmentQuestion,
  AssessmentSubmission,
  AIAssessmentResult,
} from "@/types/assessment";

export class AIAnalysisService {
  static async analyze(
    questions: AssessmentQuestion[],
    answers: AssessmentSubmission["answers"],
    score: number
  ): Promise<AIAssessmentResult> {
    try {
      /**
       * Build assessment prompt
       */
      const prompt = `
${ASSESSMENT_PROMPT}

Overall Assessment Score: ${score}/100

Assessment Responses:

${questions
          .map((question) => {
            const answer = answers.find(
              (item) =>
                item.questionId === question.id
            );

            const option =
              question.options.find(
                (item) =>
                  item.value ===
                  answer?.selectedValue
              );

            return `
Category: ${question.category}
Question: ${question.question}
Answer: ${option?.label ?? "No Answer"}
`;
          })
          .join("\n")}
`;

      /**
       * Generate AI analysis
       */
      const response =
        await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
        });

      const text = response.text;

      if (!text) {
        throw new Error(
          "Gemini returned an empty response."
        );
      }

      /**
       * Extract JSON
       */
      const json = this.extractJson(text);

      /**
       * Parse AI response
       */
      const result =
        JSON.parse(json) as AIAssessmentResult;

      /**
       * Validate AI response
       */
      this.validate(result);

      /**
       * Temporary debugging
       *
       * Remove later if desired.
       */
      console.log(
        "AI Assessment Result:",
        {
          confidence:
            result.confidence,
          mentalState:
            result.mentalState,
          categories:
            result.categories,
        }
      );

      return result;
    } catch (error) {
      console.error(
        "========== AI ANALYSIS ERROR =========="
      );

      console.error(error);

      if (error instanceof Error) {
        console.error(
          "Message:",
          error.message
        );

        console.error(
          "Stack:",
          error.stack
        );
      }

      console.error(
        "======================================="
      );

      throw new Error(
        error instanceof Error
          ? error.message
          : "Failed to generate AI assessment."
      );
    }
  }

  /**
   * Extract JSON from Gemini response
   */
  private static extractJson(
    text: string
  ): string {
    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    const start =
      cleaned.indexOf("{");

    const end =
      cleaned.lastIndexOf("}");

    if (
      start === -1 ||
      end === -1 ||
      end <= start
    ) {
      throw new Error(
        "AI returned invalid JSON."
      );
    }

    return cleaned.substring(
      start,
      end + 1
    );
  }

  /**
   * Validate AI response
   */
  private static validate(
    result: AIAssessmentResult
  ) {
    /**
     * Confidence
     */
    if (
      typeof result.confidence !==
      "number" ||
      result.confidence < 0 ||
      result.confidence > 100
    ) {
      throw new Error(
        "Invalid confidence. Must be between 0 and 100."
      );
    }

    /**
     * Mental state
     */
    if (!result.mentalState) {
      throw new Error(
        "Missing mental state."
      );
    }

    /**
     * Summary
     */
    if (!result.summary) {
      throw new Error(
        "Missing summary."
      );
    }

    /**
     * Categories
     */
    if (!result.categories) {
      throw new Error(
        "Missing categories."
      );
    }

    const requiredCategories = [
      "stress",
      "anxiety",
      "depression",
      "burnout",
      "sleep",
      "focus",
      "social",
      "mood",
    ] as const;

    for (const category of requiredCategories) {
      const categoryData =
        result.categories[category];

      if (!categoryData) {
        throw new Error(
          `Missing category: ${category}`
        );
      }

      if (!categoryData.level) {
        throw new Error(
          `Missing level for ${category}`
        );
      }

      if (!categoryData.analysis) {
        throw new Error(
          `Missing analysis for ${category}`
        );
      }
    }

    /**
     * Recommendations
     */
    if (
      !Array.isArray(
        result.recommendations
      ) ||
      result.recommendations.length < 3 ||
      result.recommendations.length > 5
    ) {
      throw new Error(
        "Recommendations must contain 3 to 5 items."
      );
    }
  }
}