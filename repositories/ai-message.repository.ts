import { SupabaseClient } from "@supabase/supabase-js";

import {
  AIMessage,
  MessageRole,
} from "@/types/ai-chat";

export class AIMessageRepository {
  constructor(
    private readonly supabase: SupabaseClient
  ) {}

  /**
   * Get all messages of a conversation
   */
  async getConversationMessages(
    conversationId: string
  ): Promise<AIMessage[]> {
    const { data, error } = await this.supabase
      .from("ai_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", {
        ascending: true,
      });

    if (error) {
      throw new Error(
        `Failed to fetch messages: ${error.message}`
      );
    }

    return data ?? [];
  }

  /**
   * Get latest message
   */
  async getLatestMessage(
    conversationId: string
  ): Promise<AIMessage | null> {
    const { data, error } = await this.supabase
      .from("ai_messages")
      .select("*")
      .eq("conversation_id", conversationId)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .maybeSingle();

    if (error) {
      throw new Error(
        `Failed to fetch latest message: ${error.message}`
      );
    }

    return data;
  }

  /**
   * Create a message
   */
  async createMessage({
    conversationId,
    role,
    content,
    tokenCount,
  }: {
    conversationId: string;
    role: MessageRole;
    content: string;
    tokenCount?: number | null;
  }): Promise<AIMessage> {
    const { data, error } = await this.supabase
      .from("ai_messages")
      .insert({
        conversation_id: conversationId,
        role,
        content,
        token_count: tokenCount ?? null,
      })
      .select()
      .single();

    if (error) {
      throw new Error(
        `Failed to create message: ${error.message}`
      );
    }

    return data;
  }

  /**
   * Create multiple messages
   */
  async createMessages(
    messages: Array<{
      conversationId: string;
      role: MessageRole;
      content: string;
      tokenCount?: number | null;
    }>
  ): Promise<AIMessage[]> {
    if (messages.length === 0) {
      return [];
    }

    const rows = messages.map((message) => ({
      conversation_id: message.conversationId,
      role: message.role,
      content: message.content,
      token_count:
        message.tokenCount ?? null,
    }));

    const { data, error } = await this.supabase
      .from("ai_messages")
      .insert(rows)
      .select();

    if (error) {
      throw new Error(
        `Failed to create messages: ${error.message}`
      );
    }

    return data ?? [];
  }
}