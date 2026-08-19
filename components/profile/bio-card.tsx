"use client";

import { Profile } from "@/types/profile";

interface BioCardProps {
  profile: Profile;
  onChange: (
    field: keyof Profile,
    value: string
  ) => void;
}

const MAX_LENGTH = 300;

export default function BioCard({
  profile,
  onChange,
}: BioCardProps) {
  const bio = profile.bio ?? "";

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
            tracking-[0.18em]
            text-cyan-500
          "
        >
          About You
        </p>

        <h2 className="mt-1 text-lg font-bold">
          Personal Bio
        </h2>

        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Share a few words about yourself to personalize
          your wellness experience.
        </p>
      </div>

      {/* Textarea */}

      <textarea
        rows={4}
        maxLength={MAX_LENGTH}
        value={bio}
        onChange={(e) =>
          onChange("bio", e.target.value)
        }
        placeholder="Write about yourself, interests, goals, hobbies, study life, or anything you'd like your AI assistant or counselor to know..."
        className="
          w-full
          resize-none
          rounded-xl
          border
          border-slate-300
          bg-white
          px-3
          py-3
          text-xs
          leading-5
          outline-none
          transition

          focus:border-emerald-500
          focus:ring-1
          focus:ring-emerald-500/20

          dark:border-slate-700
          dark:bg-slate-800
        "
      />

      {/* Footer */}

      <div className="mt-2 flex items-center justify-between">
        <p className="text-[10px] text-slate-500 dark:text-slate-400">
          Maximum {MAX_LENGTH} characters
        </p>

        <span
          className={`
            text-xs
            font-semibold

            ${
              bio.length > 250
                ? "text-amber-500"
                : "text-slate-500"
            }
          `}
        >
          {bio.length}/{MAX_LENGTH}
        </span>
      </div>

      {/* Tip */}

      <div
        className="
          mt-4
          rounded-xl
          border
          border-emerald-200
          bg-emerald-50
          px-3
          py-2.5

          dark:border-emerald-900
          dark:bg-emerald-950/20
        "
      >
        <p className="text-[11px] leading-4 text-slate-600 dark:text-slate-300">
          💡 A short introduction helps AI and counselors
          better understand your background and provide
          more personalized guidance.
        </p>
      </div>
    </section>
  );
}