import { AppointmentRepository } from "@/repositories/appointment.repository";

import {
  Appointment,
  AppointmentStats,
  AppointmentStatus,
  CreateAppointmentInput,
  UpdateAppointmentInput,
} from "@/types/appointment";

import {
  createAppointmentSchema,
  updateAppointmentSchema,
} from "@/schemas/appointment.schema";

export class AppointmentService {
  /**
   * Create Appointment
   */
  static async createAppointment(
    studentId: string,
    input: CreateAppointmentInput
  ): Promise<Appointment> {
    const data = createAppointmentSchema.parse(input);

    const appointmentDate = new Date(
      `${data.appointment_date}T${data.appointment_time}`
    );

    if (appointmentDate.getTime() < Date.now()) {
      throw new Error("Appointment cannot be scheduled in the past.");
    }

    return AppointmentRepository.create(studentId, data);
  }

  /**
   * Get Student Appointments
   */
  static async getStudentAppointments(
    studentId: string
  ): Promise<Appointment[]> {
    return AppointmentRepository.findByStudent(studentId);
  }

  /**
   * Get Appointment By ID
   */
  static async getAppointmentById(
    id: string
  ): Promise<Appointment | null> {
    return AppointmentRepository.findById(id);
  }

  /**
   * Update Appointment
   */
  static async updateAppointment(
    appointmentId: string,
    input: UpdateAppointmentInput
  ): Promise<Appointment> {
    // const data = updateAppointmentSchema.parse(input);

    return AppointmentRepository.update(
      appointmentId,
      input
    );
  }

  /**
   * Delete Appointment
   */
  static async deleteAppointment(
    appointmentId: string
  ): Promise<void> {
    await AppointmentRepository.delete(
      appointmentId
    );
  }

  /**
   * Change Appointment Status
   */
  static async updateStatus(
    appointmentId: string,
    status: AppointmentStatus
  ): Promise<Appointment> {
    return AppointmentRepository.updateStatus(
      appointmentId,
      status
    );
  }

  /**
   * Assign Counselor
   */
  static async assignCounselor(
    appointmentId: string,
    counselorId: string
  ): Promise<Appointment> {
    return AppointmentRepository.assignCounselor(
      appointmentId,
      counselorId
    );
  }

  /**
   * Dashboard Statistics
   */
  static async getStats(
    studentId: string
  ): Promise<AppointmentStats> {
    const appointments =
      await AppointmentRepository.findByStudent(
        studentId
      );

    const now = new Date();

    const upcoming = appointments.filter((a) => {
      const appointmentDate = new Date(
        `${a.appointment_date}T${a.appointment_time}`
      );

      return (
        a.status === "approved" &&
        appointmentDate >= now
      );
    }).length;

    const pending = appointments.filter(
      (a) => a.status === "pending"
    ).length;

    const completed = appointments.filter(
      (a) => a.status === "completed"
    ).length;

    const cancelled = appointments.filter(
      (a) => a.status === "cancelled"
    ).length;

    return {
      upcoming,
      pending,
      completed,
      cancelled,
    };
  }
}