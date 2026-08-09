import { NextRequest, NextResponse } from "next/server";

import { assessmentSubmissionSchema } from "@/schemas/assessment.schema";

import { AssessmentService } from "@/services/assessment.service";

import { ApiResponse } from "@/types/api";

export async function POST(
    request: NextRequest
) {
    try {
        /**
         * Read request body
         */
        const body =
            await request.json();

        /**
         * Validate submission
         */
        const validated =
            assessmentSubmissionSchema.parse(
                body
            );

        /**
         * Save assessment
         *
         * IMPORTANT:
         * This does NOT run Gemini.
         *
         * It only:
         * - validates answers
         * - calculates score
         * - creates assessment
         * - saves answers
         * - returns assessmentId
         */
        const result =
            await AssessmentService.submitAssessment(
                validated
            );

        /**
         * Success response
         */
        const response: ApiResponse<
            typeof result
        > = {
            success: true,

            data: result,

            message:
                "Assessment submitted successfully.",
        };

        return NextResponse.json(
            response,
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "POST /api/assessment:",
            error
        );

        /**
         * Error response
         */
        const response: ApiResponse<null> =
            {
                success: false,

                data: null,

                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong while submitting the assessment.",
            };

        return NextResponse.json(
            response,
            {
                status: 400,
            }
        );
    }
}