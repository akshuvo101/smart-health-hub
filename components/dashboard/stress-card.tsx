import Card from "@/components/ui/card";

import {
  BrainCircuit,
  ShieldCheck,
  TrendingDown,
  Activity,
} from "lucide-react";

export default function StressCard() {
  return (
    <Card className="relative overflow-hidden">
      {/* Background Glow */}

      <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative">
        {/* Header */}
        
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10">
              <BrainCircuit className="h-7 w-7 text-amber-500" />
            </div>

            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                AI Stress Analysis
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Based on your latest assessment
              </p>
            </div>
          </div>

          <div className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600">
            Live
          </div>
        </div>

        {/* Result */}

        <div className="mt-8 flex items-center gap-4">
          <Activity className="h-10 w-10 text-amber-500" />

          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Low
            </h2>

            <p className="text-sm text-slate-500">
              Confidence 88%
            </p>
          </div>
        </div>

        {/* Stats */}

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500">
              Burnout Risk
            </p>

            <p className="mt-1 text-xl font-bold text-amber-500">
              18%
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-xs text-slate-500">
              Stress Score
            </p>

            <p className="mt-1 text-xl font-bold text-amber-500">
              3.2 / 10
            </p>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />

            Stress remains under control
          </div>

          <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
            <TrendingDown className="h-4 w-4" />

            Improving
          </div>
        </div>
      </div>
    </Card>
  );
}