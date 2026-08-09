"use client";

import { useEffect, useState } from "react";
import { BrainCircuit } from "lucide-react";

const STEPS = [
  "Reviewing your latest assessment...",
  "Understanding your emotional patterns...",
  "Analyzing stress, sleep and focus...",
  "Preparing personalized guidance...",
  "Almost ready...",
];

export default function TypingIndicator() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) =>
        prev >= STEPS.length - 1 ? prev : prev + 1
      );
    }, 1600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex w-full justify-start">
      <div className="flex max-w-3xl items-end gap-3">
        {/* Avatar */}

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-emerald-500
            via-cyan-500
            to-blue-500
            text-white
            shadow-lg
            animate-pulse
          "
        >
          <BrainCircuit className="h-5 w-5" />
        </div>

        {/* Bubble */}

        <div
          className="
            rounded-3xl
            rounded-bl-lg
            border
            border-slate-200/70
            bg-white/90
            px-5
            py-4
            shadow-md
            backdrop-blur-xl

            dark:border-slate-800
            dark:bg-slate-900/80
          "
        >
          {/* AI Title */}

          <div className="mb-3 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />

            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">
              WellMind AI
            </span>
          </div>

          {/* Animated Dots */}

          <div className="flex items-center gap-2">
            <span
              className="
                h-2.5
                w-2.5
                animate-bounce
                rounded-full
                bg-emerald-500
                [animation-delay:-0.3s]
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                animate-bounce
                rounded-full
                bg-cyan-500
                [animation-delay:-0.15s]
              "
            />

            <span
              className="
                h-2.5
                w-2.5
                animate-bounce
                rounded-full
                bg-blue-500
              "
            />
          </div>

          {/* Status */}

          <p
            className="
              mt-4
              text-sm
              font-medium
              text-slate-600
              transition-all
              duration-500

              dark:text-slate-300
            "
          >
            {STEPS[step]}
          </p>

          {/* Progress */}

          <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 transition-all duration-700"
              style={{
                width: `${((step + 1) / STEPS.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}