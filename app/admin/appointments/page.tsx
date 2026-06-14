import {
  Calendar,
  Clock,
} from "lucide-react";

const appointments = [
  {
    student: "AK Shuvo",
    counselor: "Dr. Sarah Ahmed",
    date: "10 June 2026",
    time: "3:00 PM",
  },
  {
    student: "Basir Uddin",
    counselor: "Dr. John Smith",
    date: "12 June 2026",
    time: "5:00 PM",
  },
];

export default function AppointmentsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Appointments
        </h1>

        <p className="mt-3 text-white/90">
          Review and manage counseling sessions.
        </p>
      </section>

      <div className="grid gap-6">
        {appointments.map((item) => (
          <div
            key={item.student}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="text-xl font-semibold">
              {item.student}
            </h3>

            <p className="mt-2 text-slate-500">
              Counselor: {item.counselor}
            </p>

            <div className="mt-4 flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {item.date}
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}