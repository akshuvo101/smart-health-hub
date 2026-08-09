import { AssessmentRepository } from "@/repositories/assessment.repository";

import { AIAnalysisService } from "./ai-analysis.service";

import {
    AssessmentQuestion,
    AssessmentSubmission,
    AssessmentCategory,
} from "@/types/assessment";

export class AssessmentService {
    /**
     * Get all active assessment questions
     */
    static async getQuestions(): Promise<
        AssessmentQuestion[]
    > {
        return await AssessmentRepository.getAllQuestions();
    }

    /**
     * Get latest assessment
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
            throw new Error(
                "No assessment found."
            );
        }

        return assessment;
    }

    /**
     * Submit assessment
     *
     * IMPORTANT:
     * This method does NOT call Gemini.
     *
     * It only:
     * 1. Validates questions
     * 2. Calculates score
     * 3. Creates assessment
     * 4. Saves answers
     *
     * AI analysis happens separately through
     * /api/assessment/analyze
     */
    static async submitAssessment(
        payload: AssessmentSubmission
    ) {
        const user =
            await AssessmentRepository.getCurrentUser();

        if (!user) {
            throw new Error("Unauthorized");
        }

        /**
         * Get question IDs from submission
         */
        const questionIds =
            payload.answers.map(
                (answer) =>
                    answer.questionId
            );

        /**
         * Get valid active questions
         */
        const questions =
            await AssessmentRepository.getQuestionsByIds(
                questionIds
            );

        /**
         * Make sure every submitted
         * question is valid
         */
        if (
            questions.length !==
            payload.answers.length
        ) {
            throw new Error(
                "Invalid assessment questions."
            );
        }

        /**
         * Calculate overall score
         */
        const score =
            this.calculateScore(
                payload.answers,
                questions
            );

        /**
         * Calculate category scores
         */
        const categoryScores =
            this.calculateCategoryScores(
                payload.answers,
                questions
            );

        /**
         * Determine initial mental state
         */
        const mentalState =
            this.getMentalState(score);

        /**
         * Create assessment
         *
         * AI status starts as processing.
         */
        const assessment =
            await this.createAssessment(
                user.id,
                score,
                mentalState
            );

        /**
         * Save answers
         */
        await this.saveAnswers(
            assessment.id,
            payload.answers,
            questions
        );

        /**
         * Return immediately.
         *
         * Gemini is NOT called here.
         */
        return {
            assessmentId:
                assessment.id,

            score,

            mentalState,

            categoryScores,

            status: "processing",
        };
    }

    /**
     * Run AI analysis for an assessment
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
     *
     * If Gemini fails:
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
            throw new Error(
                "Unauthorized"
            );
        }

        /**
         * Get assessment
         */
        const assessment =
            await AssessmentRepository.getAssessmentById(
                assessmentId
            );

        if (!assessment) {
            throw new Error(
                "Assessment not found."
            );
        }

        /**
         * Security:
         * Make sure the assessment belongs
         * to the authenticated user.
         */
        if (
            assessment.user_id !==
            user.id
        ) {
            throw new Error(
                "You are not allowed to analyze this assessment."
            );
        }

        /**
         * Prevent duplicate analysis
         *
         * If already completed,
         * simply return the existing assessment.
         */
        if (
            assessment.status ===
            "completed"
        ) {
            return {
                assessmentId:
                    assessment.id,
                status: "completed",
            };
        }

        /**
         * If another request is already
         * analyzing this assessment,
         * don't start another Gemini request.
         *
         * This is mainly a safety guard.
         */
        if (
            assessment.status ===
            "analyzing"
        ) {
            return {
                assessmentId:
                    assessment.id,
                status: "analyzing",
            };
        }

        /**
         * Mark assessment as analyzing
         * before calling Gemini.
         */
        await AssessmentRepository.updateAssessment(
            assessment.id,
            {
                status: "analyzing",
            }
        );

        try {
            /**
             * Get saved assessment answers
             */
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

            /**
             * Get question IDs
             */
            const questionIds =
                supabaseAnswers.map(
                    (answer) =>
                        answer.question_id
                );

            /**
             * Get questions
             */
            const questions =
                await AssessmentRepository.getQuestionsByIds(
                    questionIds
                );

            if (
                !questions.length
            ) {
                throw new Error(
                    "Assessment questions not found."
                );
            }

            /**
             * Convert database answers
             * into AI analysis format
             */
            const answers: AssessmentSubmission["answers"] =
                supabaseAnswers.map(
                    (answer) => ({
                        questionId:
                            answer.question_id,

                        selectedValue:
                            answer.selected_value,
                    })
                );

            /**
             * Run Gemini AI analysis
             *
             * This is the slow part.
             * It now runs from the loading page
             * instead of the submit request.
             */
            const aiResult =
                await AIAnalysisService.analyze(
                    questions,
                    answers,
                    assessment.score
                );

            /**
             * Convert confidence
             * to 0-100 format.
             */
            const confidence = Math.round(
                aiResult.confidence
            );

            /**
             * Update assessment
             * with complete AI result.
             */
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

                        status:
                            "completed",
                    }
                );

            /**
             * Return completed result
             */
            return {
                assessmentId:
                    updatedAssessment.id,

                status: "completed",
            };
        } catch (error) {
            /**
             * If Gemini or anything else
             * fails, mark assessment as failed.
             */
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

    /**
     * Calculate overall assessment score
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

    /**
     * Calculate category scores
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
            Object.entries(
                result
            ).map(
                ([key, values]) => [
                    key,
                    values.length === 0
                        ? 0
                        : values.reduce(
                            (a, b) =>
                                a + b,
                            0
                        ) /
                        values.length,
                ]
            )
        ) as Record<
            AssessmentCategory,
            number
        >;
    }

    /**
     * Determine initial mental state
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

    /**
     * Create initial assessment
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

    /**
     * Save assessment answers
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
                            option?.label ??
                            "",

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