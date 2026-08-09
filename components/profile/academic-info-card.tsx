"use client";

import { Profile } from "@/types/profile";

interface AcademicInformationCardProps {
  profile: Profile;
  onChange: (
    field: keyof Profile,
    value: string
  ) => void;
}

const semesters = [
  "1st Semester",
  "2nd Semester",
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester",
  "9th Semester",
  "10th Semester",
  "11th Semester",
  "12th Semester",
];

export default function AcademicInformationCard({
  profile,
  onChange,
}: AcademicInformationCardProps) {
  return (
    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
              Academic Information
            </p>

            <h2 className="mt-1 text-xl font-bold">
              University Details
            </h2>
          </div>

          <span
            className="
              rounded-full
              bg-slate-100
              px-3
              py-1
              text-xs
              font-medium
              text-slate-500
              dark:bg-slate-800
              dark:text-slate-400
            "
          >
            Optional
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Add your academic information to personalize your
          PsycoMentalHub experience. You can complete this later.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Student ID */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Student ID
            <span className="ml-1 text-xs font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <input
            type="text"
            value={profile.student_id ?? ""}
            onChange={(e) =>
              onChange("student_id", e.target.value)
            }
            placeholder="Enter Student ID"
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-emerald-500
              dark:border-slate-700
              dark:bg-slate-800
            "
          />
        </div>

        {/* University */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            University
            <span className="ml-1 text-xs font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <input
            type="text"
            value={profile.university ?? ""}
            onChange={(e) =>
              onChange("university", e.target.value)
            }
            placeholder="Enter your university"
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-emerald-500
              dark:border-slate-700
              dark:bg-slate-800
            "
          />
        </div>

        {/* Department */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Department
            <span className="ml-1 text-xs font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <input
            type="text"
            value={profile.department ?? ""}
            onChange={(e) =>
              onChange("department", e.target.value)
            }
            placeholder="e.g. Computer Science & Engineering"
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-emerald-500
              dark:border-slate-700
              dark:bg-slate-800
            "
          />
        </div>

        {/* Semester */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Current Semester
            <span className="ml-1 text-xs font-normal text-slate-400">
              (Optional)
            </span>
          </label>

          <select
            value={profile.semester ?? ""}
            onChange={(e) =>
              onChange("semester", e.target.value)
            }
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              transition
              focus:border-emerald-500
              dark:border-slate-700
              dark:bg-slate-800
            "
          >
            <option value="">Select Semester</option>

            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Info Box */}
      <div
        className="
          mt-6
          rounded-2xl
          border
          border-cyan-200
          bg-cyan-50
          p-4
          dark:border-cyan-900
          dark:bg-cyan-950/20
        "
      >
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Academic information is optional. You can still complete
          assessments and receive wellness reports without providing
          your Student ID, university, department, or semester.
        </p>
      </div>
    </section>
  );
}