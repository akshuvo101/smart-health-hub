"use client";

import { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  Database,
  Mail,
  Globe,
  Save,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

export default function SuperAdminSettingsPage() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Platform Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Configure system-wide settings,
            security policies, notifications,
            integrations, and platform preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
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
            disabled:opacity-70
          "
        >
          {saving ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Settings Overview */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Shield className="h-10 w-10 text-emerald-500" />

          <h3 className="mt-4 font-semibold">
            Security
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Authentication & access control.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Bell className="h-10 w-10 text-cyan-500" />

          <h3 className="mt-4 font-semibold">
            Notifications
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Email & platform alerts.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Database className="h-10 w-10 text-purple-500" />

          <h3 className="mt-4 font-semibold">
            Database
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Backup & storage management.
          </p>
        </div>

        <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Globe className="h-10 w-10 text-orange-500" />

          <h3 className="mt-4 font-semibold">
            Platform
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Global application settings.
          </p>
        </div>
      </section>

      {/* Security Settings */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Shield className="h-5 w-5 text-emerald-500" />

          <h2 className="text-xl font-semibold">
            Security Settings
          </h2>
        </div>

        <div className="space-y-5">
          <label className="flex items-center justify-between">
            <span>Enable Google OAuth</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Require Email Verification</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Enable Role Protection</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Allow Public Registration</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>
        </div>
      </section>

      {/* Notifications */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Bell className="h-5 w-5 text-cyan-500" />

          <h2 className="text-xl font-semibold">
            Notification Settings
          </h2>
        </div>

        <div className="space-y-5">
          <label className="flex items-center justify-between">
            <span>Admin Email Alerts</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between">
            <span>Security Notifications</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>

          <label className="flex items-center justify-between">
            <span>System Health Reports</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5"
            />
          </label>
        </div>
      </section>

      {/* Email Configuration */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Mail className="h-5 w-5 text-purple-500" />

          <h2 className="text-xl font-semibold">
            Email Configuration
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Support Email
            </label>

            <input
              type="email"
              defaultValue="support@smarthealthhub.com"
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                focus:border-emerald-500
                dark:border-slate-700
                dark:bg-slate-950
              "
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Notification Email
            </label>

            <input
              type="email"
              defaultValue="admin@smarthealthhub.com"
              className="
                w-full
                rounded-2xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                outline-none
                focus:border-emerald-500
                dark:border-slate-700
                dark:bg-slate-950
              "
            />
          </div>
        </div>
      </section>

      {/* Platform Info */}

      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Settings className="h-5 w-5 text-orange-500" />

          <h2 className="text-xl font-semibold">
            Platform Information
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">
              Application Version
            </p>

            <h3 className="mt-2 font-semibold">
              Smart HealthHub v1.0.0
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">
              Last Deployment
            </p>

            <h3 className="mt-2 font-semibold">
              June 2026
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">
              Database Status
            </p>

            <h3 className="mt-2 flex items-center gap-2 font-semibold text-emerald-500">
              <CheckCircle2 className="h-4 w-4" />
              Healthy
            </h3>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="text-sm text-slate-500">
              Environment
            </p>

            <h3 className="mt-2 font-semibold">
              Production
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}