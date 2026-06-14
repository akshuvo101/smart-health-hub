import { Moon } from "lucide-react";

export default function SleepCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Average Sleep
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            7.8h
          </h2>

          <p className="mt-2 text-sm text-emerald-500">
            +0.6h from last week
          </p>
        </div>

        <div className="rounded-3xl bg-blue-100 p-4 dark:bg-blue-500/10">
          <Moon className="h-10 w-10 text-blue-600" />
        </div>
      </div>
    </div>
  );
}