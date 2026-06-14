import {
  FileBarChart,
  TrendingUp,
  Brain,
  Download,
  Calendar,
  Users,
  Activity,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

export default function DoctorReportsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
            Clinical Analytics
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Reports & Insights
          </h1>

          <p className="mt-4 max-w-3xl text-white/90">
            Monitor patient outcomes, assessment trends,
            appointment performance and AI-powered wellness
            analytics.
          </p>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Users className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            1,248
          </h2>

          <p className="text-slate-500">
            Total Patients
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Activity className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            92%
          </h2>

          <p className="text-slate-500">
            Treatment Success Rate
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="h-10 w-10 text-violet-500" />

          <h2 className="mt-4 text-3xl font-bold">
            846
          </h2>

          <p className="text-slate-500">
            AI Reports Generated
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="h-10 w-10 text-orange-500" />

          <h2 className="mt-4 text-3xl font-bold">
            31
          </h2>

          <p className="text-slate-500">
            High Risk Cases
          </p>
        </div>
      </section>

      {/* Reports Grid */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-emerald-500" />

            <h2 className="text-xl font-semibold">
              Patient Recovery Trends
            </h2>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800">
            <p className="text-5xl font-bold text-emerald-500">
              +18%
            </p>

            <p className="mt-2 text-slate-500">
              Improvement compared to last month
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-cyan-500" />

            <h2 className="text-xl font-semibold">
              Appointment Analytics
            </h2>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800">
            <p className="text-5xl font-bold text-cyan-500">
              428
            </p>

            <p className="mt-2 text-slate-500">
              Sessions completed this month
            </p>
          </div>
        </div>
      </section>

      {/* Report Categories */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <FileBarChart className="h-12 w-12 text-violet-500" />

          <h3 className="mt-5 text-xl font-semibold">
            Clinical Report
          </h3>

          <p className="mt-3 text-slate-500">
            Comprehensive treatment and diagnosis
            summaries.
          </p>

          <button className="mt-6 flex items-center gap-2 text-violet-500 font-medium">
            Open Report
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <Brain className="h-12 w-12 text-cyan-500" />

          <h3 className="mt-5 text-xl font-semibold">
            AI Insights Report
          </h3>

          <p className="mt-3 text-slate-500">
            AI-generated patient behavior and wellness
            predictions.
          </p>

          <button className="mt-6 flex items-center gap-2 text-cyan-500 font-medium">
            Open Report
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <TrendingUp className="h-12 w-12 text-emerald-500" />

          <h3 className="mt-5 text-xl font-semibold">
            Outcome Analytics
          </h3>

          <p className="mt-3 text-slate-500">
            Treatment effectiveness and recovery
            statistics.
          </p>

          <button className="mt-6 flex items-center gap-2 text-emerald-500 font-medium">
            Open Report
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* AI Summary */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Brain className="h-6 w-6 text-violet-500" />

          <h2 className="text-xl font-semibold">
            AI Executive Summary
          </h2>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-6 dark:bg-slate-800">
          <p className="leading-relaxed text-slate-600 dark:text-slate-300">
            Over the last 30 days, anxiety-related cases
            increased by 12%. Treatment adherence remains
            strong at 89%, while recovery outcomes improved
            significantly among patients who completed
            wellness tracking and counseling sessions.
          </p>
        </div>
      </section>

      {/* Export */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              Export Reports
            </h2>

            <p className="mt-1 text-slate-500">
              Download analytics and clinical reports.
            </p>
          </div>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-6
              py-3
              font-semibold
              text-white
            "
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </div>
      </section>
    </div>
  );
}