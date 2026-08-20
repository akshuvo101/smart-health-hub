import { SupabaseClient } from "@supabase/supabase-js";

import {
  AIConversation,
  CreateConversationInput,
} from "@/types/ai-chat";

export class AIConversationRepository {
  constructor(
    private readonly supabase: SupabaseClient
  ) {}

  /**
   * Get all conversations for a user.
   */
  async getUserConversations(
    userId: string
  ): Promise<AIConversation[]> {
    const { data, error } =
      await this.supabase
        .from("ai_conversations")
        .select("*")
        .eq("user_id", userId)
        .order("updated_at", {
          ascending: false,
        });

    if (error) {
      throw new Error(
        `Failed to fetch conversations: ${error.message}`
      );
    }

    return data ?? [];
  }

  /**
   * Get single conversation.
   */
  async getConversationById(
    conversationId: string
  ): Promise<AIConversation | null> {
    const { data, error } =
      await this.supabase
        .from("ai_conversations")
        .select("*")
        .eq("id", conversationId)
        .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to fetch conversation: ${error.message}`
      );
    }

    return data;
  }

  /**
   * Find an assessment-based counselor conversation
   * for a specific user.
   */
  async getConversationByAssessment(
    userId: string,
    assessmentId: string
  ): Promise<AIConversation | null> {
    const { data, error } =
      await this.supabase
        .from("ai_conversations")
        .select("*")
        .eq("user_id", userId)
        .eq("assessment_id", assessmentId)
        .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to find assessment conversation: ${error.message}`
      );
    }

    return data;
  }

  /**
   * Create conversation.
   */
  async createConversation(
    userId: string,
    input: CreateConversationInput = {}
  ): Promise<AIConversation> {
    const { data, error } =
      await this.supabase
        .from("ai_conversations")
        .insert({
          user_id: userId,

          title:
            input.title ??
            "New Conversation",

          assessment_id:
            input.assessment_id ??
            null,

          status: "active",

          is_new:
            input.is_new ??
            false,
        })
        .select()
        .single();

    if (error) {
      throw new Error(
        `Failed to create conversation: ${error.message}`
      );
    }

    return data;
  }

  /**
   * Update conversation.
   */
  async updateConversation(
    conversationId: string,
    updates: Partial<
      Pick<
        AIConversation,
        "title" |
        "status" |
        "is_new"
      >
    >
  ): Promise<AIConversation> {
    const { data, error } =
      await this.supabase
        .from("ai_conversations")
        .update(updates)
        .eq("id", conversationId)
        .select()
        .single();

    if (error) {
      throw new Error(
        `Failed to update conversation: ${error.message}`
      );
    }

    return data;
  }

  /**
   * Delete conversation.
   */
  async deleteConversation(
    conversationId: string
  ): Promise<void> {
    const { error } =
      await this.supabase
        .from("ai_conversations")
        .delete()
        .eq("id", conversationId);

    if (error) {
      throw new Error(
        `Failed to delete conversation: ${error.message}`
      );
    }
  }
}
