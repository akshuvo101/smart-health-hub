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
   * Get appointment by id
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
   * Get current student's appointments
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
   * Get appointments by status
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
      });

    if (error) {
      throw error;
    }

    return (data ?? []) as Appointment[];
  }

  /**
   * Assign counselor
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
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as Appointment;
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