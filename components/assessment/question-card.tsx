"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
} from "lucide-react";

import OptionCard from "./option-card";
import { AssessmentQuestion } from "@/types/assessment";

interface QuestionCardProps {
  question: AssessmentQuestion;
  selectedValue: number | null;
  onSelect: (value: number) => void;

  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  canProceed: boolean;
  isSubmitting?: boolean;

  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function QuestionCard({
  question,
  selectedValue,
  onSelect,
  isFirstQuestion,
  isLastQuestion,
  canProceed,
  isSubmitting = false,
  onPrevious,
  onNext,
  onSubmit,
}: QuestionCardProps) {
  return (
    <motion.section
      key={question.id}
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      className="
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

      <div
        className="
          border-b
          border-slate-200/60
          px-5
          py-3

          dark:border-slate-800
        "
      >
        <span
          className="
            inline-flex
            rounded-full
            bg-gradient-to-r
            from-emerald-500/10
            to-cyan-500/10
            px-2.5
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.15em]
            text-emerald-600
          "
        >
          {question.category}
        </span>

        <h2
          className="
            mt-3
            text-lg
            font-semibold
            leading-snug
            text-slate-900

            dark:text-white
          "
        >
          {question.question}
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Choose one option.
        </p>
      </div>

      {/* Options */}

      <div className="space-y-2 p-4">
        {question.options.map((option) => (
          <OptionCard
            key={option.value}
            option={option}
            selected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>

      {/* Navigation */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-slate-200/60
          px-4
          py-3

          dark:border-slate-800
        "
      >
        {/* Previous */}

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={onPrevious}
          disabled={isFirstQuestion}
          className="
            inline-flex
            items-center
            gap-1.5

            rounded-lg
            border
            border-slate-300

            bg-white

            px-4
            py-2

            text-xs
            font-medium

            text-slate-700

            transition-all

            hover:border-emerald-300
            hover:bg-emerald-50

            disabled:pointer-events-none
            disabled:opacity-40

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-200
            dark:hover:bg-slate-800
          "
        >
          <ArrowLeft className="h-3.5 w-3.5" />

          Previous
        </motion.button>

        {!isLastQuestion ? (
          <motion.button
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
            type="button"
            onClick={onNext}
            disabled={!canProceed}
            className="
              inline-flex
              items-center
              gap-1.5

              rounded-lg

              bg-gradient-to-r
              from-emerald-500
              via-teal-500
              to-cyan-500

              px-5
              py-2

              text-xs
              font-semibold
              text-white

              shadow-md
              shadow-emerald-500/20

              transition-all

              hover:shadow-lg

              disabled:pointer-events-none
              disabled:opacity-40
            "
          >
            Next

            <ArrowRight className="h-3.5 w-3.5" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{
              y: -1,
            }}
            whileTap={{
              scale: 0.97,
            }}
            type="button"
            onClick={onSubmit}
            disabled={!canProceed || isSubmitting}
            className="
              relative
              overflow-hidden

              inline-flex
              items-center
              gap-1.5

              rounded-lg

              bg-gradient-to-r
              from-cyan-500
              via-sky-500
              to-indigo-500

              px-5
              py-2

              text-xs
              font-semibold
              text-white

              shadow-md
              shadow-cyan-500/20

              transition-all

              hover:shadow-lg
              hover:shadow-cyan-500/40

              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <div
              className="
                absolute
                inset-0
                -translate-x-full
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                animate-[shimmer_2.5s_infinite]
              "
            />

            <Brain className="relative h-3.5 w-3.5" />

            <span className="relative">
              {isSubmitting
                ? "Analyzing..."
                : "Generate"}
            </span>
          </motion.button>
        )}
      </div>
    </motion.section>
  );
}