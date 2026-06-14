"use client";

export default function HabitProgress() {
  const progress = 78;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Habit Progress
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Your consistency this month.
      </p>

      <div className="mt-8">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">
            Progress
          </span>

          <span className="text-sm font-semibold text-emerald-500">
            {progress}%
          </span>
        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-emerald-50 p-4 text-center dark:bg-emerald-500/10">
          <p className="text-2xl font-bold text-emerald-500">
            24
          </p>

          <p className="text-xs text-slate-500">
            Completed
          </p>
        </div>

        <div className="rounded-2xl bg-cyan-50 p-4 text-center dark:bg-cyan-500/10">
          <p className="text-2xl font-bold text-cyan-500">
            8
          </p>

          <p className="text-xs text-slate-500">
            Active
          </p>
        </div>

        <div className="rounded-2xl bg-orange-50 p-4 text-center dark:bg-orange-500/10">
          <p className="text-2xl font-bold text-orange-500">
            21
          </p>

          <p className="text-xs text-slate-500">
            Best Streak
          </p>
        </div>
      </div>
    </div>
  );
}