import { Calendar, Clock, User } from "lucide-react";

export default function AppointmentCard() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-500/10">
            Confirmed
          </span>

          <h3 className="mt-4 text-xl font-semibold">
            Wellness Counseling Session
          </h3>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
          <User className="h-5 w-5 text-emerald-500" />
          Dr. Sarah Ahmed
        </div>

        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
          <Calendar className="h-5 w-5 text-emerald-500" />
          June 10, 2026
        </div>

        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
          <Clock className="h-5 w-5 text-emerald-500" />
          03:00 PM
        </div>
      </div>
    </div>
  );
}