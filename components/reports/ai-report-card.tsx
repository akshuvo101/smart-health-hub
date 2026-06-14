import { Brain, Sparkles } from "lucide-react";

export default function AIReportCard() {
  return (
    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-emerald-500/5 p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-cyan-500/10 p-3">
          <Brain className="h-6 w-6 text-cyan-500" />
        </div>

        <div>
          <h2 className="font-semibold">
            AI Wellness Analysis
          </h2>

          <p className="text-sm text-slate-500">
            Personalized Insights
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="rounded-2xl bg-white/60 p-4 dark:bg-slate-900/50">
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Your mood improved by 14% compared to
            last month. Sleep consistency is excellent
            and habit completion remains strong.
          </p>
        </div>

        <div className="rounded-2xl bg-white/60 p-4 dark:bg-slate-900/50">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />

            <span className="font-medium">
              Recommendation
            </span>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            Continue maintaining 7–8 hours of sleep
            and schedule a wellness session if stress
            levels increase.
          </p>
        </div>
      </div>
    </div>
  );
}