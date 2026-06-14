"use client";

export default function ProfileSettings() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">
        Profile Information
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          defaultValue="AK Shuvo"
          placeholder="Full Name"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <input
          type="email"
          defaultValue="ak@example.com"
          placeholder="Email Address"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <input
          type="text"
          defaultValue="51/8"
          placeholder="Intake / Section"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800"
        />

        <button className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg">
          Save Changes
        </button>
      </div>
    </div>
  );
}