export type CounselorStudent = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  department: string | null;
  semester: string | null;
  student_id: string | null;
  phone: string | null;
  university: string | null;
  created_at: string;
};

export type CounselorStudentApiResponse = {
  success: boolean;
  data: CounselorStudent[] | null;
  message?: string;
};