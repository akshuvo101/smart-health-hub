"use client";

export default function PrivacySettings() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">
        Privacy Settings
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span>Anonymous Forum Posting</span>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5 accent-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Show Wellness Statistics</span>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5 accent-emerald-500"
          />
        </div>

        <div className="flex items-center justify-between">
          <span>Allow AI Recommendations</span>

          <input
            type="checkbox"
            defaultChecked
            className="h-5 w-5 accent-emerald-500"
          />
        </div>
      </div>
    </div>
  );
}