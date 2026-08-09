import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

import { createAppointmentSchema } from "@/schemas/appointment.schema";

import { AppointmentService } from "@/services/appointment.service";
import { Appointment } from "@/types/appointment";
import { ApiResponse } from "@/types/api";

/**
 * GET /api/appointments
 * Get current student's appointments
 */
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

    const appointments =
      await AppointmentService.getStudentAppointments(
        user.id
      );

    const response: ApiResponse<Appointment[]> = {
      success: true,
      data: appointments,
      message: "Appointments fetched successfully.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "GET /api/appointments:",
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

/**
 * POST /api/appointments
 * Create new appointment
 */
export async function POST(
  request: NextRequest
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

    const body = await request.json();

    const validated =
      createAppointmentSchema.parse(body);

    const result =
      await AppointmentService.createAppointment(
        user.id,
        validated
      );

    const response: ApiResponse<Appointment> = {
      success: true,
      data: result,
      message:
        "Appointment booked successfully.",
    };

    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error) {
    console.error(
      "POST /api/appointments:",
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