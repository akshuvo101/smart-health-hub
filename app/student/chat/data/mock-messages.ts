
import { ChatMessage } from "../types/message";

export const DEFAULT_CONVERSATION_ID =
  "welcome-conversation";

export const mockMessages: ChatMessage[] = [
  {
    id: "welcome",

    conversationId:
      DEFAULT_CONVERSATION_ID,

    role: "assistant",

    content:
      "Hello 👋 I'm WellMind AI. How are you feeling today?",

    createdAt:
      "2026-07-27T10:00:00Z",

    status: "completed",
  },
];
