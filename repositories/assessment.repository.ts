import { createClient } from "@/lib/supabase/server";

import {
    AssessmentQuestion,
    Assessment,
} from "@/types/assessment";

export class AssessmentRepository {
    /**
     * Get all active assessment questions
     */
    static async getAllQuestions(): Promise<
        AssessmentQuestion[]
    > {
        const supabase =
            await createClient();

        const { data, error } =
            await supabase
                .from("assessment_questions")
                .select("*")
                .eq("is_active", true)
                .order("display_order", {
                    ascending: true,
                });

        if (error) {
            throw error;
        }

        return data ?? [];
    }

    /**
     * Get active questions by IDs
     */
    static async getQuestionsByIds(
        questionIds: string[]
    ): Promise<AssessmentQuestion[]> {
        const supabase =
            await createClient();

        if (questionIds.length === 0) {
            return [];
        }

        const { data, error } =
            await supabase
                .from("assessment_questions")
                .select("*")
                .in("id", questionIds)
                .eq("is_active", true);

        if (error) {
            throw error;
        }

        return data ?? [];
    }

    /**
     * Create a new assessment
     *
     * Initial status:
     * processing
     */
    static async createAssessment(
        payload: Partial<Assessment>
    ): Promise<Assessment> {
        const supabase =
            await createClient();

        const { data, error } =
            await supabase
                .from("assessments")
                .insert(payload)
                .select()
                .single();

        if (error) {
            throw error;
        }

        return data;
    }

    /**
     * Create assessment answers
     */
    static async createAssessmentAnswers(
        payload: {
            assessment_id: string;
            question_id: string;
            selected_label: string;
            selected_value: number;
        }[]
    ): Promise<void> {
        const supabase =
            await createClient();

        if (payload.length === 0) {
            return;
        }

        const { error } =
            await supabase
                .from("assessment_answers")
                .insert(payload);

        if (error) {
            throw error;
        }
    }

    /**
     * Get latest assessment
     *
     * Used by the result page and
     * dashboard.
     */
    static async getLatestAssessment(
        userId: string
    ): Promise<Assessment | null> {
        const supabase =
            await createClient();

        const { data, error } =
            await supabase
                .from("assessments")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", {
                    ascending: false,
                })
                .limit(1)
                .maybeSingle();

        if (error) {
            throw error;
        }

        return data;
    }

    /**
     * Get assessment by ID
     *
     * Used by the AI analysis flow.
     */
    static async getAssessmentById(
        assessmentId: string
    ): Promise<Assessment | null> {
        const supabase =
            await createClient();

        const { data, error } =
            await supabase
                .from("assessments")
                .select("*")
                .eq("id", assessmentId)
                .maybeSingle();

        if (error) {
            throw error;
        }

        return data;
    }

    /**
     * Get assessment answers
     *
     * Used by the AI analysis service.
     */
    static async getAssessmentAnswers(
        assessmentId: string
    ) {
        const supabase =
            await createClient();

        const { data, error } =
            await supabase
                .from("assessment_answers")
                .select("*")
                .eq(
                    "assessment_id",
                    assessmentId
                )
                .order("created_at", {
                    ascending: true,
                });

        if (error) {
            throw error;
        }

        return data ?? [];
    }

    /**
     * Get authenticated user
     */
    static async getCurrentUser() {
        const supabase =
            await createClient();

        const {
            data: { user },
            error,
        } =
            await supabase.auth.getUser();

        if (error) {
            throw error;
        }

        return user;
    }

    /**
     * Update assessment
     *
     * Used after AI analysis to save:
     * - confidence
     * - mental state
     * - AI summary
     * - categories
     * - recommendations
     * - status
     */
    static async updateAssessment(
        assessmentId: string,
        payload: Partial<Assessment>
    ): Promise<Assessment> {
        const supabase =
            await createClient();

        const { data, error } =
            await supabase
                .from("assessments")
                .update(payload)
                .eq("id", assessmentId)
                .select()
                .single();

        if (error) {
            throw error;
        }

        return data;
    }
}