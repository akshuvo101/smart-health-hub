import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
// import { getUserRoleServer } from "@/lib/get-user-role-server";

import { AppointmentService } from "@/services/appointment.service";
import { Appointment } from "@/types/appointment";
import { ApiResponse } from "@/types/api";
import { getUserRoleServer } from "@/lib/auth/get-user-role-server";

export async function PATCH(
  _request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
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
        message:
          "Only counselors can accept appointments.",
      };

      return NextResponse.json(response, {
        status: 403,
      });
    }

    const { id } = await params;

    const appointment =
      await AppointmentService.getAppointmentById(id);

    if (!appointment) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Appointment not found.",
      };

      return NextResponse.json(response, {
        status: 404,
      });
    }

    if (appointment.status !== "pending") {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message:
          "This appointment is no longer pending.",
      };

      return NextResponse.json(response, {
        status: 409,
      });
    }

    if (appointment.counselor_id) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message:
          "This appointment has already been assigned.",
      };

      return NextResponse.json(response, {
        status: 409,
      });
    }

    const updated =
      await AppointmentService.acceptAppointment(
        id,
        user.id
      );

    const response: ApiResponse<Appointment> = {
      success: true,
      data: updated,
      message:
        "Appointment accepted successfully.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "PATCH /api/counselor/appointments/[id]/accept:",
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
      status: 400,
    });
  }
}