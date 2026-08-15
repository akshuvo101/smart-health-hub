import { createClient } from "@/lib/supabase/server";

import {
  Appointment,
  AppointmentStatus,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "@/types/appointment";

export class AppointmentRepository {
  /**
   * Create appointment
   */
  static async create(
    studentId: string,
    data: CreateAppointmentInput
  ): Promise<Appointment> {
    const supabase = await createClient();

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        student_id: studentId,
        ...data,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return appointment as Appointment;
  }

  /**
   * Get appointment by ID
   */
  static async findById(
    id: string
  ): Promise<Appointment | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data as Appointment | null;
  }

  /**
   * Get student's appointments
   */
  static async findByStudent(
    studentId: string
  ): Promise<Appointment[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("student_id", studentId)
      .order("appointment_date", {
        ascending: true,
      })
      .order("appointment_time", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return (data ?? []) as Appointment[];
  }

  /**
   * Update appointment
   */
  static async update(
    id: string,
    data: UpdateAppointmentInput
  ): Promise<Appointment> {
    const supabase = await createClient();

    const { data: appointment, error } = await supabase
      .from("appointments")
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return appointment as Appointment;
  }

  /**
   * Delete appointment
   *
   * Use only when permanent deletion is actually required.
   * For normal cancellation, use updateStatus("cancelled").
   */
  static async delete(
    id: string
  ): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
      .from("appointments")
      .delete()
      .eq("id", id);

    if (error) {
      throw error;
    }
  }

  /**
   * Get student's appointments by status
   */
  static async findByStatus(
    studentId: string,
    status: AppointmentStatus
  ): Promise<Appointment[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("student_id", studentId)
      .eq("status", status)
      .order("appointment_date", {
        ascending: true,
      })
      .order("appointment_time", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return (data ?? []) as Appointment[];
  }

  /**
   * Counselor accepts a pending appointment.
   *
   * Only an unassigned pending appointment
   * can be accepted.
   */
  static async assignCounselor(
    appointmentId: string,
    counselorId: string
  ): Promise<Appointment> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("appointments")
      .update({
        counselor_id: counselorId,
        status: "approved",
      })
      .eq("id", appointmentId)
      .eq("status", "pending")
      .is("counselor_id", null)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Appointment;
  }

  /**
   * Get appointments visible to a counselor.
   *
   * Counselor can see:
   *
   * 1. Unassigned appointments
   *    → New student requests
   *
   * 2. Appointments assigned to this counselor
   *    → Approved / completed / cancelled history
   *
   * This allows the counselor dashboard to show
   * the complete appointment lifecycle.
   */
  static async findForCounselor(
    counselorId: string
  ): Promise<Appointment[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .or(
        `counselor_id.is.null,counselor_id.eq.${counselorId}`
      )
      .order("appointment_date", {
        ascending: true,
      })
      .order("appointment_time", {
        ascending: true,
      });

    if (error) {
      throw error;
    }

    return (data ?? []) as Appointment[];
  }

  /**
   * Update appointment status
   */
  static async updateStatus(
    appointmentId: string,
    status: AppointmentStatus
  ): Promise<Appointment> {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("appointments")
      .update({
        status,
      })
      .eq("id", appointmentId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Appointment;
  }
}