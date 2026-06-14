"use client";

export default function AccountSettings() {
  return (
    <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold text-red-500">
        Account Security
      </h2>

      <div className="space-y-4">
        <button className="w-full rounded-2xl border border-slate-200 py-3 font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Change Password
        </button>

        <button className="w-full rounded-2xl border border-slate-200 py-3 font-medium transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
          Enable Two-Factor Authentication
        </button>

        <button className="w-full rounded-2xl bg-red-500 py-3 font-semibold text-white transition hover:bg-red-600">
          Delete Account
        </button>
      </div>
    </div>
  );
}