import { SupabaseClient } from "@supabase/supabase-js";

import { GEMINI_MODEL } from "@/lib/gemini/config";
import { COUNSELOR_PROMPT } from "@/lib/gemini/counselor-prompt";
import { ai } from "@/lib/gemini/gemini";

import {
  Assessment,
} from "@/types/assessment";

import {
  AIMessage,
  CreateConversationInput,
  SendMessageResult,
} from "@/types/ai-chat";

import { AIConversationRepository } from "@/repositories/ai-conversation.repository";
import { AIMessageRepository } from "@/repositories/ai-message.repository";
import { AssessmentRepository } from "@/repositories/assessment.repository";

export class AIChatService {
  private readonly conversationRepository: AIConversationRepository;

  private readonly messageRepository: AIMessageRepository;

  constructor(
    private readonly supabase: SupabaseClient
  ) {
    this.conversationRepository =
      new AIConversationRepository(supabase);

    this.messageRepository =
      new AIMessageRepository(supabase);
  }

  // ============================================
  // CONVERSATIONS
  // ============================================

  /**
   * Get all conversations of a user.
   */
  async getConversations(userId: string) {
    return this.conversationRepository.getUserConversations(
      userId
    );
  }

  /**
   * Get a single conversation.
   */
  async getConversation(
    conversationId: string
  ) {
    return this.conversationRepository.getConversationById(
      conversationId
    );
  }

  /**
   * Create a new conversation.
   */
  async createConversation(
    userId: string,
    input: CreateConversationInput = {}
  ) {
    return this.conversationRepository.createConversation(
      userId,
      input
    );
  }

  /**
   * Delete a conversation.
   */
  async deleteConversation(
    conversationId: string
  ): Promise<void> {
    await this.conversationRepository.deleteConversation(
      conversationId
    );
  }

  /**
   * Archive a conversation.
   */
  async archiveConversation(
    conversationId: string
  ) {
    return this.conversationRepository.updateConversation(
      conversationId,
      {
        status: "archived",
      }
    );
  }

  // ============================================
  // MESSAGES
  // ============================================

  /**
   * Get messages of a conversation.
   */
  async getMessages(
    conversationId: string
  ): Promise<AIMessage[]> {
    return this.messageRepository.getConversationMessages(
      conversationId
    );
  }

  /**
   * Add a message manually.
   */
  async addMessage({
    conversationId,
    role,
    content,
    tokenCount,
  }: {
    conversationId: string;
    role: "user" | "assistant" | "system";
    content: string;
    tokenCount?: number | null;
  }): Promise<AIMessage> {
    return this.messageRepository.createMessage({
      conversationId,
      role,
      content,
      tokenCount,
    });
  }

  // ============================================
  // AI CHAT
  // ============================================

  /**
   * Send user message and generate AI response.
   *
   * Flow:
   *
   * 1. Validate message
   * 2. Verify conversation
   * 3. Load linked assessment
   * 4. Save user message
   * 5. Load recent conversation
   * 6. Build assessment context
   * 7. Build counselor prompt
   * 8. Call Gemini
   * 9. Save assistant message
   * 10. Update conversation title
   * 11. Return result
   */
  async sendMessage({
    conversationId,
    content,
  }: {
    conversationId: string;
    content: string;
  }): Promise<SendMessageResult> {
    // --------------------------------------------
    // 1. Validate message
    // --------------------------------------------

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      throw new Error(
        "Message cannot be empty."
      );
    }

    // --------------------------------------------
    // 2. Verify conversation
    // --------------------------------------------

    const conversation =
      await this.conversationRepository.getConversationById(
        conversationId
      );

    if (!conversation) {
      throw new Error(
        "Conversation not found."
      );
    }

    // --------------------------------------------
    // 3. Load linked assessment
    // --------------------------------------------

    let assessment: Assessment | null =
      null;

    if (conversation.assessment_id) {
      assessment =
        await AssessmentRepository.getAssessmentById(
          conversation.assessment_id
        );
    }

    // --------------------------------------------
    // 4. Save user message
    // --------------------------------------------

    const userMessage =
      await this.messageRepository.createMessage({
        conversationId,
        role: "user",
        content: trimmedContent,
      });

    // --------------------------------------------
    // 5. Get conversation history
    // --------------------------------------------

    const dbMessages =
      await this.messageRepository.getConversationMessages(
        conversationId
      );

    /**
     * Keep only recent messages.
     */
    const recentMessages =
      dbMessages.slice(-8);

    const history = recentMessages
      .map((message) => {
        return `${message.role.toUpperCase()}: ${message.content}`;
      })
      .join("\n\n");

    // --------------------------------------------
    // 6. Build assessment context
    // --------------------------------------------

    let assessmentContext = "";

    if (assessment) {
      assessmentContext = `
Overall Score: ${assessment.score}/100

Mental State: ${assessment.mental_state}

Stress: ${assessment.stress}

Anxiety: ${assessment.anxiety}

Depression: ${assessment.depression}

Burnout: ${assessment.burnout}

Sleep: ${assessment.sleep}

Focus: ${assessment.focus}

Social: ${assessment.social}

Mood: ${assessment.mood}

Summary:
${assessment.ai_summary ?? "No summary"}
`;
    }

    // --------------------------------------------
    // 7. Build Gemini prompt
    // --------------------------------------------

    const prompt = `
${COUNSELOR_PROMPT}

You are continuing an ongoing counseling conversation.

The assessment information below is private background
context for this conversation.

Use the assessment ONLY when it naturally helps answer
the user's current message.

Do NOT:
- repeat all assessment scores
- list every category in every response
- mention that you are reading a database record
- overwhelm the user with clinical information

Do:
- respond naturally
- focus on the user's current concern
- use relevant assessment information when helpful
- ask a gentle follow-up question when appropriate
- maintain continuity with previous messages

${
  assessmentContext
    ? `
ASSESSMENT CONTEXT:
${assessmentContext}
`
    : `
No assessment is linked to this conversation.
`
}

CONVERSATION HISTORY:
${history}

ASSISTANT:
`;

    // --------------------------------------------
    // 8. Call Gemini
    // --------------------------------------------

    try {
      console.log(
        "================================"
      );

      console.log(
        "Gemini Model:",
        GEMINI_MODEL
      );

      console.log(
        "Conversation ID:",
        conversationId
      );

      console.log(
        "Assessment ID:",
        conversation.assessment_id
      );

      console.log(
        "Assessment Loaded:",
        !!assessment
      );

      console.log(
        "Sending request..."
      );

      console.log(
        "================================"
      );

      const response =
        await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
        });

      // ------------------------------------------
      // Debug response
      // ------------------------------------------

      console.log(
        "================================"
      );

      console.log(
        "Gemini Raw Response"
      );

      console.dir(response, {
        depth: null,
      });

      console.log(
        "================================"
      );

      // ------------------------------------------
      // 9. Safety block
      // ------------------------------------------

      if (
        response.candidates?.[0]
          ?.finishReason &&
        response.candidates[0]
          .finishReason !== "STOP"
      ) {
        throw new Error(
          `Gemini stopped: ${response.candidates[0].finishReason}`
        );
      }

      // ------------------------------------------
      // 10. Extract response text
      // ------------------------------------------

      const text =
        response.text?.trim() ??
        response.candidates?.[0]?.content?.parts
          ?.map(
            (part: any) =>
              part.text ?? ""
          )
          .join("")
          .trim();

      if (!text) {
        throw new Error(
          "Gemini returned an empty response."
        );
      }

      // ------------------------------------------
      // 11. Save assistant message
      // ------------------------------------------

      const assistantMessage =
        await this.messageRepository.createMessage({
          conversationId,
          role: "assistant",
          content: text,
        });

      // ------------------------------------------
      // 12. Update conversation title
      // ------------------------------------------

      /**
       * Generate a simple title from the
       * first user message.
       *
       * The database trigger will automatically
       * update updated_at.
       */
      if (
        conversation.title ===
          "New Conversation" &&
        dbMessages.length <= 1
      ) {
        const title =
          trimmedContent.length > 50
            ? `${trimmedContent.slice(
                0,
                50
              )}...`
            : trimmedContent;

        await this.conversationRepository.updateConversation(
          conversationId,
          {
            title,
          }
        );
      }

      // ------------------------------------------
      // 13. Return
      // ------------------------------------------

      return {
        userMessage,
        assistantMessage,
      };
    } catch (error) {
      console.error(
        "================================"
      );

      console.error(
        "Gemini Error"
      );

      console.dir(error, {
        depth: null,
      });

      console.error(
        "================================"
      );

      if (error instanceof Error) {
        console.error(
          "Message:",
          error.message
        );

        console.error(
          error.stack
        );
      }

      throw error;
    }
  }
}