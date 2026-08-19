import type { Profile } from "./profile";
import type { Assessment } from "./assessment";
import type { Appointment } from "./appointment";

export interface CounselorStudentProfile
  extends Profile {
  assessments: Assessment[];
  appointments: Appointment[];
}

export interface CounselorStudentProfileApiResponse {
  success: boolean;
  data: CounselorStudentProfile | null;
  message?: string;
}