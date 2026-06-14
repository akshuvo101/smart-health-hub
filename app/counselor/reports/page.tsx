import {
  FileBarChart,
  TrendingUp,
  Brain,
  Download,
  CalendarDays,
  Users,
  Activity,
  ArrowUpRight,
} from "lucide-react";

export default function CounselorReportsPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
            Counseling Analytics
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Reports & Insights
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Analyze counseling outcomes, student engagement,
            wellness trends, and mental health progress
            through detailed reports.
          </p>

          <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-purple-600 transition-all hover:-translate-y-1 hover:shadow-xl">
            Export Report

            <Download className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Users className="mb-4 h-10 w-10 text-violet-500" />

          <h3 className="text-3xl font-bold">428</h3>

          <p className="text-slate-500">
            Students Supported
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CalendarDays className="mb-4 h-10 w-10 text-cyan-500" />

          <h3 className="text-3xl font-bold">1,284</h3>

          <p className="text-slate-500">
            Sessions Completed
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <TrendingUp className="mb-4 h-10 w-10 text-emerald-500" />

          <h3 className="text-3xl font-bold">91%</h3>

          <p className="text-slate-500">
            Improvement Rate
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Activity className="mb-4 h-10 w-10 text-orange-500" />

          <h3 className="text-3xl font-bold">87%</h3>

          <p className="text-slate-500">
            Engagement Score
          </p>
        </div>
      </section>

      {/* Main Reports */}

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <FileBarChart className="mb-5 h-12 w-12 text-violet-500" />

          <h2 className="text-lg font-semibold">
            Counseling Outcomes
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Review counseling effectiveness, student
            progress, and successful intervention outcomes.
          </p>

          <button className="mt-6 flex items-center gap-2 font-medium text-violet-600">
            View Report
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <Brain className="mb-5 h-12 w-12 text-pink-500" />

          <h2 className="text-lg font-semibold">
            Mental Health Trends
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Discover patterns in anxiety, stress, burnout,
            and overall emotional wellbeing.
          </p>

          <button className="mt-6 flex items-center gap-2 font-medium text-pink-600">
            View Report
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
          <TrendingUp className="mb-5 h-12 w-12 text-emerald-500" />

          <h2 className="text-lg font-semibold">
            Wellness Improvement
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Measure progress across student wellness
            programs and counseling initiatives.
          </p>

          <button className="mt-6 flex items-center gap-2 font-medium text-emerald-600">
            View Report
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* Monthly Summary */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-semibold">
            Monthly Counseling Summary
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              📈 Student participation increased by 14%
              compared to last month.
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              🎯 91% of students reported positive
              counseling outcomes.
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              💬 Session attendance reached an all-time
              high.
            </div>

            <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
              🧠 Anxiety-related concerns decreased by
              11%.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-semibold">
            AI Wellness Insights
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              Students participating in wellness programs
              show significantly lower stress levels.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              Academic pressure remains the leading cause
              of counseling requests.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              Early intervention improved student recovery
              rates by 23%.
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              AI predicts continued improvement in student
              wellbeing over the next semester.
            </div>
          </div>

          <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 py-3 font-semibold text-white transition-all hover:shadow-lg">
            Generate New AI Report
          </button>
        </div>
      </section>

      {/* Recent Reports */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-xl font-semibold">
          Recent Generated Reports
        </h2>

        <div className="space-y-4">
          {[
            "Monthly Counseling Performance Report",
            "Student Wellness Analytics Report",
            "Mental Health Trend Analysis",
            "Appointment Effectiveness Report",
            "AI Wellness Prediction Report",
          ].map((report) => (
            <div
              key={report}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                p-4
                transition
                hover:border-violet-300
                dark:border-slate-800
              "
            >
              <div className="flex items-center gap-3">
                <FileBarChart className="h-5 w-5 text-violet-500" />

                <span>{report}</span>
              </div>

              <button className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white">
                Download
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}