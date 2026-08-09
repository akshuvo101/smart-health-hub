import Card from "@/components/ui/card";

import {
  Moon,
  Stars,
  TrendingUp,
  BadgeCheck,
} from "lucide-react";

export default function SleepCard() {
  return (
    <Card className="relative overflow-hidden">
      {/* Glow */}

      <div className="absolute -left-8 -bottom-8 h-28 w-28 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
              <Moon className="h-7 w-7 text-cyan-500" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                AI Sleep Prediction
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Estimated from your mental assessment
              </p>
            </div>
          </div>

          <div className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-600">
            Predicted
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <Stars className="h-10 w-10 text-cyan-500" />

          <div>
            <h2 className="text-3xl font-bold">
              Good
            </h2>

            <p className="text-sm text-slate-500">
              Estimated 7h 35m sleep
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500">
              Recovery
            </p>

            <p className="mt-1 text-xl font-bold text-cyan-500">
              84%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500">
              AI Confidence
            </p>

            <p className="mt-1 text-xl font-bold text-cyan-500">
              89%
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-sm">
            <BadgeCheck className="h-4 w-4 text-cyan-500" />
            Sleep pattern stable
          </div>

          <div className="flex items-center gap-1 text-sm font-medium text-cyan-500">
            <TrendingUp className="h-4 w-4" />
            Healthy
          </div>
        </div>
      </div>
    </Card>
  );
}