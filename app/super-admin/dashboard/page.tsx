import Link from "next/link";
import {
  ShieldCheck,
  Users,
  UserCog,
  Stethoscope,
  HeartHandshake,
  Activity,
  Database,
  Brain,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  Server,
} from "lucide-react";

export default function SuperAdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 p-8 text-white shadow-2xl">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
            Platform Control Center
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Super Admin Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-slate-300">
            Monitor platform activity, manage users,
            oversee healthcare professionals, track AI
            usage, and maintain system health from a
            centralized control panel.
          </p>
        </div>
      </section>

      {/* Statistics */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Users className="mb-4 h-10 w-10 text-blue-500" />

          <h3 className="text-3xl font-bold">12,458</h3>

          <p className="text-slate-500">
            Total Platform Users
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Stethoscope className="mb-4 h-10 w-10 text-emerald-500" />

          <h3 className="text-3xl font-bold">247</h3>

          <p className="text-slate-500">
            Active Doctors
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <HeartHandshake className="mb-4 h-10 w-10 text-pink-500" />

          <h3 className="text-3xl font-bold">185</h3>

          <p className="text-slate-500">
            Active Counselors
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Activity className="mb-4 h-10 w-10 text-orange-500" />

          <h3 className="text-3xl font-bold">99.9%</h3>

          <p className="text-slate-500">
            System Uptime
          </p>
        </div>
      </section>

      {/* Quick Access */}

      <section>
        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-indigo-500" />

          <h2 className="text-2xl font-bold">
            Quick Access
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/super-admin/users"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <Users className="mb-4 h-10 w-10 text-blue-500" />

            <h3 className="font-semibold">
              Manage Users
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              View, edit, suspend and manage all users.
            </p>

            <ArrowUpRight className="mt-4 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <Link
            href="/super-admin/admins"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <UserCog className="mb-4 h-10 w-10 text-violet-500" />

            <h3 className="font-semibold">
              Manage Admins
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create and control administrator accounts.
            </p>

            <ArrowUpRight className="mt-4 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <Link
            href="/super-admin/doctors"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <Stethoscope className="mb-4 h-10 w-10 text-emerald-500" />

            <h3 className="font-semibold">
              Doctors
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Verify and manage healthcare providers.
            </p>

            <ArrowUpRight className="mt-4 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>

          <Link
            href="/super-admin/counselors"
            className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <HeartHandshake className="mb-4 h-10 w-10 text-pink-500" />

            <h3 className="font-semibold">
              Counselors
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Oversee counselor activity and approvals.
            </p>

            <ArrowUpRight className="mt-4 h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      {/* Platform Analytics */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <TrendingUp className="mb-4 h-10 w-10 text-green-500" />

          <h2 className="text-lg font-semibold">
            Growth Overview
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            User registrations increased by 18% this month
            compared to the previous month.
          </p>

          <div className="mt-5 rounded-2xl bg-green-50 p-4 text-green-700 dark:bg-green-950/20">
            +18% Monthly Growth
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="mb-4 h-10 w-10 text-purple-500" />

          <h2 className="text-lg font-semibold">
            AI Usage
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            AI wellness assistant processed over 32,000
            requests this month.
          </p>

          <div className="mt-5 rounded-2xl bg-purple-50 p-4 text-purple-700 dark:bg-purple-950/20">
            32,417 Requests
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="mb-4 h-10 w-10 text-red-500" />

          <h2 className="text-lg font-semibold">
            Security Alerts
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Monitor suspicious activities and platform
            security events.
          </p>

          <div className="mt-5 rounded-2xl bg-red-50 p-4 text-red-700 dark:bg-red-950/20">
            3 Pending Reviews
          </div>
        </div>
      </section>

      {/* System Health */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Server className="h-6 w-6 text-cyan-500" />

          <h2 className="text-2xl font-bold">
            System Health
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-950/20">
            <Database className="mb-3 h-8 w-8 text-emerald-500" />

            <h3 className="font-semibold">
              Database
            </h3>

            <p className="mt-2 text-emerald-600">
              Operational
            </p>
          </div>

          <div className="rounded-2xl bg-blue-50 p-5 dark:bg-blue-950/20">
            <ShieldCheck className="mb-3 h-8 w-8 text-blue-500" />

            <h3 className="font-semibold">
              Authentication
            </h3>

            <p className="mt-2 text-blue-600">
              Healthy
            </p>
          </div>

          <div className="rounded-2xl bg-purple-50 p-5 dark:bg-purple-950/20">
            <Brain className="mb-3 h-8 w-8 text-purple-500" />

            <h3 className="font-semibold">
              AI Services
            </h3>

            <p className="mt-2 text-purple-600">
              Running
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-5 dark:bg-orange-950/20">
            <Activity className="mb-3 h-8 w-8 text-orange-500" />

            <h3 className="font-semibold">
              API Services
            </h3>

            <p className="mt-2 text-orange-600">
              Stable
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}