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
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
          Personal Information
        </p>

        <h2 className="mt-1 text-xl font-bold">
          Basic Details
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Keep your personal information up to
          date.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Full Name */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Full Name
          </label>

          <input
            type="text"
            value={profile.full_name ?? ""}
            onChange={(e) =>
              onChange(
                "full_name",
                e.target.value
              )
            }
            placeholder="Enter your full name"
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

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            readOnly
            className="
              w-full
              cursor-not-allowed
              rounded-xl
              border
              border-slate-300
              bg-slate-100
              px-4
              py-3

              dark:border-slate-700
              dark:bg-slate-800
            "
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone Number
          </label>

          <input
            type="text"
            value={profile.phone ?? ""}
            onChange={(e) =>
              onChange(
                "phone",
                e.target.value
              )
            }
            placeholder="+8801XXXXXXXXX"
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

        {/* Gender */}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Gender
          </label>

          <select
            value={profile.gender ?? ""}
            onChange={(e) =>
              onChange(
                "gender",
                e.target.value
              )
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
          </select>
        </div>

        {/* Date of Birth */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Date of Birth
          </label>

          <input
            type="date"
            value={
              profile.date_of_birth ?? ""
            }
            onChange={(e) =>
              onChange(
                "date_of_birth",
                e.target.value
              )
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
          />
        </div>
      </div>
    </section>
  );
}