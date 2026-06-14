"use client";

import { Moon, Plus } from "lucide-react";

export default function SleepForm() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3 dark:bg-blue-500/10">
          <Moon className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Log Sleep
          </h2>

          <p className="text-sm text-slate-500">
            Track your daily sleep routine
          </p>
        </div>
      </div>

      <form className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Sleep Time
          </label>

          <input
            type="time"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Wake Up Time
          </label>

          <input
            type="time"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Sleep Quality
          </label>

          <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800">
            <option>Excellent 😴</option>
            <option>Good 🙂</option>
            <option>Average 😐</option>
            <option>Poor 😔</option>
          </select>
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Save Sleep Log
        </button>
      </form>
    </div>
  );
}