"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Heart,
  Moon,
  Flame,
  Activity,
  MessageCircle,
  LucideIcon,
} from "lucide-react";

import {
  Assessment,
  Recommendation,
  AssessmentLevel,
} from "@/types/assessment";

interface Props {
  assessment: Assessment;
}

export default function AssessmentResultCard({
  assessment,
}: Props) {
  const insights = [
    {
      title: "Stress",
      value: assessment.stress,
    },
    {
      title: "Anxiety",
      value: assessment.anxiety,
    },
    {
      title: "Burnout",
      value: assessment.burnout,
    },
    {
      title: "Sleep",
      value: assessment.sleep,
    },
  ];

  const getLevelColor = (
    level: AssessmentLevel
  ) => {
    switch (level) {
      case "Very Low":
      case "Low":
        return "text-emerald-500";

      case "Moderate":
        return "text-amber-500";

      case "High":
        return "text-orange-500";

      case "Very High":
        return "text-red-500";

      default:
        return "text-slate-500";
    }
  };

  const getIcon = (
    recommendation: Recommendation
  ): LucideIcon => {
    const title =
      recommendation.title.toLowerCase();

    if (
      title.includes("sleep") ||
      title.includes("bed")
    ) {
      return Moon;
    }

    if (
      title.includes("stress") ||
      title.includes("breath") ||
      title.includes("mindfulness") ||
      title.includes("relax")
    ) {
      return Heart;
    }

    if (
      title.includes("focus") ||
      title.includes("study") ||
      title.includes("productivity")
    ) {
      return Activity;
    }

    if (
      title.includes("burnout") ||
      title.includes("energy") ||
      title.includes("rest")
    ) {
      return Flame;
    }

    return Brain;
  };

  return (
    <section
      className="
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-200/70
        bg-white/90
        shadow-sm
        backdrop-blur-xl

        dark:border-slate-800
        dark:bg-slate-900/70
      "
    >
      {/* Header */}

      <div className="border-b border-slate-200/60 px-4 py-2.5 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-lg
              bg-emerald-500/10
            "
          >
            <Brain className="h-5 w-5 text-emerald-500" />
          </div>

          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-500">
              Assessment
            </p>

            <h2 className="mt-0.5 text-base font-bold">
              Result
            </h2>
          </div>

          <div
            className="
              rounded-lg
              bg-gradient-to-r
              from-emerald-500
              to-cyan-500
              px-3
              py-2
              text-center
              text-white
            "
          >
            <p className="text-2xl font-bold leading-none">
              {assessment.score}
            </p>

            <p className="mt-0.5 text-xs">
              /100
            </p>
          </div>
        </div>
      </div>

      {/* Insights */}

      <div className="grid grid-cols-2 gap-2 p-3">
        {insights.map((item) => (
          <div
            key={item.title}
            className="
              rounded-lg
              border
              border-slate-200/70
              p-2.5
              transition-all
              hover:shadow-sm

              dark:border-slate-800
            "
          >
            <p className="text-xs text-slate-500">
              {item.title}
            </p>

            <h3
              className={`mt-1 text-base font-bold ${getLevelColor(
                item.value
              )}`}
            >
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Recommendations */}

      <div className="border-t border-slate-200/60 px-4 py-3 dark:border-slate-800">
        <h3 className="mb-2.5 text-sm font-semibold">
          AI Recommendations
        </h3>

        {assessment.recommendations.length === 0 ? (
          <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-800">
            <p className="text-xs text-slate-500">
              No recommendations available yet.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {assessment.recommendations
              .slice(0, 4)
              .map((item) => {
                const Icon = getIcon(item);

                return (
                  <div
                    key={item.title}
                    className="
                      flex
                      gap-3
                      rounded-lg
                      bg-slate-50
                      px-3
                      py-2.5

                      dark:bg-slate-800
                    "
                  >
                    <div className="mt-0.5">
                      <Icon className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-semibold">
                        {item.title}
                      </p>

                      <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* AI Chat */}

      <div className="mt-auto border-t border-slate-200/60 p-3 dark:border-slate-800">
        <Link
          href="/student/chat"
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-lg
            bg-gradient-to-r
            from-emerald-500
            via-teal-500
            to-cyan-500
            py-2.5
            text-xs
            font-semibold
            text-white
            transition-all

            hover:-translate-y-0.5
            hover:shadow-md
          "
        >
          <MessageCircle className="h-4 w-4" />

          Talk with WellMind AI

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}