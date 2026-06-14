"use client";

import {
  Shield,
  Lock,
  KeyRound,
  AlertTriangle,
  CheckCircle2,
  Eye,
  UserCheck,
  Fingerprint,
  Activity,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">
          Security Center
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor platform security, authentication,
          access control, and threat detection.
        </p>
      </div>

      {/* Security Overview */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Shield className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            99.9%
          </h2>

          <p className="text-sm text-slate-500">
            Security Score
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Lock className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            2,481
          </h2>

          <p className="text-sm text-slate-500">
            Secure Logins
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <KeyRound className="h-10 w-10 text-purple-500" />

          <h2 className="mt-4 text-3xl font-bold">
            142
          </h2>

          <p className="text-sm text-slate-500">
            Active Sessions
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="h-10 w-10 text-orange-500" />

          <h2 className="mt-4 text-3xl font-bold">
            3
          </h2>

          <p className="text-sm text-slate-500">
            Security Alerts
          </p>
        </div>
      </section>

      {/* Security Status */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-lg font-semibold">
            Security Checks
          </h2>

          <div className="space-y-4">
            {[
              "Database Encryption",
              "Google OAuth Authentication",
              "Row Level Security",
              "Role Based Access",
              "API Protection",
              "Session Management",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border p-4 dark:border-slate-800"
              >
                <span>{item}</span>

                <span className="flex items-center gap-2 text-emerald-500">
                  <CheckCircle2 className="h-4 w-4" />
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-lg font-semibold">
            Authentication Statistics
          </h2>

          <div className="space-y-5">
            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <Fingerprint className="h-5 w-5 text-cyan-500" />

                <span>OAuth Logins</span>
              </div>

              <h3 className="mt-3 text-2xl font-bold">
                94%
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <UserCheck className="h-5 w-5 text-emerald-500" />

                <span>Verified Accounts</span>
              </div>

              <h3 className="mt-3 text-2xl font-bold">
                98%
              </h3>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-purple-500" />

                <span>Suspicious Attempts</span>
              </div>

              <h3 className="mt-3 text-2xl font-bold">
                12
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Detection */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-red-500" />

          <h2 className="text-lg font-semibold">
            Threat Monitoring
          </h2>
        </div>

        <div className="mt-6 space-y-4">
          {[
            "Failed login attempts detected from multiple IPs.",
            "Role escalation protection active.",
            "Supabase RLS policies verified successfully.",
            "Session hijacking protection enabled.",
            "API rate limiting active.",
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
            >
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}