// app/doctor/dashboard/page.tsx

import {
  Users,
  Calendar,
  FileText,
  Activity,
  ArrowUpRight,
  Brain,
  Stethoscope,
  Clock,
} from "lucide-react";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 p-8 text-white shadow-2xl">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
            Doctor Portal 👨‍⚕️
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Patient Wellness Center
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Monitor patient wellness, assessments,
            appointments and AI-powered insights from a
            single dashboard.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-cyan-600 transition hover:-translate-y-1">
            View Analytics

            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 dark:bg-slate-900">
          <Users className="h-10 w-10 text-cyan-500" />

          <h3 className="mt-4 text-3xl font-bold">
            248
          </h3>

          <p className="text-slate-500">
            Total Patients
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 dark:bg-slate-900">
          <Calendar className="h-10 w-10 text-emerald-500" />

          <h3 className="mt-4 text-3xl font-bold">
            18
          </h3>

          <p className="text-slate-500">
            Today's Appointments
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 dark:bg-slate-900">
          <FileText className="h-10 w-10 text-purple-500" />

          <h3 className="mt-4 text-3xl font-bold">
            72
          </h3>

          <p className="text-slate-500">
            Reports Reviewed
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 dark:bg-slate-900">
          <Activity className="h-10 w-10 text-orange-500" />

          <h3 className="mt-4 text-3xl font-bold">
            91%
          </h3>

          <p className="text-slate-500">
            Patient Satisfaction
          </p>
        </div>
      </section>

      {/* Main Grid */}

      <section className="grid gap-6 xl:grid-cols-3">
        {/* Upcoming Appointments */}

        <div className="xl:col-span-2 rounded-3xl border bg-white p-6 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Upcoming Appointments
            </h2>

            <Calendar className="h-5 w-5 text-slate-500" />
          </div>

          <div className="space-y-4">
            {[
              "John Smith",
              "Emma Wilson",
              "David Lee",
              "Sarah Johnson",
            ].map((patient) => (
              <div
                key={patient}
                className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
              >
                <div>
                  <h3 className="font-medium">
                    {patient}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Mental Wellness Review
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  10:30 AM
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight */}

        <div className="rounded-3xl border bg-white p-6 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
              <Brain className="h-6 w-6 text-cyan-500" />
            </div>

            <div>
              <h2 className="font-semibold">
                AI Recommendation
              </h2>

              <p className="text-sm text-slate-500">
                Wellness Analysis
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm leading-relaxed">
              12 patients showed elevated stress
              levels this week. Consider scheduling
              follow-up consultations.
            </p>
          </div>

          <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 font-semibold text-white">
            Generate New Insight
          </button>
        </div>
      </section>

      {/* Quick Actions */}

      <section className="rounded-3xl border bg-white p-6 dark:bg-slate-900">
        <h2 className="mb-6 text-lg font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button className="rounded-2xl bg-cyan-500 p-5 font-semibold text-white">
            View Patients
          </button>

          <button className="rounded-2xl bg-emerald-500 p-5 font-semibold text-white">
            Appointments
          </button>

          <button className="rounded-2xl bg-purple-500 p-5 font-semibold text-white">
            Assessments
          </button>

          <button className="rounded-2xl bg-slate-800 p-5 font-semibold text-white">
            Reports
          </button>
        </div>
      </section>

      {/* Recent Activity */}

      <section className="rounded-3xl border bg-white p-6 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Stethoscope className="h-5 w-5 text-cyan-500" />

          <h2 className="text-lg font-semibold">
            Recent Medical Activity
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Reviewed assessment report for John Smith
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Completed wellness consultation with Emma
            Wilson
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Generated AI patient wellness summary
          </div>
        </div>
      </section>
    </div>
  );
}