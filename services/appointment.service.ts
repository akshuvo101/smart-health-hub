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
   *
   * Student creates a new appointment.
   * New appointments are pending until a counselor accepts them.
   */
  static async createAppointment(
    studentId: string,
    input: CreateAppointmentInput
  ): Promise<Appointment> {
    const data = createAppointmentSchema.parse(input);

    const appointmentDate = new Date(
      `${data.appointment_date}T${data.appointment_time}`
    );

    if (Number.isNaN(appointmentDate.getTime())) {
      throw new Error("Invalid appointment date or time.");
    }

    if (appointmentDate.getTime() < Date.now()) {
      throw new Error(
        "Appointment cannot be scheduled in the past."
      );
    }

    return AppointmentRepository.create(
      studentId,
      data
    );
  }

  /**
   * Get Student Appointments
   */
  static async getStudentAppointments(
    studentId: string
  ): Promise<Appointment[]> {
    return AppointmentRepository.findByStudent(
      studentId
    );
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
   * Get Counselor Appointments
   *
   * Returns:
   * - New pending/unassigned requests
   * - Appointments assigned to this counselor
   */
  static async getCounselorAppointments(
    counselorId: string
  ): Promise<Appointment[]> {
    return AppointmentRepository.findForCounselor(
      counselorId
    );
  }

  /**
   * Counselor Accepts Appointment
   *
   * The repository makes sure that:
   * - appointment is still pending
   * - appointment has no counselor
   *
   * This prevents two counselors from accepting
   * the same appointment at the same time.
   */
  static async acceptAppointment(
    appointmentId: string,
    counselorId: string
  ): Promise<Appointment> {
    return AppointmentRepository.assignCounselor(
      appointmentId,
      counselorId
    );
  }

  /**
   * Cancel Appointment
   *
   * Keeps the appointment in the database with
   * status = cancelled instead of permanently deleting it.
   */
  static async cancelAppointment(
    appointmentId: string
  ): Promise<Appointment> {
    const appointment =
      await AppointmentRepository.findById(
        appointmentId
      );

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (
      appointment.status === "completed" ||
      appointment.status === "cancelled"
    ) {
      throw new Error(
        "This appointment cannot be cancelled."
      );
    }

    return AppointmentRepository.updateStatus(
      appointmentId,
      "cancelled"
    );
  }

  static async cancelStudentAppointment(
  appointmentId: string,
  studentId: string
): Promise<Appointment> {
  const appointment =
    await AppointmentRepository.findById(
      appointmentId
    );

  if (!appointment) {
    throw new Error("Appointment not found.");
  }

  if (appointment.student_id !== studentId) {
    throw new Error(
      "You are not allowed to cancel this appointment."
    );
  }

  if (
    appointment.status === "completed" ||
    appointment.status === "cancelled"
  ) {
    throw new Error(
      "This appointment cannot be cancelled."
    );
  }

  return AppointmentRepository.updateStatus(
    appointmentId,
    "cancelled"
  );
}
  /**
   * Update Appointment
   */
  static async updateAppointment(
    appointmentId: string,
    input: UpdateAppointmentInput
  ): Promise<Appointment> {
    const data =
      updateAppointmentSchema.parse(input);

    return AppointmentRepository.update(
      appointmentId,
      data
    );
  }

  /**
   * Delete Appointment
   *
   * Permanent deletion should normally not be used
   * for regular cancellation.
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
    const appointment =
      await AppointmentRepository.findById(
        appointmentId
      );

    if (!appointment) {
      throw new Error("Appointment not found.");
    }

    if (appointment.status === "completed") {
      throw new Error(
        "A completed appointment cannot be changed."
      );
    }

    if (appointment.status === "cancelled") {
      throw new Error(
        "A cancelled appointment cannot be changed."
      );
    }

    return AppointmentRepository.updateStatus(
      appointmentId,
      status
    );
  }

  /**
   * Assign Counselor
   *
   * Kept for compatibility with existing API/service code.
   * New counselor acceptance should preferably use
   * acceptAppointment().
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

    const upcoming = appointments.filter((appointment) => {
      const appointmentDate = new Date(
        `${appointment.appointment_date}T${appointment.appointment_time}`
      );

      return (
        appointment.status === "approved" &&
        !Number.isNaN(appointmentDate.getTime()) &&
        appointmentDate >= now
      );
    }).length;

    const pending = appointments.filter(
      (appointment) =>
        appointment.status === "pending"
    ).length;

    const completed = appointments.filter(
      (appointment) =>
        appointment.status === "completed"
    ).length;

    const cancelled = appointments.filter(
      (appointment) =>
        appointment.status === "cancelled"
    ).length;

    return {
      upcoming,
      pending,
      completed,
      cancelled,
    };
  }
}