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
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm

                dark:border-slate-800
                dark:bg-slate-900
            "
        >
            {/* Header */}

            <div className="mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="min-w-0">
                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.16em]
                                text-cyan-500
                            "
                        >
                            Academic Information
                        </p>

                        <h2 className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">
                            University Details
                        </h2>
                    </div>

                    <span
                        className="
                            shrink-0
                            rounded-full
                            bg-slate-100
                            px-2.5
                            py-1
                            text-[10px]
                            font-medium
                            text-slate-500

                            dark:bg-slate-800
                            dark:text-slate-400
                        "
                    >
                        Optional
                    </span>
                </div>

                <p
                    className="
                        mt-1
                        text-xs
                        leading-4
                        text-slate-500
                        dark:text-slate-400
                    "
                >
                    Add academic information to personalize
                    your PsycoMentalHub experience.
                </p>
            </div>

            {/* Fields */}

            <div className="grid gap-3 md:grid-cols-2">
                {/* Student ID */}

                <div>
                    <label
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        "
                    >
                        Student ID

                        <span className="ml-1 text-[10px] font-normal text-slate-400">
                            (Optional)
                        </span>
                    </label>

                    <input
                        type="text"
                        value={
                            profile.student_id ?? ""
                        }
                        onChange={(e) =>
                            onChange(
                                "student_id",
                                e.target.value
                            )
                        }
                        placeholder="Enter Student ID"
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-3
                            py-2
                            text-sm
                            outline-none
                            transition

                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-500/10

                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-white
                        "
                    />
                </div>

                {/* University */}

                <div>
                    <label
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        "
                    >
                        University

                        <span className="ml-1 text-[10px] font-normal text-slate-400">
                            (Optional)
                        </span>
                    </label>

                    <input
                        type="text"
                        value={
                            profile.university ?? ""
                        }
                        onChange={(e) =>
                            onChange(
                                "university",
                                e.target.value
                            )
                        }
                        placeholder="Enter your university"
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-3
                            py-2
                            text-sm
                            outline-none
                            transition

                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-500/10

                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-white
                        "
                    />
                </div>

                {/* Department */}

                <div>
                    <label
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        "
                    >
                        Department

                        <span className="ml-1 text-[10px] font-normal text-slate-400">
                            (Optional)
                        </span>
                    </label>

                    <input
                        type="text"
                        value={
                            profile.department ?? ""
                        }
                        onChange={(e) =>
                            onChange(
                                "department",
                                e.target.value
                            )
                        }
                        placeholder="e.g. Computer Science & Engineering"
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-3
                            py-2
                            text-sm
                            outline-none
                            transition

                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-500/10

                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-white
                        "
                    />
                </div>

                {/* Semester */}

                <div>
                    <label
                        className="
                            mb-1.5
                            block
                            text-xs
                            font-medium
                            text-slate-700
                            dark:text-slate-300
                        "
                    >
                        Current Semester

                        <span className="ml-1 text-[10px] font-normal text-slate-400">
                            (Optional)
                        </span>
                    </label>

                    <select
                        value={
                            profile.semester ?? ""
                        }
                        onChange={(e) =>
                            onChange(
                                "semester",
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-3
                            py-2
                            text-sm
                            outline-none
                            transition

                            focus:border-emerald-500
                            focus:ring-2
                            focus:ring-emerald-500/10

                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-white
                        "
                    >
                        <option value="">
                            Select Semester
                        </option>

                        {semesters.map(
                            (semester) => (
                                <option
                                    key={semester}
                                    value={semester}
                                >
                                    {semester}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            {/* Info Box */}

            <div
                className="
                    mt-4
                    rounded-xl
                    border
                    border-cyan-200
                    bg-cyan-50
                    px-3
                    py-2.5

                    dark:border-cyan-900
                    dark:bg-cyan-950/20
                "
            >
                <p
                    className="
                        text-[11px]
                        leading-4
                        text-slate-600
                        dark:text-slate-300
                    "
                >
                    Academic information is optional. You can
                    still complete assessments and receive
                    wellness reports without providing these
                    details.
                </p>
            </div>
        </section>
    );
}