import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
// import { getUserRoleServer } from "@/lib/get-user-role-server";

import { AppointmentService } from "@/services/appointment.service";
import { Appointment } from "@/types/appointment";
import { ApiResponse } from "@/types/api";
import { getUserRoleServer } from "@/lib/auth/get-user-role-server";

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Unauthorized.",
      };

      return NextResponse.json(response, {
        status: 401,
      });
    }

    const role = await getUserRoleServer();

    if (role !== "counselor") {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Forbidden.",
      };

      return NextResponse.json(response, {
        status: 403,
      });
    }

    const appointments =
      await AppointmentService.getCounselorAppointments(
        user.id
      );

    const response: ApiResponse<Appointment[]> = {
      success: true,
      data: appointments,
      message:
        "Counselor appointments fetched successfully.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "GET /api/counselor/appointments:",
      error
    );

    const response: ApiResponse<null> = {
      success: false,
      data: null,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };

    return NextResponse.json(response, {
      status: 500,
    });
  }
}