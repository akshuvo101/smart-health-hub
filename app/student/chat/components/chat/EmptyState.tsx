"use client";

import {
  HeartHandshake,
  Sparkles,
} from "lucide-react";

/* ==========================================================
   Component
========================================================== */

export default function EmptyState() {
  return (
    <div
      className="
        flex
        h-full
        items-center
        justify-center

        px-6
        py-10
      "
    >
      <div
        className="
          flex
          w-full
          max-w-2xl
          flex-col
          items-center
          text-center
        "
      >
        {/* ======================================
            Icon
        ====================================== */}

        <div className="relative mb-8">
          <div
            className="
              absolute
              inset-0

              rounded-full

              bg-indigo-500/20

              blur-3xl
            "
          />

          <div
            className="
              relative

              flex
              h-20
              w-20
              items-center
              justify-center

              rounded-3xl

              bg-gradient-to-br
              from-indigo-500
              via-violet-500
              to-sky-500

              text-white

              shadow-xl
              shadow-indigo-500/20
            "
          >
            <HeartHandshake className="h-9 w-9" />
          </div>
        </div>

        {/* ======================================
            Badge
        ====================================== */}

        <div
          className="
            mb-5

            flex
            items-center
            gap-2

            rounded-full

            border
            border-indigo-100

            bg-indigo-50

            px-4
            py-2

            text-sm
            font-medium

            text-indigo-700

            dark:border-indigo-900/50
            dark:bg-indigo-950/30
            dark:text-indigo-300
          "
        >
          <Sparkles className="h-4 w-4" />

          WellMind AI Assistant
        </div>

        {/* ======================================
            Title
        ====================================== */}

        <h1
          className="
            text-3xl
            font-bold

            tracking-tight

            text-slate-900

            dark:text-white
          "
        >
          Welcome 👋
        </h1>

        {/* ======================================
            Description
        ====================================== */}

        <p
          className="
            mt-5

            max-w-xl

            text-[16px]
            leading-8

            text-slate-500

            dark:text-slate-400
          "
        >
          I'm here to support your mental wellbeing,
          help you reflect on your emotions, understand
          your habits, and guide you toward healthier
          daily routines.
        </p>

        {/* ======================================
            Suggestions
        ====================================== */}

        <div
          className="
            mt-12

            grid
            w-full

            gap-3

            sm:grid-cols-2
          "
        >
          {[
            "😊 I'm feeling stressed today",
            "😴 Help me improve my sleep",
            "📚 I can't focus on studying",
            "🌱 Give me today's wellness advice",
          ].map((item) => (
            <div
              key={item}
              className="
                cursor-pointer

                rounded-2xl

                border
                border-slate-200

                bg-white/70

                px-5
                py-4

                text-left
                text-sm

                text-slate-700

                shadow-sm

                transition-all

                hover:-translate-y-1
                hover:border-indigo-300
                hover:shadow-lg

                dark:border-slate-700
                dark:bg-slate-900/60
                dark:text-slate-300
              "
            >
              {item}
            </div>
          ))}
        </div>

        {/* ======================================
            Footer
        ====================================== */}

        <p
          className="
            mt-10

            text-sm

            text-slate-400

            dark:text-slate-500
          "
        >
          Start by sending a message below. Your
          conversations are private and focused on
          supporting your wellbeing.
        </p>
      </div>
    </div>
  );
}