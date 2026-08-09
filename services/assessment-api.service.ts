import { ApiResponse } from "@/types/api";

import {
  Assessment,
} from "@/types/assessment";

/**
 * Get latest assessment
 */
export async function getLatestAssessment() {
  const response =
    await fetch(
      "/api/assessment/latest",
      {
        cache: "no-store",
      }
    );

  const result: ApiResponse<Assessment> =
    await response.json();

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "Failed to load assessment."
    );
  }

  return result.data;
}

/**
 * Start AI analysis
 */
export async function analyzeAssessment(
  assessmentId: string
) {
  const response =
    await fetch(
      `/api/assessment/${assessmentId}/analyze`,
      {
        method: "POST",
      }
    );

  const result: ApiResponse<Assessment> =
    await response.json();

  if (
    !response.ok ||
    !result.success ||
    !result.data
  ) {
    throw new Error(
      result.message ??
        "Failed to analyze assessment."
    );
  }

  return result.data;
}