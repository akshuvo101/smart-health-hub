export default function ReportTable() {
  const reports = [
    {
      student: "AK Shuvo",
      mood: "8.4",
      sleep: "12.8h",
      habits: "89%",
      score: "79%",
    },
    {
      student: "Basir Uddin",
      mood: "8.9",
      sleep: "8.1h",
      habits: "92%",
      score: "91%",
    },
    {
      student: "Imtiaz Ahmed",
      mood: "7.6",
      sleep: "7.2h",
      habits: "80%",
      score: "82%",
    },
    {
      student: "Jamil Ahmed",
      mood: "7.6",
      sleep: "7.2h",
      habits: "80%",
      score: "82%",
    },
    {
      student: "Asad Sheikh",
      mood: "8.1",
      sleep: "7.5h",
      habits: "85%",
      score: "86%",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h2 className="text-xl font-semibold">
          Latest Wellness Reports
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4 text-left">
                Mood
              </th>

              <th className="px-6 py-4 text-left">
                Sleep
              </th>

              <th className="px-6 py-4 text-left">
                Habits
              </th>

              <th className="px-6 py-4 text-left">
                Wellness
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.student}
                className="border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-6 py-4 font-medium">
                  {report.student}
                </td>

                <td className="px-6 py-4">
                  {report.mood}
                </td>

                <td className="px-6 py-4">
                  {report.sleep}
                </td>

                <td className="px-6 py-4">
                  {report.habits}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-600 dark:bg-emerald-500/10">
                    {report.score}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}