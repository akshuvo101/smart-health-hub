export default function ReportSummary() {
  const items = [
    {
      title: "Average Mood",
      value: "8.4/10",
    },
    {
      title: "Average Sleep",
      value: "7.8h",
    },
    {
      title: "Habit Completion",
      value: "89%",
    },
    {
      title: "Stress Score",
      value: "24%",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-lg font-semibold">
        Monthly Summary
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800"
          >
            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h3 className="mt-2 text-2xl font-bold">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}