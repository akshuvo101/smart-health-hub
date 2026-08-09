import { ApiResponse } from "@/types/api";
import {
  AssessmentQuestion,
} from "@/types/assessment";

export async function getAssessmentQuestions(): Promise<AssessmentQuestion[]> {
  const response = await fetch("/api/assessment/questions", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch assessment questions.");
  }

  const result: ApiResponse<AssessmentQuestion[]> =
    await response.json();

  if (!result.success || !result.data) {
    throw new Error(
      result.message ?? "Failed to load questions."
    );
  }

  return result.data;
}