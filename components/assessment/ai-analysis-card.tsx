"use client";

import {
  AlertTriangle,
  CheckCircle2,
  Focus,
  Moon,
  ShieldAlert,
  Users,
  Brain,
  LucideIcon,
  Heart,
} from "lucide-react";

import {
  Assessment,
  AICategoryAnalysis,
} from "@/types/assessment";

interface AnalysisItem {
  title: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  glow: string;
  icon: LucideIcon;
  data: AICategoryAnalysis;
}

interface AIAnalysisCardProps {
  assessment: Assessment;
}

export default function AIAnalysisCard({
  assessment,
}: AIAnalysisCardProps) {
  const categories = assessment.ai_analysis;

  /**
  
  * AI analysis unavailable
    */
  if (!categories) {
    return (

      <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-slate-200/70 bg-white/90 p-6 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800">
            <Brain className="h-6 w-6 text-slate-500 dark:text-slate-400" />
          </div>

          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            AI analysis is not available yet.
          </p>

          <p className="mt-1.5 text-xs text-slate-400 dark:text-slate-500">
            Your assessment is still being analyzed.
          </p>

        </div>
      </div>


    );


  }

  /**
  
  * Get visual style from AI level
    */
  const getLevelStyle = (
    level: string,
    fallbackColor: string,
    fallbackBg: string,
    fallbackBorder: string,
    fallbackGlow: string
  ) => {
    switch (level) {
      case "Very Low":
      case "Low":
        return {
          color:
            "text-emerald-600 dark:text-emerald-400",
          bg: "bg-emerald-500/10",
          border:
            "border-emerald-200/70 dark:border-emerald-900/50",
          glow: "group-hover:shadow-emerald-500/10",
        };

      case "Moderate":
        return {
          color:
            "text-amber-600 dark:text-amber-400",
          bg: "bg-amber-500/10",
          border:
            "border-amber-200/70 dark:border-amber-900/50",
          glow: "group-hover:shadow-amber-500/10",
        };

      case "High":
        return {
          color:
            "text-orange-600 dark:text-orange-400",
          bg: "bg-orange-500/10",
          border:
            "border-orange-200/70 dark:border-orange-900/50",
          glow: "group-hover:shadow-orange-500/10",
        };

      case "Very High":
        return {
          color:
            "text-red-600 dark:text-red-400",
          bg: "bg-red-500/10",
          border:
            "border-red-200/70 dark:border-red-900/50",
          glow: "group-hover:shadow-red-500/10",
        };

      default:
        return {
          color: fallbackColor,
          bg: fallbackBg,
          border: fallbackBorder,
          glow: fallbackGlow,
        };
    }
  };

  const analysis: AnalysisItem[] = [
    {
      title: "Stress",
      emoji: "😌",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      border:
        "border-emerald-200/70 dark:border-emerald-900/50",
      glow: "group-hover:shadow-emerald-500/10",
      icon: CheckCircle2,
      data: categories.stress,
    },
    {
      title: "Anxiety",
      emoji: "😟",
      color: "text-amber-600",
      bg: "bg-amber-500/10",
      border:
        "border-amber-200/70 dark:border-amber-900/50",
      glow: "group-hover:shadow-amber-500/10",
      icon: AlertTriangle,
      data: categories.anxiety,
    },

    {
      title: "Depression",
      emoji: "🌧️",
      color: "text-blue-600",
      bg: "bg-blue-500/10",
      border:
        "border-blue-200/70 dark:border-blue-900/50",
      glow: "group-hover:shadow-blue-500/10",
      icon: Brain,
      data: categories.depression,
    },

    {
      title: "Burnout",
      emoji: "🔥",
      color: "text-cyan-600",
      bg: "bg-cyan-500/10",
      border:
        "border-cyan-200/70 dark:border-cyan-900/50",
      glow: "group-hover:shadow-cyan-500/10",
      icon: ShieldAlert,
      data: categories.burnout,
    },

    {
      title: "Sleep",
      emoji: "🌙",
      color: "text-indigo-600",
      bg: "bg-indigo-500/10",
      border:
        "border-indigo-200/70 dark:border-indigo-900/50",
      glow: "group-hover:shadow-indigo-500/10",
      icon: Moon,
      data: categories.sleep,
    },

    {
      title: "Focus",
      emoji: "🎯",
      color: "text-violet-600",
      bg: "bg-violet-500/10",
      border:
        "border-violet-200/70 dark:border-violet-900/50",
      glow: "group-hover:shadow-violet-500/10",
      icon: Focus,
      data: categories.focus,
    },

    {
      title: "Social",
      emoji: "🤝",
      color: "text-pink-600",
      bg: "bg-pink-500/10",
      border:
        "border-pink-200/70 dark:border-pink-900/50",
      glow: "group-hover:shadow-pink-500/10",
      icon: Users,
      data: categories.social,
    },
    {
      title: "Mood",
      emoji: "💚",
      color: "text-emerald-600",
      bg: "bg-emerald-500/10",
      border:
        "border-emerald-200/70 dark:border-emerald-900/50",
      glow:
        "group-hover:shadow-emerald-500/10",
      icon: Heart,
      data: categories.mood,
    },

  ];

  return (<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
    {analysis.map((item) => {
      const Icon = item.icon;

      if (!item.data) {
        return null;
      }

      const levelStyle = getLevelStyle(
        item.data.level,
        item.color,
        item.bg,
        item.border,
        item.glow
      );

      return (
        <div
          key={item.title}
          className={`
          group
          relative
          aspect-square
          overflow-visible
          rounded-2xl
          border
          bg-white/90
          p-3
          shadow-sm
          backdrop-blur-xl
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          dark:bg-slate-900/70

          ${levelStyle.border}
          ${levelStyle.glow}
        `}
        >
          {/* Subtle background glow */}

          <div
            className={`
            pointer-events-none
            absolute
            inset-0
            -z-10
            rounded-2xl
            opacity-0
            blur-xl
            transition-opacity
            duration-300
            group-hover:opacity-100
            ${levelStyle.bg}
          `}
          />

          {/* Top Section */}

          <div className="flex items-start justify-between gap-2">
            {/* Icon */}

            <div
              className={`
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-xl
              transition-transform
              duration-300
              group-hover:scale-110
              ${levelStyle.bg}
            `}
            >
              <Icon
                className={`
                h-4
                w-4
                ${levelStyle.color}
              `}
              />
            </div>

            {/* Level */}

            <span
              className={`
              max-w-[90px]
              truncate
              rounded-full
              px-2
              py-1
              text-[9px]
              font-bold
              uppercase
              tracking-wide
              ${levelStyle.bg}
              ${levelStyle.color}
            `}
            >
              {item.data.level}
            </span>
          </div>

          {/* Center Emoji */}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Emoji glow */}

              <div
                className={`
                absolute
                inset-0
                scale-75
                rounded-full
                opacity-0
                blur-xl
                transition-all
                duration-300
                group-hover:scale-100
                group-hover:opacity-60
                ${levelStyle.bg}
              `}
              />

              <span
                className="
                relative
                z-10
                select-none
                text-[36px]
                drop-shadow-sm
                transition-transform
                duration-300
                group-hover:scale-110
              "
              >
                {item.emoji}
              </span>
            </div>
          </div>

          {/* Bottom Section */}

          <div className="absolute bottom-3 left-2 right-2">
            <p className="text-center text-xs font-bold text-slate-900 dark:text-white">
              {item.title}
            </p>

            <p
              className={`
              mt-0.5
              text-center
              text-[9px]
              font-medium
              ${levelStyle.color}
            `}
            >
              Wellness indicator
            </p>
          </div>

          {/* Tooltip */}

          <div
            className="
    pointer-events-none
    invisible
    absolute
    bottom-full
    left-1/2
    z-50
    mb-3
    w-60
    -translate-x-1/2
    translate-y-1
    rounded-xl
    border
    border-slate-700/60
    bg-slate-950/95
    p-3
    text-left
    opacity-0
    shadow-2xl
    backdrop-blur-xl
    transition-all
    duration-200

    group-hover:visible
    group-hover:translate-y-0
    group-hover:opacity-100
  "
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  {item.emoji}
                </span>

                <span className="text-xs font-bold text-white">
                  {item.title}
                </span>
              </div>

              <span
                className={`
        rounded-full
        px-2
        py-1
        text-[9px]
        font-bold
        ${levelStyle.bg}
        ${levelStyle.color}
      `}
              >
                {item.data.level}
              </span>
            </div>

            <p className="text-[11px] leading-4 text-slate-300">
              {item.data.analysis}
            </p>
          </div>
        </div>
      );
    })}
  </div>
  );
}
