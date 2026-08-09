export type AppointmentStatus =
  | "pending"
  | "approved"
  | "completed"
  | "cancelled";

export type MeetingType =
  | "In Person"
  | "Online"
  | "Phone";

export interface Appointment {
  id: string;

  student_id: string;
  counselor_id: string | null;
  assessment_id: string | null;

  title: string;
  description: string | null;

  appointment_date: string;
  appointment_time: string;

  meeting_type: MeetingType;
  meeting_link: string | null;
  notes: string | null;

  status: AppointmentStatus;

  created_at: string;
  updated_at: string;
}

export interface CreateAppointmentInput {
  title: string;
  description?: string;

  appointment_date: string;
  appointment_time: string;

  meeting_type: MeetingType;

  assessment_id?: string | null;
}

export interface UpdateAppointmentInput {
  title?: string;
  description?: string;

  appointment_date?: string;
  appointment_time?: string;

  meeting_type?: MeetingType;

  meeting_link?: string | null;
  notes?: string | null;

  status?: AppointmentStatus;

  counselor_id?: string | null;
}

export interface AppointmentStats {
  upcoming: number;
  completed: number;
  pending: number;
  cancelled: number;
}

export interface AppointmentFilters {
  status?: AppointmentStatus;
  from?: string;
  to?: string;
}

export interface AppointmentWithRelations extends Appointment {
  counselor?: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  } | null;

  assessment?: {
    id: string;
    score: number;
    mental_state: string;
  } | null;
}