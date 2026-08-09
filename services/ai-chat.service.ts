import { GEMINI_MODEL } from "@/lib/gemini/config";
import { COUNSELOR_PROMPT } from "@/lib/gemini/counselor-prompt";
import { ai } from "@/lib/gemini/gemini";

import { Assessment } from "@/types/assessment";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export class AIChatService {
  static async sendMessage(
    assessment: Assessment,
    messages: ChatMessage[]
  ): Promise<string> {
    /**
     * Keep only recent conversation
     */
    const recentMessages = messages.slice(-8);

    const history = recentMessages
      .map(
        (message) =>
          `${message.role.toUpperCase()}: ${message.content}`
      )
      .join("\n\n");

    /**
     * Lightweight assessment context
     */
    const assessmentContext = `
Overall Score: ${assessment.score}/100

Mental State: ${assessment.mental_state}

Stress: ${assessment.stress}
Anxiety: ${assessment.anxiety}
Burnout: ${assessment.burnout}
Sleep: ${assessment.sleep}
Focus: ${assessment.focus}
Social: ${assessment.social}

Summary:
${assessment.ai_summary ?? "No summary"}
`;

    const prompt = `
${COUNSELOR_PROMPT}

==================================================
BACKGROUND (FOR CONTEXT ONLY)
==================================================

The assessment below is background information.

Use it ONLY when it naturally helps.

Never repeat it in every reply.

${assessmentContext}

==================================================
CONVERSATION
==================================================

${history}

ASSISTANT:
`;

    try {
      console.log("================================");
      console.log("Gemini Model:", GEMINI_MODEL);
      console.log("Sending request...");
      console.log("================================");

      const response =
        await ai.models.generateContent({
          model: GEMINI_MODEL,
          contents: prompt,
        });

      console.log("================================");
      console.log("Gemini Raw Response");
      console.dir(response, { depth: null });
      console.log("================================");

      /**
       * Safety Block
       */
      if (
        response.candidates?.[0]?.finishReason &&
        response.candidates[0].finishReason !== "STOP"
      ) {
        throw new Error(
          `Gemini stopped: ${response.candidates[0].finishReason}`
        );
      }

      const text =
        response.text?.trim() ??
        response.candidates?.[0]?.content?.parts
          ?.map((part: any) => part.text ?? "")
          .join("")
          .trim();

      if (!text) {
        throw new Error(
          "Gemini returned an empty response."
        );
      }

      return text;
    } catch (error) {
      console.error("================================");
      console.error("Gemini Error");
      console.dir(error, { depth: null });
      console.error("================================");

      if (error instanceof Error) {
        console.error("Message:", error.message);
        console.error(error.stack);
      }

      throw error;
    }
  }
}