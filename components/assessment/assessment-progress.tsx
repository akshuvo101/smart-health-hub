"use client";

import { CheckCircle2 } from "lucide-react";

interface AssessmentProgressProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function AssessmentProgress({
  currentQuestion,
  totalQuestions,
}: AssessmentProgressProps) {
  const progress =
    totalQuestions > 0
      ? (currentQuestion / totalQuestions) * 100
      : 0;

  const remainingQuestions =
    Math.max(
      totalQuestions - currentQuestion,
      0
    );

  return (
    <div
      className="
        rounded-xl
        border
        border-slate-200/70
        bg-white/90
        p-3
        shadow-sm
        backdrop-blur-xl

        dark:border-slate-800
        dark:bg-slate-900/70
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              text-emerald-500
            "
          >
            Mental Assessment
          </p>

          <h2
            className="
              mt-0.5
              text-base
              font-semibold
              text-slate-900
              dark:text-white
            "
          >
            {currentQuestion}

            <span className="text-slate-400">
              {" "}
              / {totalQuestions}
            </span>
          </h2>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full

            bg-gradient-to-br
            from-emerald-500
            to-cyan-500

            text-[11px]
            font-bold
            text-white

            shadow-md
          "
        >
          {Math.round(progress)}%
        </div>
      </div>

      {/* Progress Bar */}

      <div className="mt-2">
        <div
          className="
            h-1.5
            overflow-hidden
            rounded-full
            bg-slate-200
            dark:bg-slate-800
          "
        >
          <div
            className="
              h-full
              rounded-full

              bg-gradient-to-r
              from-emerald-500
              via-teal-500
              to-cyan-500

              transition-all
              duration-500
              ease-out
            "
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}

      <div
        className="
          mt-2
          flex
          items-center
          justify-between
          text-[11px]
        "
      >
        <span className="text-slate-400">
          Start
        </span>

        <div
          className="
            flex
            items-center
            gap-1

            rounded-full
            bg-emerald-500/10

            px-2
            py-0.5

            text-emerald-600
            dark:text-emerald-400
          "
        >
          <CheckCircle2 className="h-3 w-3" />

          {remainingQuestions} left
        </div>

        <span className="text-slate-400">
          Finish
        </span>
      </div>
    </div>
  );
}