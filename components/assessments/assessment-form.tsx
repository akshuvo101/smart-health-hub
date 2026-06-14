"use client";

import { Brain, ArrowRight } from "lucide-react";

const assessments = [
  {
    title: "Stress Assessment",
    description: "Evaluate your current stress level.",
  },
  {
    title: "Anxiety Assessment",
    description: "Measure anxiety symptoms and patterns.",
  },
  {
    title: "Depression Assessment",
    description: "Understand your emotional wellbeing.",
  },
  {
    title: "Burnout Assessment",
    description: "Check academic and mental burnout signs.",
  },
];

export default function AssessmentForm() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-purple-100 p-3 dark:bg-purple-500/10">
          <Brain className="h-6 w-6 text-purple-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Available Assessments
          </h2>

          <p className="text-sm text-slate-500">
            Choose an assessment to begin.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {assessments.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 p-4 transition-all hover:border-purple-500 hover:shadow-md dark:border-slate-700"
          >
            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {item.description}
            </p>

            <button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm font-medium text-white">
              Start Assessment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}