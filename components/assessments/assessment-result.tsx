import { Brain, Sparkles } from "lucide-react";

export default function AssessmentResult() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-500/10">
          <Brain className="h-6 w-6 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Assessment Result
          </h2>

          <p className="text-sm text-slate-500">
            Based on your responses
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
        <p className="text-sm text-slate-500">
          Stress Score
        </p>

        <h3 className="mt-2 text-4xl font-bold text-emerald-500">
          72%
        </h3>

        <p className="mt-2 text-sm">
          Moderate Stress Level
        </p>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-cyan-500" />

          <span className="font-semibold">
            AI Recommendation
          </span>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Consider maintaining 7–8 hours of sleep,
          practicing meditation, and scheduling a
          counseling session if stress persists.
        </p>
      </div>
    </div>
  );
}