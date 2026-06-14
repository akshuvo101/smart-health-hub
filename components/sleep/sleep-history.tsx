const sleepLogs = [
  {
    day: "Monday",
    hours: "7.5h",
    quality: "Good",
  },
  {
    day: "Tuesday",
    hours: "8.1h",
    quality: "Excellent",
  },
  {
    day: "Wednesday",
    hours: "6.9h",
    quality: "Average",
  },
  {
    day: "Thursday",
    hours: "8.0h",
    quality: "Excellent",
  },
  {
    day: "Friday",
    hours: "7.7h",
    quality: "Good",
  },
];

export default function SleepHistory() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">
        Sleep History
      </h2>

      <div className="space-y-4">
        {sleepLogs.map((log) => (
          <div
            key={log.day}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800"
          >
            <div>
              <h3 className="font-medium">
                {log.day}
              </h3>

              <p className="text-sm text-slate-500">
                Sleep Quality: {log.quality}
              </p>
            </div>

            <div className="font-semibold text-blue-600">
              {log.hours}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}