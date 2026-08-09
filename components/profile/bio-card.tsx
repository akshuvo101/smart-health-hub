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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-500">
          About You
        </p>

        <h2 className="mt-1 text-xl font-bold">
          Personal Bio
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Share a few words about yourself. This
          information helps provide a more
          personalized wellness experience.
        </p>
      </div>

      {/* Textarea */}

      <textarea
        rows={7}
        maxLength={MAX_LENGTH}
        value={bio}
        onChange={(e) =>
          onChange("bio", e.target.value)
        }
        placeholder="Write something about yourself, your interests, goals, hobbies, study life, or anything you'd like your counselor or AI assistant to know..."
        className="
          w-full
          resize-none
          rounded-2xl
          border
          border-slate-300
          px-4
          py-4
          text-sm
          leading-7
          outline-none
          transition

          focus:border-emerald-500

          dark:border-slate-700
          dark:bg-slate-800
        "
      />

      {/* Footer */}

      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Maximum {MAX_LENGTH} characters
        </p>

        <span
          className={`
            text-sm
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

      {/* Tips */}

      <div
        className="
          mt-6
          rounded-2xl
          border
          border-emerald-200
          bg-emerald-50
          p-4

          dark:border-emerald-900
          dark:bg-emerald-950/20
        "
      >
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          💡 A short introduction can help WellMind
          AI provide more personalized guidance and
          assist counselors in understanding your
          background when needed.
        </p>
      </div>
    </section>
  );
}