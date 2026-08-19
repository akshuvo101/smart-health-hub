"use client";

import { Profile } from "@/types/profile";

interface PersonalInformationCardProps {
    profile: Profile;

    onChange: (
        field: keyof Profile,
        value: string
    ) => void;
}

export default function PersonalInformationCard({
    profile,
    onChange,
}: PersonalInformationCardProps) {
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
                <p
                    className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.16em]
                        text-cyan-500
                    "
                >
                    Personal Information
                </p>

                <h2 className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white">
                    Basic Details
                </h2>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    Keep your personal information up to date.
                </p>
            </div>

            {/* Fields */}

            <div className="grid gap-3 md:grid-cols-2">
                {/* Full Name */}

                <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Full Name
                    </label>

                    <input
                        type="text"
                        value={
                            profile.full_name ?? ""
                        }
                        onChange={(e) =>
                            onChange(
                                "full_name",
                                e.target.value
                            )
                        }
                        placeholder="Enter your full name"
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

                {/* Email */}

                <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Email
                    </label>

                    <input
                        type="email"
                        value={profile.email}
                        readOnly
                        className="
                            w-full
                            cursor-not-allowed
                            rounded-lg
                            border
                            border-slate-300
                            bg-slate-100
                            px-3
                            py-2
                            text-sm
                            text-slate-500

                            dark:border-slate-700
                            dark:bg-slate-800
                            dark:text-slate-400
                        "
                    />
                </div>

                {/* Phone */}

                <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        value={
                            profile.phone ?? ""
                        }
                        onChange={(e) =>
                            onChange(
                                "phone",
                                e.target.value
                            )
                        }
                        placeholder="+8801XXXXXXXXX"
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

                {/* Gender */}

                <div>
                    <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Gender
                    </label>

                    <select
                        value={
                            profile.gender ?? ""
                        }
                        onChange={(e) =>
                            onChange(
                                "gender",
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
                            Select Gender
                        </option>

                        <option value="Male">
                            Male
                        </option>

                        <option value="Female">
                            Female
                        </option>

                        <option value="Other">
                            Other
                        </option>

                        <option value="Prefer not to say">
                            Prefer not to say
                        </option>
                    </select>
                </div>

                {/* Date of Birth */}

                <div className="md:col-span-2">
                    <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                        Date of Birth
                    </label>

                    <input
                        type="date"
                        value={
                            profile.date_of_birth ??
                            ""
                        }
                        onChange={(e) =>
                            onChange(
                                "date_of_birth",
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
                    />
                </div>
            </div>
        </section>
    );
}