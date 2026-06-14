import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";

const appointments = [
  {
    id: "APT-1001",
    patient: "Emma Wilson",
    date: "Today",
    time: "10:00 AM",
    type: "Consultation",
    status: "Upcoming",
  },
  {
    id: "APT-1002",
    patient: "John Smith",
    date: "Today",
    time: "11:30 AM",
    type: "Follow-up",
    status: "Completed",
  },
  {
    id: "APT-1003",
    patient: "David Lee",
    date: "Tomorrow",
    time: "02:00 PM",
    type: "Assessment Review",
    status: "Upcoming",
  },
  {
    id: "APT-1004",
    patient: "Sarah Johnson",
    date: "Tomorrow",
    time: "04:00 PM",
    type: "Mental Wellness",
    status: "Cancelled",
  },
];

export default function DoctorAppointmentsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-2xl">
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
          Appointment Management
        </span>

        <h1 className="mt-5 text-4xl font-bold">
          Doctor Appointments
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Manage consultations, follow-ups,
          patient schedules, and treatment
          sessions efficiently.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Calendar className="h-10 w-10 text-violet-500" />

          <h2 className="mt-4 text-3xl font-bold">
            42
          </h2>

          <p className="text-slate-500">
            Total Appointments
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Clock className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            12
          </h2>

          <p className="text-slate-500">
            Upcoming Today
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            25
          </h2>

          <p className="text-slate-500">
            Completed
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <XCircle className="h-10 w-10 text-red-500" />

          <h2 className="mt-4 text-3xl font-bold">
            5
          </h2>

          <p className="text-slate-500">
            Cancelled
          </p>
        </div>
      </section>

      {/* Search */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search appointment..."
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-violet-500
                dark:border-slate-800
                dark:bg-slate-800
              "
            />
          </div>

          <button
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-slate-200
              px-5
              py-3
              dark:border-slate-800
            "
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </section>

      {/* Appointments Table */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                <th className="px-6 py-4 text-left">
                  Patient
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-left">
                  Time
                </th>

                <th className="px-6 py-4 text-left">
                  Type
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                        <User className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="font-medium">
                          {appointment.patient}
                        </h3>

                        <p className="text-sm text-slate-500">
                          {appointment.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {appointment.date}
                  </td>

                  <td className="px-6 py-5">
                    {appointment.time}
                  </td>

                  <td className="px-6 py-5">
                    {appointment.type}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          appointment.status ===
                          "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : appointment.status ===
                                "Upcoming"
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-xl bg-violet-500 px-3 py-2 text-sm font-medium text-white">
                        View
                      </button>

                      <button className="rounded-xl bg-emerald-500 px-3 py-2 text-sm font-medium text-white">
                        Complete
                      </button>

                      <button className="rounded-xl bg-red-500 px-3 py-2 text-sm font-medium text-white">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Today's Schedule */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <AlertCircle className="h-6 w-6 text-violet-500" />

          <h2 className="text-xl font-semibold">
            Today's Schedule
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-950/20">
            <p className="font-medium">
              10:00 AM — Emma Wilson
            </p>

            <p className="mt-1 text-sm text-slate-500">
              General Consultation
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 dark:border-cyan-900 dark:bg-cyan-950/20">
            <p className="font-medium">
              11:30 AM — John Smith
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Follow-up Session
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}