"use client";

import {
  Database,
  Server,
  HardDrive,
  Activity,
  Cpu,
  Globe,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function SystemPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            System Monitoring
          </h1>

          <p className="mt-1 text-slate-500">
            Monitor infrastructure, database health,
            API performance, and system resources.
          </p>
        </div>

        <button
          className="
            inline-flex
            items-center
            gap-2
            rounded-2xl
            bg-emerald-600
            px-5
            py-3
            font-medium
            text-white
            transition-all
            hover:shadow-lg
          "
        >
          <RefreshCw className="h-4 w-4" />
          Refresh Status
        </button>
      </div>

      {/* Status Cards */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Database className="h-10 w-10 text-emerald-500" />

            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Database Status
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Online
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Server className="h-10 w-10 text-cyan-500" />

            <CheckCircle2 className="h-5 w-5 text-cyan-500" />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            API Status
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Healthy
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <HardDrive className="h-10 w-10 text-orange-500" />

            <AlertTriangle className="h-5 w-5 text-orange-500" />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Storage Usage
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            68%
          </h2>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <Activity className="h-10 w-10 text-purple-500" />

            <CheckCircle2 className="h-5 w-5 text-purple-500" />
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Uptime
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            99.98%
          </h2>
        </div>
      </section>

      {/* Resource Usage */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Cpu className="h-6 w-6 text-indigo-500" />

            <h2 className="text-lg font-semibold">
              Resource Usage
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>CPU Usage</span>
                <span>42%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-3 w-[42%] rounded-full bg-indigo-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Memory Usage</span>
                <span>58%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-3 w-[58%] rounded-full bg-cyan-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between text-sm">
                <span>Disk Usage</span>
                <span>68%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-3 w-[68%] rounded-full bg-orange-500" />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Globe className="h-6 w-6 text-emerald-500" />

            <h2 className="text-lg font-semibold">
              Network Statistics
            </h2>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="text-sm text-slate-500">
                Requests Today
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                18,245
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="text-sm text-slate-500">
                Active Sessions
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                1,287
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="text-sm text-slate-500">
                Avg Response
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                126ms
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
              <p className="text-sm text-slate-500">
                Error Rate
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                0.03%
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Service Health */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-lg font-semibold">
          Service Health
        </h2>

        <div className="space-y-4">
          {[
            "Supabase Database",
            "Authentication Service",
            "AI Assistant API",
            "Email Notifications",
            "Appointment Scheduler",
            "Analytics Engine",
          ].map((service) => (
            <div
              key={service}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                p-4
                dark:border-slate-800
              "
            >
              <span className="font-medium">
                {service}
              </span>

              <span className="flex items-center gap-2 text-emerald-500">
                <CheckCircle2 className="h-4 w-4" />
                Operational
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Events */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-lg font-semibold">
          Recent System Events
        </h2>

        <div className="space-y-4">
          {[
            "Database backup completed successfully",
            "New deployment pushed to production",
            "OAuth configuration updated",
            "Analytics cache refreshed",
            "System health check completed",
          ].map((event, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                bg-slate-50
                p-4
                dark:bg-slate-800
              "
            >
              {event}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}