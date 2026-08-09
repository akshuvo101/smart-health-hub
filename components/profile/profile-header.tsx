"use client";

import { UserCircle2 } from "lucide-react";

export default function ProfileHeader() {
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
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-500
            to-cyan-500
            text-white
          "
        >
          <UserCircle2 className="h-7 w-7" />
        </div>

        <div>
          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.22em]
              text-cyan-500
            "
          >
            Student Profile
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your personal, academic and
            university information.
          </p>
        </div>
      </div>
    </section>
  );
}