export type UserRole =
  | "student"
  | "admin"
  | "doctor"
  | "super_admin"
  | "counselor";

export type Gender =
  | "Male"
  | "Female"
  | "Other"
  | "Prefer not to say";

export interface Profile {
  id: string;

  full_name: string;

  email: string;

  avatar_url: string | null;

  role: UserRole;

  /* Academic Information */

  student_id: string | null;

  university: string | null;

  department: string | null;

  semester: string | null;

  /* Personal Information */

  phone: string | null;

  gender: Gender | null;

  date_of_birth: string | null;

  bio: string | null;

  /* Timestamps */

  created_at: string;

  updated_at: string;
}

/**
 * Payload for updating profile
 */
export interface UpdateProfilePayload {
  full_name: string;

  student_id: string;

  university: string;

  department: string;

  semester: string;

  phone: string;

  gender: Gender | "";

  date_of_birth: string;

  bio: string;
}