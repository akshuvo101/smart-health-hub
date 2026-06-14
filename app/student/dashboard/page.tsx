import Link from "next/link";

import {
  ArrowUpRight,
  Activity,
  ClipboardList,
  Heart,
  Moon,
  Brain,
  Sparkles,
} from "lucide-react";

import StatCard from "@/components/dashboard/stat-card";
import MoodCard from "@/components/dashboard/mood-card";
import SleepCard from "@/components/dashboard/sleep-card";
import StressCard from "@/components/dashboard/stress-card";
import AppointmentCard from "@/components/dashboard/appointment-card";

import MoodChart from "@/components/charts/mood-chart";
import SleepChart from "@/components/charts/sleep-chart";
import StressChart from "@/components/charts/stress-chart";
import WellnessChart from "@/components/charts/wellness-chart";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
            Welcome Back 👋
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Your Wellness Journey
          </h1>

          <p className="mt-4 max-w-2xl text-white/90">
            Track your mood, sleep, habits, and wellness
            progress while receiving AI-powered insights.
          </p>

          <Link
            href="/student/reports"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-emerald-600 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            View Full Report

            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Mood Entries"
          value="124"
          subtitle="+12 this week"
          icon={Heart}
        />

        <StatCard
          title="Sleep Average"
          value="7.8h"
          subtitle="Healthy Sleep"
          icon={Moon}
          color="from-blue-500 to-cyan-500"
        />

        <StatCard
          title="Habits Completed"
          value="89%"
          subtitle="This Month"
          icon={Activity}
          color="from-purple-500 to-pink-500"
        />

        <StatCard
          title="Assessments"
          value="12"
          subtitle="Completed"
          icon={ClipboardList}
          color="from-orange-500 to-red-500"
        />
      </section>

      {/* Quick Wellness Cards */}

      <section className="grid gap-6 xl:grid-cols-2">
        <MoodCard />

        <SleepCard />

        <StressCard />

        <AppointmentCard />
      </section>

      {/* Charts */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Mood Analytics
          </h2>

          <MoodChart />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Sleep Analytics
          </h2>

          <SleepChart />
        </div>
      </section>

      {/* Advanced Analytics */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Stress Analysis
          </h2>

          <StressChart />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Wellness Score
          </h2>

          <WellnessChart />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
              <Brain className="h-6 w-6 text-cyan-500" />
            </div>

            <div>
              <h2 className="font-semibold">
                AI Wellness Insight
              </h2>

              <p className="text-sm text-slate-500">
                Personalized Recommendation
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="leading-relaxed text-slate-600 dark:text-slate-300">
              Your mood has improved by 14% this week.
              Sleep consistency is strong, but stress
              spikes were detected on Wednesday and
              Thursday. Consider 15–20 minutes of daily
              meditation.
            </p>
          </div>

          <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white transition-all hover:shadow-lg">
            <Sparkles className="h-4 w-4" />
            Generate New Insight
          </button>
        </div>
      </section>

      {/* Bottom Grid */}

      <section className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              Logged Mood 😊
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              Added 7.5 Hours Sleep 🌙
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              Completed Anxiety Assessment 🧠
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              Booked Counseling Session 📅
            </div>
          </div>
        </div>

        {/* Quick Actions */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Quick Actions
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/student/mood"
              className="rounded-2xl bg-emerald-500 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
            >
              Log Mood
            </Link>

            <Link
              href="/student/sleep"
              className="rounded-2xl bg-cyan-500 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
            >
              Add Sleep
            </Link>

            <Link
              href="/student/assessments"
              className="rounded-2xl bg-purple-500 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
            >
              Take Assessment
            </Link>

            <Link
              href="/student/appointments"
              className="rounded-2xl bg-slate-800 p-5 text-center font-semibold text-white transition-all hover:-translate-y-1"
            >
              Book Session
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}