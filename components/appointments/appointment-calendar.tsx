export default function AppointmentCalendar() {
  const days = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold">
        Appointment Calendar
      </h2>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-slate-500"
          >
            {day}
          </div>
        ))}

        {Array.from({ length: 35 }).map((_, index) => (
          <div
            key={index}
            className={`flex h-12 items-center justify-center rounded-xl border text-sm transition-all
              ${
                index === 15
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-slate-200 dark:border-slate-700"
              }`}
          >
            {index + 1 <= 31 ? index + 1 : ""}
          </div>
        ))}
      </div>
    </div>
  );
}