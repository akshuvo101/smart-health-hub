"use client";

import { Plus } from "lucide-react";

export default function HabitForm() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
          Add New Habit
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Build healthy routines and stay consistent.
        </p>
      </div>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Habit Name"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800">
          <option>Daily</option>
          <option>Weekly</option>
        </select>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Add Habit
        </button>
      </form>
    </div>
  );
}