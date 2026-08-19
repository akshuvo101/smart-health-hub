import {
  CounselorStudent,
  CounselorStudentRepository,
} from "@/repositories/counselor-student.repository";

export class CounselorStudentService {
  /**
   * Get all students for counselor portal.
   */
  static async getStudents(): Promise<
    CounselorStudent[]
  > {
    return CounselorStudentRepository.findAll();
  }
}