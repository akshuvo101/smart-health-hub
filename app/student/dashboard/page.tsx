import Link from "next/link";
import { Brain, Sparkles } from "lucide-react";

import MentalCheckCard from "@/components/dashboard/mental-check-card";
import {
  Heart,
  Moon,
  Flame,
  Smile,
} from "lucide-react";
export default function StudentDashboardPage() {
  const todayStatus = [
    {
      title: "Mood",
      value: "Calm",
      subtitle: "Stable Today",
      icon: Smile,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      title: "Sleep",
      value: "7.8 Hours",
      subtitle: "Excellent",
      icon: Moon,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-500",
    },
    {
      title: "Stress",
      value: "Low",
      subtitle: "Improving",
      icon: Flame,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
    },
    {
      title: "Wellness Streak",
      value: "6 Days",
      subtitle: "Keep Going",
      icon: Heart,
      iconBg: "bg-pink-500/10",
      iconColor: "text-pink-500",
    },
  ];
  return (
    <div className="space-y-10">

      {/* Mental Check */}
      <section>
        <MentalCheckCard />
      </section>

      {/* Today's Status */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Today's Status
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Your wellness snapshot for today.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {todayStatus.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg}`}
                >
                  <Icon className={`h-7 w-7 ${item.iconColor}`} />
                </div>

                <div className="mt-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Wellness Insight */}
      <section>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all dark:border-slate-800 dark:bg-slate-900">
          {/* Header */}
          <div className="border-b border-slate-200 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-cyan-500/5 p-6 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">
                <Brain className="h-7 w-7 text-cyan-500" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  AI Wellness Insight
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Personalized recommendations based on your latest assessment.
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 p-6">
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="leading-8 text-slate-700 dark:text-slate-300">
                Your mental wellness is improving steadily. Sleep consistency
                has remained healthy throughout the week, while moderate stress
                levels were detected during mid-week. Maintaining a regular
                bedtime and practicing 15–20 minutes of mindfulness each day
                can further improve your emotional balance.
              </p>
            </div>

            <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  Last updated
                </p>

                <p className="mt-1 font-medium">
                  Based on your latest assessment
                </p>
              </div>

              <Link
                href="/student/assessments/history"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                <Sparkles className="h-4 w-4" />
                View Full Report
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Quickly access your most-used wellness tools.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Link
              href="/student/mood"
              className="rounded-2xl bg-emerald-500 p-5 text-center font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Log Mood
            </Link>

            <Link
              href="/student/sleep"
              className="rounded-2xl bg-cyan-500 p-5 text-center font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Add Sleep
            </Link>

            <Link
              href="/student/assessments"
              className="rounded-2xl bg-purple-500 p-5 text-center font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Take Assessment
            </Link>

            <Link
              href="/student/appointments"
              className="rounded-2xl bg-slate-900 p-5 text-center font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-slate-700"
            >
              Book Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}