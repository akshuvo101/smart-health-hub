import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { getUserRoleServer } from "@/lib/auth/get-user-role-server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    // -----------------------------------------
    // Validate student ID
    // -----------------------------------------

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          message: "Student ID is required.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // -----------------------------------------
    // Check authenticated user
    // -----------------------------------------

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("=================================");
    console.log("COUNSELOR STUDENT PROFILE API");
    console.log("AUTH USER =", user?.email);
    console.log("AUTH USER ID =", user?.id);
    console.log("TARGET STUDENT ID =", id);
    console.log("AUTH ERROR =", authError);
    console.log("=================================");

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

    // -----------------------------------------
    // Check counselor role
    // -----------------------------------------

    const role = await getUserRoleServer();

    console.log("COUNSELOR ROLE =", role);

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

    // -----------------------------------------
    // Fetch student profile
    // -----------------------------------------

    const {
      data: student,
      error: studentError,
    } = await supabase
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
          date_of_birth,
          gender,
          phone,
          bio,
          university,
          role,
          created_at,
          updated_at
        `
      )
      .eq("id", id)
      .eq("role", "student")
      .single();

    if (studentError) {
      console.error(
        "Student profile error:",
        studentError
      );

      if (studentError.code === "PGRST116") {
        return NextResponse.json(
          {
            success: false,
            data: null,
            message: "Student not found.",
          },
          { status: 404 }
        );
      }

      throw studentError;
    }

    // -----------------------------------------
    // Fetch assessment history
    // -----------------------------------------

    const {
      data: assessments,
      error: assessmentError,
    } = await supabase
      .from("assessments")
      .select(
        `
          id,
          user_id,
          score,
          mental_state,
          confidence,
          stress,
          anxiety,
          depression,
          burnout,
          sleep,
          focus,
          social,
          ai_summary,
          recommendations,
          assessment_version,
          status,
          created_at,
          updated_at,
          ai_analysis
        `
      )
      .eq("user_id", id)
      .order("created_at", {
        ascending: false,
      });

    if (assessmentError) {
      console.error(
        "Assessment history error:",
        assessmentError
      );

      throw assessmentError;
    }

    // -----------------------------------------
    // Fetch appointments
    // -----------------------------------------

    const {
      data: appointments,
      error: appointmentError,
    } = await supabase
      .from("appointments")
      .select(
        `
          id,
          student_id,
          counselor_id,
          assessment_id,
          title,
          description,
          appointment_date,
          appointment_time,
          meeting_type,
          meeting_link,
          notes,
          status,
          created_at,
          updated_at
        `
      )
      .eq("student_id", id)
      .order("appointment_date", {
        ascending: false,
      })
      .order("appointment_time", {
        ascending: false,
      });

    if (appointmentError) {
      console.error(
        "Appointment history error:",
        appointmentError
      );

      throw appointmentError;
    }

    // -----------------------------------------
    // Prepare summary
    // -----------------------------------------

    const assessmentList = assessments ?? [];
    const appointmentList = appointments ?? [];

    const latestAssessment =
      assessmentList.length > 0
        ? assessmentList[0]
        : null;

    const summary = {
      totalAssessments: assessmentList.length,

      totalAppointments:
        appointmentList.length,

      latestScore:
        latestAssessment?.score ?? null,

      latestMentalState:
        latestAssessment?.mental_state ?? null,

      latestStress:
        latestAssessment?.stress ?? null,

      latestAnxiety:
        latestAssessment?.anxiety ?? null,

      latestDepression:
        latestAssessment?.depression ?? null,

      latestBurnout:
        latestAssessment?.burnout ?? null,

      latestSleep:
        latestAssessment?.sleep ?? null,

      latestFocus:
        latestAssessment?.focus ?? null,

      latestSocial:
        latestAssessment?.social ?? null,
    };

    // -----------------------------------------
    // Final response
    // -----------------------------------------

    return NextResponse.json({
      success: true,

      data: {
        student,

        assessments: assessmentList,

        appointments: appointmentList,

        summary,
      },

      message:
        "Student profile fetched successfully.",
    });
  } catch (error) {
    console.error(
      "GET /api/counselor/students/[id]:",
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