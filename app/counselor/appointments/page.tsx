import {
  CalendarDays,
  Clock3,
  User,
  Video,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function CounselorAppointmentsPage() {
  const appointments = [
    {
      id: 1,
      student: "Sarah Johnson",
      date: "June 8, 2026",
      time: "10:00 AM",
      type: "Counseling Session",
      status: "Upcoming",
    },
    {
      id: 2,
      student: "Michael Chen",
      date: "June 8, 2026",
      time: "02:00 PM",
      type: "Stress Management",
      status: "Confirmed",
    },
    {
      id: 3,
      student: "Emma Wilson",
      date: "June 9, 2026",
      time: "11:30 AM",
      type: "Follow-up Session",
      status: "Pending",
    },
    {
      id: 4,
      student: "James Lee",
      date: "June 10, 2026",
      time: "03:00 PM",
      type: "Mental Wellness Review",
      status: "Completed",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
              Appointment Management
            </span>

            <h1 className="mt-4 text-4xl font-bold">
              Student Appointments
            </h1>

            <p className="mt-3 max-w-2xl text-white/90">
              Manage counseling sessions, monitor schedules,
              and support student wellness through timely
              consultations.
            </p>
          </div>

          <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-purple-600 transition hover:-translate-y-1">
            New Appointment
          </button>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CalendarDays className="mb-4 h-10 w-10 text-violet-500" />

          <h3 className="text-3xl font-bold">28</h3>

          <p className="text-slate-500">
            Total Appointments
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Clock3 className="mb-4 h-10 w-10 text-cyan-500" />

          <h3 className="text-3xl font-bold">8</h3>

          <p className="text-slate-500">
            Today's Sessions
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="mb-4 h-10 w-10 text-emerald-500" />

          <h3 className="text-3xl font-bold">16</h3>

          <p className="text-slate-500">
            Completed This Week
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertCircle className="mb-4 h-10 w-10 text-orange-500" />

          <h3 className="text-3xl font-bold">4</h3>

          <p className="text-slate-500">
            Pending Requests
          </p>
        </div>
      </section>

      {/* Appointment Table */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Upcoming Appointments
          </h2>

          <button className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white">
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-slate-200
                p-5
                transition
                hover:border-violet-300
                hover:shadow-md
                dark:border-slate-800
              "
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="font-semibold">
                    {appointment.type}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {appointment.student}
                    </span>

                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      {appointment.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {appointment.time}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span
                    className={`
                      rounded-full
                      px-3
                      py-1
                      text-xs
                      font-medium
                      ${
                        appointment.status === "Completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : appointment.status === "Pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-violet-100 text-violet-700"
                      }
                    `}
                  >
                    {appointment.status}
                  </span>

                  <button className="flex items-center gap-2 rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white">
                    <Video className="h-4 w-4" />
                    Join
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Schedule Overview */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Today's Schedule
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              10:00 AM — Sarah Johnson
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              11:30 AM — Emma Wilson
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              02:00 PM — Michael Chen
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              03:30 PM — James Lee
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Appointment Insights
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              📈 Session attendance increased by 12%
              this month.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              🧠 Most common topic: Academic Stress.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              💬 Student satisfaction score: 4.8/5.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              🎯 Follow-up completion rate: 92%.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}