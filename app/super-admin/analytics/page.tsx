"use client";

import {
  Users,
  UserCheck,
  CalendarDays,
  Brain,
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  Sparkles,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Platform Analytics
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor growth, engagement, AI usage,
            appointments, and overall platform
            performance.
          </p>
        </div>

        <button
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-emerald-500
            to-cyan-500
            px-5
            py-3
            font-semibold
            text-white
            shadow-lg
            transition-all
            hover:shadow-xl
          "
        >
          <Sparkles className="h-4 w-4" />
          Generate AI Report
        </button>
      </div>

      {/* KPI Cards */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Users className="h-10 w-10 text-emerald-500" />

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
              <TrendingUp className="h-4 w-4" />
              +18%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Total Users
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            12,458
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <UserCheck className="h-10 w-10 text-cyan-500" />

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
              <TrendingUp className="h-4 w-4" />
              +11%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Active Users
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            8,762
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <CalendarDays className="h-10 w-10 text-purple-500" />

            <span className="flex items-center gap-1 text-sm font-medium text-emerald-500">
              <TrendingUp className="h-4 w-4" />
              +22%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Appointments
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            4,381
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Brain className="h-10 w-10 text-orange-500" />

            <span className="flex items-center gap-1 text-sm font-medium text-red-500">
              <TrendingDown className="h-4 w-4" />
              -2%
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            AI Response Time
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            0.9s
          </h2>
        </div>
      </section>

      {/* Growth Analytics */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-emerald-500" />

            <h2 className="text-lg font-semibold">
              Monthly User Growth
            </h2>
          </div>

          <div className="space-y-5">
            {[
              {
                month: "January",
                value: 45,
              },
              {
                month: "February",
                value: 58,
              },
              {
                month: "March",
                value: 72,
              },
              {
                month: "April",
                value: 81,
              },
              {
                month: "May",
                value: 92,
              },
            ].map((item) => (
              <div key={item.month}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{item.month}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <PieChart className="h-6 w-6 text-purple-500" />

            <h2 className="text-lg font-semibold">
              User Distribution
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                role: "Students",
                percent: "71%",
              },
              {
                role: "Counselors",
                percent: "12%",
              },
              {
                role: "Doctors",
                percent: "9%",
              },
              {
                role: "Admins",
                percent: "5%",
              },
              {
                role: "Super Admins",
                percent: "3%",
              },
            ].map((item) => (
              <div
                key={item.role}
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-slate-50
                  p-4
                  dark:bg-slate-800
                "
              >
                <span>{item.role}</span>

                <span className="font-semibold">
                  {item.percent}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Metrics */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Activity className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-5 text-lg font-semibold">
            Daily Engagement
          </h2>

          <p className="mt-2 text-4xl font-bold">
            87%
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Users actively interacting with
            assessments, appointments, and AI tools.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-5 text-lg font-semibold">
            AI Conversations
          </h2>

          <p className="mt-2 text-4xl font-bold">
            28,472
          </p>

          <p className="mt-3 text-sm text-slate-500">
            AI wellness assistant conversations this
            month.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CalendarDays className="h-10 w-10 text-purple-500" />

          <h2 className="mt-5 text-lg font-semibold">
            Sessions Completed
          </h2>

          <p className="mt-2 text-4xl font-bold">
            5,214
          </p>

          <p className="mt-3 text-sm text-slate-500">
            Counseling and doctor sessions completed.
          </p>
        </div>
      </section>

      {/* Top Insights */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-lg font-semibold">
          AI Generated Insights
        </h2>

        <div className="space-y-4">
          {[
            "Student registrations increased by 18% this month.",
            "AI Assistant usage grew 27% compared to last month.",
            "Appointment completion rate reached 94%.",
            "Mental wellness assessments increased significantly during exam season.",
            "Doctor engagement improved after introducing AI recommendations.",
          ].map((insight, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                bg-slate-50
                p-4
                dark:bg-slate-800
              "
            >
              {insight}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}