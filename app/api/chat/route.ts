import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { AssessmentRepository } from "@/repositories/assessment.repository";
import { AIChatService } from "@/services/ai-chat.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const conversationId =
      body.conversationId ??
      body.conversation_id;

    const content =
      typeof body.content === "string"
        ? body.content
        : "";

    console.log("========== CHAT REQUEST ==========");
    console.dir(body, { depth: null });

    // --------------------------------------------
    // 1. Authentication
    // --------------------------------------------

    const user =
      await AssessmentRepository.getCurrentUser();

    console.log("User:", user?.id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // --------------------------------------------
    // 2. Validate conversation
    // --------------------------------------------

    if (!conversationId) {
      return NextResponse.json(
        {
          success: false,
          message: "Conversation ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------
    // 3. Validate message
    // --------------------------------------------

    if (!content.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message content is required.",
        },
        {
          status: 400,
        }
      );
    }

    // --------------------------------------------
    // 4. Create chat service
    // --------------------------------------------

    const supabase = await createClient();

    const chatService =
      new AIChatService(supabase);

    // --------------------------------------------
    // 5. Send message
    //
    // AIChatService will:
    // - verify conversation
    // - load linked assessment
    // - save user message
    // - load conversation history
    // - call Gemini
    // - save assistant message
    // --------------------------------------------

    const result =
      await chatService.sendMessage({
        conversationId,
        content: content.trim(),
      });

    console.log(
      "AI Reply:",
      result.assistantMessage
    );

    // --------------------------------------------
    // 6. Return response
    // --------------------------------------------

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(
      "========== CHAT ROUTE ERROR =========="
    );

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}