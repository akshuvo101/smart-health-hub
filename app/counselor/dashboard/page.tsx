import Link from "next/link";

import {
  ArrowUpRight,
  Users,
  Calendar,
  Brain,
  Heart,
  Activity,
  AlertTriangle,
  Sparkles,
  ClipboardList,
  Clock3,
} from "lucide-react";

export default function CounselorDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
            Counselor Portal 💜
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Student Wellness Center
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Support students through counseling sessions,
            wellness tracking, assessments, and AI-powered
            mental health insights.
          </p>

          <Link
            href="/counselor/reports"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-violet-600 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Reports

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Users className="h-10 w-10 text-violet-500" />

          <h3 className="mt-4 text-3xl font-bold">
            324
          </h3>

          <p className="text-slate-500">
            Active Students
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Calendar className="h-10 w-10 text-cyan-500" />

          <h3 className="mt-4 text-3xl font-bold">
            18
          </h3>

          <p className="text-slate-500">
            Today's Sessions
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="h-10 w-10 text-fuchsia-500" />

          <h3 className="mt-4 text-3xl font-bold">
            86%
          </h3>

          <p className="text-slate-500">
            Wellness Improvement
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="h-10 w-10 text-orange-500" />

          <h3 className="mt-4 text-3xl font-bold">
            12
          </h3>

          <p className="text-slate-500">
            High-Risk Students
          </p>
        </div>
      </section>

      {/* Analytics */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-pink-500" />

            <h2 className="font-semibold">
              Mood Improvement
            </h2>
          </div>

          <div className="mt-6">
            <p className="text-5xl font-bold text-pink-500">
              +14%
            </p>

            <p className="mt-2 text-slate-500">
              Compared to last month
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-emerald-500" />

            <h2 className="font-semibold">
              Engagement Rate
            </h2>
          </div>

          <div className="mt-6">
            <p className="text-5xl font-bold text-emerald-500">
              91%
            </p>

            <p className="mt-2 text-slate-500">
              Students actively participating
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-cyan-500" />

            <h2 className="font-semibold">
              Assessments Completed
            </h2>
          </div>

          <div className="mt-6">
            <p className="text-5xl font-bold text-cyan-500">
              487
            </p>

            <p className="mt-2 text-slate-500">
              This semester
            </p>
          </div>
        </div>
      </section>

      {/* Sessions + AI */}

      <section className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Sessions */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Clock3 className="h-6 w-6 text-violet-500" />

            <h2 className="text-lg font-semibold">
              Upcoming Sessions
            </h2>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="font-medium">
                Sarah Johnson
              </p>

              <p className="text-sm text-slate-500">
                Today • 2:00 PM
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="font-medium">
                Michael Chen
              </p>

              <p className="text-sm text-slate-500">
                Today • 3:30 PM
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <p className="font-medium">
                Emma Wilson
              </p>

              <p className="text-sm text-slate-500">
                Tomorrow • 10:00 AM
              </p>
            </div>
          </div>
        </div>

        {/* AI Insights */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6 text-fuchsia-500" />

            <h2 className="text-lg font-semibold">
              AI Wellness Insight
            </h2>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Student stress levels increased during
              examination periods. Students who attended
              weekly counseling sessions reported a 23%
              higher emotional wellbeing score.
            </p>
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 py-3 font-semibold text-white transition-all hover:shadow-lg">
            <Sparkles className="h-4 w-4" />
            Generate New Insight
          </button>
        </div>
      </section>

      {/* Quick Actions */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-5 text-lg font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/counselor/students"
            className="rounded-2xl bg-violet-500 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
          >
            Manage Students
          </Link>

          <Link
            href="/counselor/sessions"
            className="rounded-2xl bg-cyan-500 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
          >
            View Sessions
          </Link>

          <Link
            href="/counselor/assessments"
            className="rounded-2xl bg-fuchsia-500 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
          >
            Assessments
          </Link>

          <Link
            href="/counselor/ai-assistant"
            className="rounded-2xl bg-slate-800 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
          >
            AI Assistant
          </Link>
        </div>
      </section>
    </div>
  );
}