/* ==========================================================
   Message Role
========================================================== */

export type MessageRole =
  | "user"
  | "assistant";

/* ==========================================================
   Message Status
========================================================== */

export type MessageStatus =
  | "sending"
  | "sent"
  | "typing"
  | "completed"
  | "error";

/* ==========================================================
   Chat Message
========================================================== */

export interface ChatMessage {
  id: string;

  role: MessageRole;

  content: string;

  createdAt: string;

  /**
   * Used for streaming animation.
   */
  isTyping?: boolean;

  /**
   * Current message status.
   */
  status?: MessageStatus;
}