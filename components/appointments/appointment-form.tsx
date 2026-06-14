"use client";

import { CalendarPlus } from "lucide-react";

export default function AppointmentForm() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-2xl bg-emerald-100 p-3 dark:bg-emerald-500/10">
          <CalendarPlus className="h-6 w-6 text-emerald-600" />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Book Appointment
          </h2>

          <p className="text-sm text-slate-500">
            Schedule a session with a wellness counselor.
          </p>
        </div>
      </div>

      <form className="space-y-4">
        <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800">
          <option>Select Counselor</option>
          <option>Dr. Sarah Ahmed</option>
          <option>Dr. Emily Johnson</option>
          <option>Dr. Michael Brown</option>
        </select>

        <input
          type="date"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <input
          type="time"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <textarea
          rows={4}
          placeholder="Reason for appointment..."
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <button
          type="submit"
          className="w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg"
        >
          Book Session
        </button>
      </form>
    </div>
  );
}