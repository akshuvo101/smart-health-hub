"use client";

import {
  FileText,
  Shield,
  User,
  Settings,
  Calendar,
  Search,
  Download,
  Filter,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const auditLogs = [
  {
    id: 1,
    action: "User Role Updated",
    user: "Admin User",
    target: "doctor@gmail.com",
    status: "success",
    date: "2026-06-05 10:15 AM",
    icon: Shield,
  },
  {
    id: 2,
    action: "System Settings Changed",
    user: "Super Admin",
    target: "Platform Config",
    status: "success",
    date: "2026-06-05 09:42 AM",
    icon: Settings,
  },
  {
    id: 3,
    action: "Failed Login Attempt",
    user: "Unknown User",
    target: "admin@healthhub.com",
    status: "warning",
    date: "2026-06-05 08:20 AM",
    icon: AlertTriangle,
  },
  {
    id: 4,
    action: "New Admin Created",
    user: "Super Admin",
    target: "newadmin@gmail.com",
    status: "success",
    date: "2026-06-04 05:30 PM",
    icon: User,
  },
  {
    id: 5,
    action: "Security Policy Updated",
    user: "Super Admin",
    target: "Authentication Rules",
    status: "success",
    date: "2026-06-04 02:18 PM",
    icon: Shield,
  },
];

export default function AuditLogsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Audit Logs
          </h1>

          <p className="mt-2 text-slate-500">
            Track every important action, security
            event, permission change, and system
            activity across the platform.
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
          <Download className="h-4 w-4" />
          Export Logs
        </button>
      </div>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <FileText className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            24,812
          </h2>

          <p className="text-sm text-slate-500">
            Total Logs
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            24,601
          </h2>

          <p className="text-sm text-slate-500">
            Successful Events
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="h-10 w-10 text-orange-500" />

          <h2 className="mt-4 text-3xl font-bold">
            211
          </h2>

          <p className="text-sm text-slate-500">
            Warning Events
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Calendar className="h-10 w-10 text-purple-500" />

          <h2 className="mt-4 text-3xl font-bold">
            Today
          </h2>

          <p className="text-sm text-slate-500">
            Active Monitoring
          </p>
        </div>
      </section>

      {/* Search & Filter */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search audit logs..."
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
                focus:border-emerald-500
                dark:border-slate-800
                dark:bg-slate-950
              "
            />
          </div>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              border
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

      {/* Audit Timeline */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-xl font-semibold">
          Recent Activity Logs
        </h2>

        <div className="space-y-4">
          {auditLogs.map((log) => {
            const Icon = log.icon;

            return (
              <div
                key={log.id}
                className="
                  flex
                  flex-col
                  gap-4
                  rounded-2xl
                  border
                  p-5
                  transition-all
                  hover:shadow-md
                  dark:border-slate-800
                "
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-slate-100
                        dark:bg-slate-800
                      "
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {log.action}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Performed by {log.user}
                      </p>

                      <p className="text-sm text-slate-500">
                        Target: {log.target}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      log.status === "success"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                    }`}
                  >
                    {log.status}
                  </span>
                </div>

                <div className="border-t pt-3 text-xs text-slate-500 dark:border-slate-800">
                  {log.date}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}