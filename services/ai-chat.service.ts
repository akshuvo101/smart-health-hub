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
 * Create an AI Counselor conversation
 * automatically after an assessment is completed.
 *
 * This conversation starts with an assistant message
 * based on the user's assessment result.
 */
  async createAssessmentConversation(
    userId: string,
    assessment: Assessment
  ) {
    // --------------------------------------------
    // 1. Prevent duplicate conversation
    // --------------------------------------------

    const existingConversation =
      await this.conversationRepository.getConversationByAssessment(
        userId,
        assessment.id
      );

    if (existingConversation) {
      return existingConversation;
    }

    // --------------------------------------------
    // 2. Build a simple personalized intro
    // --------------------------------------------

    const introMessage =
      this.buildAssessmentIntro(assessment);

    // --------------------------------------------
    // 3. Create conversation
    // --------------------------------------------

    const conversation =
      await this.conversationRepository.createConversation(
        userId,
        {
          title: "Wellness Assessment",
          assessment_id: assessment.id,
          is_new: true,
        }
      );

    // --------------------------------------------
    // 4. Add first assistant message
    // --------------------------------------------

    await this.messageRepository.createMessage({
      conversationId: conversation.id,
      role: "assistant",
      content: introMessage,
    });

    // --------------------------------------------
    // 5. Return conversation
    // --------------------------------------------

    return conversation;
  }

  /**
 * Mark conversation as read.
 */
  async markConversationAsRead(
    conversationId: string
  ) {
    return this.conversationRepository.updateConversation(
      conversationId,
      {
        is_new: false,
      }
    );
  }
  /**
 * Build the first AI Counselor message
 * from the completed assessment.
 */
  /**
 * Build the first AI Counselor message
 * from the completed assessment.
 */
  private buildAssessmentIntro(
    assessment: Assessment
  ): string {
    const categories = [
      { name: "stress", level: assessment.stress },
      { name: "anxiety", level: assessment.anxiety },
      { name: "mood", level: assessment.mood },
      { name: "sleep", level: assessment.sleep },
      { name: "burnout", level: assessment.burnout },
      { name: "study focus", level: assessment.focus },
      { name: "social connection", level: assessment.social },
      { name: "depression", level: assessment.depression },
    ];

    const severity: Record<string, number> = {
      "Very High": 4,
      High: 3,
      Moderate: 2,
      Low: 1,
      "Very Low": 0,
    };

    const areasNeedingAttention = categories
      .filter(({ level }) => severity[level] >= 2)
      .sort((a, b) => severity[b.level] - severity[a.level])
      .slice(0, 2)
      .map(({ name }) => name);

    const strengths = categories
      .filter(({ level }) => severity[level] <= 1)
      .sort((a, b) => severity[a.level] - severity[b.level])
      .slice(0, 2)
      .map(({ name }) => name);

    const attentionText =
      areasNeedingAttention.length > 0
        ? areasNeedingAttention.join(" and ")
        : "your overall wellbeing";

    const strengthText =
      strengths.length > 0
        ? ` Your ${strengths.join(" and ")} look like positive foundations we can build on.`
        : " Your results show several areas we can gently strengthen together.";

    const stateText = assessment.mental_state
      ? ` Your overall picture is ${assessment.mental_state.toLowerCase()}.`
      : "";

    return `Hi! 👋 I've reviewed your latest wellness assessment.${stateText}

I noticed that ${attentionText} may deserve a little more attention right now.${strengthText}

We can work on these areas gradually with simple, personalized steps. You don't need to explain everything from the beginning — I'll keep your assessment insights in mind while we talk.

What would you like to work on first?`;
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

${assessmentContext
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
            (part) =>
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