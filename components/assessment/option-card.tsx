"use client";

import { AssessmentOption } from "@/types/assessment";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { assessmentOptionTranslations } from "@/constants/assessment-translations";

interface OptionCardProps {
  option: AssessmentOption;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  option,
  selected,
  onClick,
}: OptionCardProps) {
  const banglaOption =
    assessmentOptionTranslations[option.label];

  return (
    <motion.button
      whileHover={{
        y: -1,
        scale: 1.005,
      }}
      whileTap={{
        scale: 0.98,
      }}
      transition={{
        duration: 0.18,
      }}
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        flex
        w-full
        items-center
        justify-between
        overflow-hidden
        rounded-xl
        border
        px-4
        py-2.5
        text-left
        transition-all
        duration-300

        ${
          selected
            ? `
              border-emerald-400
              bg-gradient-to-r
              from-emerald-500/10
              via-cyan-500/10
              to-transparent
              shadow-md
              shadow-emerald-500/10

              dark:border-emerald-500
            `
            : `
              border-slate-200
              bg-white/80
              backdrop-blur-xl

              hover:border-emerald-300
              hover:bg-emerald-50/50

              dark:border-slate-800
              dark:bg-slate-900/70
              dark:hover:border-emerald-600
            `
        }
      `}
    >
      {/* Left */}

      <div className="flex items-center gap-3">
        {/* Indicator */}

        <div
          className={`
            flex
            h-5
            w-5
            items-center
            justify-center
            rounded-full
            border-2
            transition-all

            ${
              selected
                ? `
                  border-emerald-500
                  bg-emerald-500
                `
                : `
                  border-slate-300
                  group-hover:border-emerald-400

                  dark:border-slate-700
                `
            }
          `}
        >
          {selected && (
            <Check className="h-3 w-3 text-white" />
          )}
        </div>

        {/* Label */}

        <div className="flex items-center gap-2">
          <h3
            className={`
              text-sm
              font-medium
              transition-colors

              ${
                selected
                  ? "text-emerald-700 dark:text-emerald-300"
                  : "text-slate-900 dark:text-white"
              }
            `}
          >
            {option.label}
          </h3>

          {banglaOption && (
            <span
              className="
                text-xs
                font-normal
                text-slate-500
                dark:text-slate-400
              "
            >
              ({banglaOption})
            </span>
          )}
        </div>
      </div>

      {/* Selected Badge */}

      {selected && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            rounded-full
            bg-emerald-500/10
            px-2
            py-0.5
            text-[10px]
            font-semibold
            text-emerald-600

            dark:text-emerald-300
          "
        >
          ✓
        </motion.div>
      )}

      {/* Glow */}

      {selected && (
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-xl
            ring-1
            ring-emerald-400/20
          "
        />
      )}
    </motion.button>
  );
}