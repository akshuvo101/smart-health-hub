"use client";

import {
  BadgeCheck,
  Brain,
  TrendingUp,
} from "lucide-react";

interface MentalScoreCardProps {
  score: number;
  mentalState: string;
  confidence: number;
  weeklyChange?: number;
}

export default function MentalScoreCard({
  score,
  mentalState,
  confidence,
  weeklyChange = 0,
}: MentalScoreCardProps) {
  const radius = 40;

  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (Math.max(0, Math.min(score, 100)) /
      100) *
      circumference;

  return (
    <section
      className="
        h-full
        rounded-2xl
        border
        border-slate-200/70
        bg-white/90
        p-4
        shadow-sm
        backdrop-blur-xl

        dark:border-slate-800
        dark:bg-slate-900/70
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">
            Overall Score
          </p>

          <h2 className="mt-0.5 text-base font-bold">
            Mental Health
          </h2>
        </div>

        <div
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            bg-emerald-500/10
          "
        >
          <Brain className="h-4 w-4 text-emerald-500" />
        </div>
      </div>

      {/* Score */}

      <div className="mt-4 flex justify-center">
        <div className="relative">
          <svg
            width="110"
            height="110"
            className="-rotate-90"
          >
            <circle
              cx="55"
              cy="55"
              r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="8"
            />

            <circle
              cx="55"
              cy="55"
              r={radius}
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />

            <defs>
              <linearGradient
                id="scoreGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#10b981"
                />

                <stop
                  offset="100%"
                  stopColor="#06b6d4"
                />
              </linearGradient>
            </defs>
          </svg>

          <div
            className="
              absolute
              inset-0
              flex
              flex-col
              items-center
              justify-center
            "
          >
            <h3 className="text-2xl font-bold">
              {score}
            </h3>

            <span className="text-xs text-slate-500">
              /100
            </span>
          </div>
        </div>
      </div>

      {/* Mental State */}

      <div
        className="
          mt-4
          rounded-lg
          bg-emerald-500/10
          px-3
          py-2
          text-center
        "
      >
        <p className="text-xs text-slate-500">
          Mental State
        </p>

        <h3
          className="
            mt-0.5
            text-base
            font-semibold
            text-emerald-600

            dark:text-emerald-400
          "
        >
          😌 {mentalState}
        </h3>
      </div>

      {/* Stats */}

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div
          className="
            rounded-lg
            border
            border-slate-200
            p-2.5

            dark:border-slate-700
          "
        >
          <div className="flex items-center gap-1.5">
            <BadgeCheck className="h-3.5 w-3.5 text-emerald-500" />

            <span className="text-[10px] text-slate-500">
              Confidence
            </span>
          </div>

          <h4 className="mt-1.5 text-lg font-bold">
            {confidence}%
          </h4>
        </div>

        <div
          className="
            rounded-lg
            border
            border-slate-200
            p-2.5

            dark:border-slate-700
          "
        >
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-cyan-500" />

            <span className="text-[10px] text-slate-500">
              Weekly
            </span>
          </div>

          <h4
            className={`mt-1.5 text-lg font-bold ${
              weeklyChange > 0
                ? "text-emerald-500"
                : weeklyChange < 0
                ? "text-red-500"
                : "text-slate-500"
            }`}
          >
            {weeklyChange > 0
              ? `+${weeklyChange}%`
              : `${weeklyChange}%`}
          </h4>
        </div>
      </div>
    </section>
  );
}