import { NextResponse } from "next/server";

import { AssessmentService } from "@/services/assessment.service";
import { Assessment } from "@/types/assessment";
import { ApiResponse } from "@/types/api";

export async function GET() {
  try {
    const assessment =
      await AssessmentService.getLatestAssessment();

    const response: ApiResponse<Assessment> = {
      success: true,
      data: assessment,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "GET /api/assessment/latest:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Assessment not found.",
      },
      {
        status: 404,
      }
    );
  }
}