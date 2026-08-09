import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

import { updateAppointmentSchema } from "@/schemas/appointment.schema";

import { AppointmentService } from "@/services/appointment.service";
import { Appointment } from "@/types/appointment";
import { ApiResponse } from "@/types/api";

/**
 * GET /api/appointments/:id
 */
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    // Ensure the student owns this appointment
    if (appointment.student_id !== user.id) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Forbidden.",
      };

      return NextResponse.json(response, {
        status: 403,
      });
    }

    const response: ApiResponse<Appointment> = {
      success: true,
      data: appointment,
      message: "Appointment fetched successfully.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "GET /api/appointments/[id]:",
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
 * PATCH /api/appointments/:id
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;

    const existing =
      await AppointmentService.getAppointmentById(id);

    if (!existing) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Appointment not found.",
      };

      return NextResponse.json(response, {
        status: 404,
      });
    }

    if (existing.student_id !== user.id) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Forbidden.",
      };

      return NextResponse.json(response, {
        status: 403,
      });
    }

    const body = await request.json();

    const validated =
      updateAppointmentSchema.parse(body);

    const updated =
      await AppointmentService.updateAppointment(
        id,
        validated
      );

    const response: ApiResponse<Appointment> = {
      success: true,
      data: updated,
      message: "Appointment updated successfully.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "PATCH /api/appointments/[id]:",
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

/**
 * DELETE /api/appointments/:id
 */
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    const { id } = await params;

    const existing =
      await AppointmentService.getAppointmentById(id);

    if (!existing) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Appointment not found.",
      };

      return NextResponse.json(response, {
        status: 404,
      });
    }

    if (existing.student_id !== user.id) {
      const response: ApiResponse<null> = {
        success: false,
        data: null,
        message: "Forbidden.",
      };

      return NextResponse.json(response, {
        status: 403,
      });
    }

    await AppointmentService.deleteAppointment(id);

    const response: ApiResponse<null> = {
      success: true,
      data: null,
      message: "Appointment deleted successfully.",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(
      "DELETE /api/appointments/[id]:",
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