import { NextResponse } from "next/server";

import { AssessmentService } from "@/services/assessment.service";
import { AssessmentQuestion } from "@/types/assessment";
import { ApiResponse } from "@/types/api";

export async function GET() {
  try {
    const questions = await AssessmentService.getQuestions();

    const response: ApiResponse<AssessmentQuestion[]> = {
      success: true,
      data: questions,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/assessment/questions:", error);

    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message: "Failed to fetch assessment questions.",
    };

    return NextResponse.json(response, {
      status: 500,
    });
  }
}