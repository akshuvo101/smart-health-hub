// ============================================
// AI CHAT TYPES
// ============================================

/**
 * Chat message role
 */
export type ChatMessageRole =
  | "user"
  | "assistant"
  | "system";

/**
 * Conversation status
 */
export type ConversationStatus =
  | "active"
  | "archived";

/**
 * Message role
 */
export type MessageRole =
  | "user"
  | "assistant"
  | "system";

/**
 * AI Conversation
 */
export interface AIConversation {
  id: string;

  user_id: string;

  /**
   * Optional assessment associated
   * with this conversation.
   */
  assessment_id: string | null;

  title: string;

  status: ConversationStatus;

  is_new: boolean;

  created_at: string;

  updated_at: string;
}

/**
 * AI Message
 */
export interface AIMessage {
  id: string;

  conversation_id: string;

  role: MessageRole;

  content: string;

  token_count: number | null;

  created_at: string;
}

/**
 * Conversation with messages
 */
export interface AIConversationWithMessages
  extends AIConversation {
  messages: AIMessage[];
}

/**
 * Create conversation payload
 */
export interface CreateConversationInput {
  title?: string;

  assessment_id?: string | null;

  is_new?: boolean;
}

/**
 * Send message payload
 */
export interface SendMessageInput {
  content: string;
}

/**
 * Result returned after sending
 * a message to the AI.
 */
export interface SendMessageResult {
  userMessage: AIMessage;

  assistantMessage: AIMessage;
}

/**
 * Conversation list item
 *
 * Used by sidebar.
 */
export interface ConversationListItem {
  id: string;

  title: string;

  status: ConversationStatus;

  is_new: boolean;

  updated_at: string;
}