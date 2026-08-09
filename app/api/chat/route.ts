import { NextRequest, NextResponse } from "next/server";

import { AssessmentRepository } from "@/repositories/assessment.repository";
import { AIChatService } from "@/services/ai-chat.service";
export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    console.log("========== CHAT REQUEST ==========");
    console.dir(messages, { depth: null });

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

    const reply =
      await AIChatService.sendMessage(
        assessment,
        messages
      );

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