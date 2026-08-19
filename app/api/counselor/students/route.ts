import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getUserRoleServer } from "@/lib/auth/get-user-role-server";

export async function GET() {
  try {
    const supabase = await createClient();

    // Check authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    // Check counselor role
    const role = await getUserRoleServer();

    if (role !== "counselor") {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Forbidden.",
        },
        { status: 403 }
      );
    }

    // Get all students
    const { data: students, error } = await supabase
      .from("profiles")
      .select(
        `
          id,
          full_name,
          email,
          avatar_url,
          department,
          semester,
          student_id,
          phone,
          university,
          created_at
        `
      )
      .eq("role", "student")
      .order("full_name", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: students ?? [],
      message: "Students fetched successfully.",
    });
  } catch (error) {
    console.error(
      "GET /api/counselor/students:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: null,
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong.",
      },
      { status: 500 }
    );
  }
}