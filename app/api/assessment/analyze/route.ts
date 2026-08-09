import { NextRequest, NextResponse } from "next/server";

import { AssessmentService } from "@/services/assessment.service";
import { ApiResponse } from "@/types/api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const assessmentId = body?.assessmentId;

    if (
      !assessmentId ||
      typeof assessmentId !== "string"
    ) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Assessment ID is required.",
      };

      return NextResponse.json(response, {
        status: 400,
      });
    }

    const result =
      await AssessmentService.analyzeAssessment(
        assessmentId
      );

    const response: ApiResponse<typeof result> = {
      success: true,
      data: result,
      message:
        "Assessment analyzed successfully.",
    };

    return NextResponse.json(response, {
      status: 200,
    });
  } catch (error) {
    console.error(
      "POST /api/assessment/analyze:",
      error
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "";

    /**
     * Gemini quota / rate limit
     */
    const isQuotaError =
      errorMessage.includes("429") ||
      errorMessage.includes(
        "RESOURCE_EXHAUSTED"
      ) ||
      errorMessage
        .toLowerCase()
        .includes("quota");

    if (isQuotaError) {
      /**
       * Default retry time.
       */
      let retryAfter = 60;

      /**
       * Try to extract Gemini's
       * retry delay from the error.
       *
       * Example:
       * retryDelay: "49s"
       */
      const retryMatch =
        errorMessage.match(
          /retryDelay["':\s]+["']?(\d+)s/i
        );

      if (retryMatch) {
        retryAfter = Math.max(
          1,
          Number(retryMatch[1])
        );
      }

      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message:
          "AI analysis is temporarily unavailable because the AI service quota has been reached.",
      };

      return NextResponse.json(response, {
        status: 429,
        headers: {
          "Retry-After":
            retryAfter.toString(),
        },
      });
    }

    /**
     * General server error
     */
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message:
        errorMessage ||
        "Failed to analyze assessment. Please try again.",
    };

    return NextResponse.json(response, {
      status: 500,
    });
  }
}