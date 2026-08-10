import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { AssessmentRepository } from "@/repositories/assessment.repository";
import { AIChatService } from "@/services/ai-chat.service";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const conversationId =
      body.conversationId ||
      body.conversation_id;

    const content =
      body.content ||
      body.messages ||
      "";

    console.log("========== CHAT REQUEST ==========");
    console.dir(body, { depth: null });

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

    const assessment =
      await AssessmentRepository.getLatestAssessment(
        user.id
      );

    console.log(
      "Assessment Found:",
      !!assessment
    );

    if (!conversationId) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Conversation ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!content || typeof content !== "string") {
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

    if (!assessment) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete assessment first.",
        },
        {
          status: 404,
        }
      );
    }

    const supabase = await createClient();
    const chatService = new AIChatService(
      supabase
    );

    const reply =
      await chatService.sendMessage({
        conversationId,
        content,
      });

    console.log("AI Reply:", reply);

    return NextResponse.json({
      success: true,
      message: reply,
    });
  } catch (error) {
    console.error(
      "========== ROUTE ERROR =========="
    );

    console.dir(error, {
      depth: null,
    });

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