import { NextRequest, NextResponse } from "next/server";

import { AppointmentService } from "@/services/appointment.service";
import { createClient } from "@/lib/supabase/server";
import { getUserRoleServer } from "@/lib/auth/get-user-role-server";

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const role = await getUserRoleServer();

    if (role !== "counselor") {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 403 }
      );
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment ID is required.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    /*
     * Make sure the appointment belongs to
     * this counselor before cancelling it.
     */
    const { data: appointment, error } =
      await supabase
        .from("appointments")
        .select("id, counselor_id, status")
        .eq("id", id)
        .single();

    if (error || !appointment) {
      return NextResponse.json(
        {
          success: false,
          message: "Appointment not found.",
        },
        { status: 404 }
      );
    }

    /*
     * Counselor can cancel:
     * - pending request
     * - approved appointment
     */
    if (
      appointment.status !== "pending" &&
      appointment.status !== "approved"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This appointment cannot be cancelled.",
        },
        { status: 400 }
      );
    }

    /*
     * Pending appointments have no counselor yet.
     *
     * Approved appointments must belong to
     * the current counselor.
     */
    if (
      appointment.status === "approved" &&
      appointment.counselor_id !== user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You are not assigned to this appointment.",
        },
        { status: 403 }
      );
    }

    const updatedAppointment =
      await AppointmentService.updateStatus(
        id,
        "cancelled"
      );

    return NextResponse.json({
      success: true,
      data: updatedAppointment,
      message:
        "Appointment cancelled successfully.",
    });
  } catch (error) {
    console.error(
      "CANCEL APPOINTMENT ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to cancel appointment.",
      },
      { status: 500 }
    );
  }
}