"use client";

export default function NotificationSettings() {
  const settings = [
    "Daily Wellness Reminder",
    "Appointment Notifications",
    "Assessment Reminders",
    "Forum Activity Updates",
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">
        Notifications
      </h2>

      <div className="space-y-5">
        {settings.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between"
          >
            <span>{item}</span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-emerald-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}