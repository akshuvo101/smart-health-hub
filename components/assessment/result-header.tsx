"use client";

import Link from "next/link";

import {
  ArrowLeft,
  BadgeCheck,
  Brain,
  Sparkles,
} from "lucide-react";

interface ResultHeaderProps {
  
  mentalState: string;

  confidence: number;
  
}

export default function ResultHeader({
  mentalState,
  
  confidence,
  
}: ResultHeaderProps) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[36px]
        bg-gradient-to-br
        from-violet-600
        via-indigo-600
        to-cyan-600
        p-10
        text-white
        shadow-2xl
      "
    >
      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10">

        {/* Back */}

        <Link
          href="/student"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-white/80
            transition
            hover:text-white
          "
        >
          <ArrowLeft className="h-4 w-4" />

          Back to Dashboard
        </Link>

        {/* Badge */}

        <div
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white/15
            px-4
            py-2
            text-sm
            font-medium
            backdrop-blur
          "
        >
          <Sparkles className="h-4 w-4" />

          AI Analysis Complete
        </div>

        {/* Title */}

        <h1 className="mt-6 text-4xl font-bold lg:text-5xl">
          Your Mental Health Report
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-white/90">
          Based on your responses, our AI analyzed your
          emotional wellbeing and generated personalized
          insights and recommendations.
        </p>

        {/* Summary */}

        <div className="mt-10 flex flex-wrap gap-5">

          {/* Mental State */}

          <div
            className="
              rounded-3xl
              bg-white/10
              px-6
              py-5
              backdrop-blur
            "
          >
            <div className="flex items-center gap-3">

              <Brain className="h-7 w-7" />

              <div>

                <p className="text-sm text-white/70">
                  Mental State
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {mentalState}
                </h2>

              </div>

            </div>
          </div>

          {/* Confidence */}

          <div
            className="
              rounded-3xl
              bg-white/10
              px-6
              py-5
              backdrop-blur
            "
          >
            <div className="flex items-center gap-3">

              <BadgeCheck className="h-7 w-7 text-emerald-300" />

              <div>

                <p className="text-sm text-white/70">
                  Confidence
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {confidence}%
                </h2>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}