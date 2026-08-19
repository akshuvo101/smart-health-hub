import { createClient } from "@/lib/supabase/server";

export interface CounselorStudent {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  department: string | null;
  semester: string | null;
  student_id: string | null;
  phone: string | null;
  university: string | null;
  bio: string | null;
  created_at: string;
  appointment_count: number;
  pending_appointments: number;
  approved_appointments: number;
  completed_appointments: number;
  cancelled_appointments: number;
}

export class CounselorStudentRepository {
  /**
   * Get all students with appointment statistics.
   */
  static async findAll(): Promise<CounselorStudent[]> {
    const supabase = await createClient();

    // Get students
    const { data: students, error: studentsError } =
      await supabase
        .from("profiles")
        .select(`
          id,
          full_name,
          email,
          avatar_url,
          department,
          semester,
          student_id,
          phone,
          university,
          bio,
          created_at
        `)
        .eq("role", "student")
        .order("full_name", {
          ascending: true,
        });

    if (studentsError) {
      throw studentsError;
    }

    if (!students || students.length === 0) {
      return [];
    }

    // Get appointments for these students
    const studentIds = students.map(
      (student) => student.id
    );

    const { data: appointments, error: appointmentsError } =
      await supabase
        .from("appointments")
        .select(`
          student_id,
          status
        `)
        .in("student_id", studentIds);

    if (appointmentsError) {
      throw appointmentsError;
    }

    return students.map((student) => {
      const studentAppointments =
        (appointments ?? []).filter(
          (appointment) =>
            appointment.student_id === student.id
        );

      return {
        ...student,

        appointment_count:
          studentAppointments.length,

        pending_appointments:
          studentAppointments.filter(
            (appointment) =>
              appointment.status === "pending"
          ).length,

        approved_appointments:
          studentAppointments.filter(
            (appointment) =>
              appointment.status === "approved"
          ).length,

        completed_appointments:
          studentAppointments.filter(
            (appointment) =>
              appointment.status === "completed"
          ).length,

        cancelled_appointments:
          studentAppointments.filter(
            (appointment) =>
              appointment.status === "cancelled"
          ).length,
      };
    });
  }
}