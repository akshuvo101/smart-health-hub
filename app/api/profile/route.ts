import { NextResponse } from "next/server";

import { ProfileService } from "@/services/profile.service";

import {
  UpdateProfilePayload,
  Profile,
} from "@/types/profile";

import { ApiResponse } from "@/types/api";

/**
 * GET /api/profile
 */
export async function GET() {
  try {
    const profile =
      await ProfileService.getProfile();

    const response: ApiResponse<Profile> = {
      success: true,
      data: profile,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "GET /api/profile:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: null,
        message: "Failed to fetch profile.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PATCH /api/profile
 */
export async function PATCH(
  request: Request
) {
  try {
    const body: UpdateProfilePayload =
      await request.json();

    const profile =
      await ProfileService.updateProfile(
        body
      );

    const response: ApiResponse<Profile> = {
      success: true,
      data: profile,
      message:
        "Profile updated successfully.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "PATCH /api/profile:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update profile.",
      },
      {
        status: 400,
      }
    );
  }
}