import {
  ClipboardList,
  Brain,
  AlertTriangle,
  Search,
  Eye,
  CheckCircle2,
  Clock3,
} from "lucide-react";

const assessments = [
  {
    id: "ASM-1001",
    patient: "Emma Wilson",
    assessment: "Anxiety Assessment",
    score: 78,
    risk: "High",
    date: "03 Jun 2026",
  },
  {
    id: "ASM-1002",
    patient: "John Smith",
    assessment: "Depression Assessment",
    score: 42,
    risk: "Medium",
    date: "02 Jun 2026",
  },
  {
    id: "ASM-1003",
    patient: "Sarah Johnson",
    assessment: "Stress Assessment",
    score: 24,
    risk: "Low",
    date: "01 Jun 2026",
  },
  {
    id: "ASM-1004",
    patient: "David Lee",
    assessment: "Sleep Disorder Assessment",
    score: 67,
    risk: "High",
    date: "31 May 2026",
  },
];

export default function DoctorAssessmentsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-600 p-8 text-white shadow-2xl">
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
          Patient Assessment Center
        </span>

        <h1 className="mt-5 text-4xl font-bold">
          Mental Health Assessments
        </h1>

        <p className="mt-4 max-w-3xl text-white/90">
          Review assessment results, identify high-risk
          patients, and generate AI-powered clinical insights.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <ClipboardList className="h-10 w-10 text-violet-500" />

          <h2 className="mt-4 text-3xl font-bold">
            842
          </h2>

          <p className="text-slate-500">
            Total Assessments
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="h-10 w-10 text-red-500" />

          <h2 className="mt-4 text-3xl font-bold">
            37
          </h2>

          <p className="text-slate-500">
            High Risk Cases
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            96%
          </h2>

          <p className="text-slate-500">
            AI Analysis Coverage
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            518
          </h2>

          <p className="text-slate-500">
            Reviewed Results
          </p>
        </div>
      </section>

      {/* Search */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search assessments..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-11
              pr-4
              outline-none
              focus:border-violet-500
              dark:border-slate-800
              dark:bg-slate-800
            "
          />
        </div>
      </section>

      {/* Assessment Table */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                <th className="px-6 py-4 text-left">
                  Patient
                </th>

                <th className="px-6 py-4 text-left">
                  Assessment
                </th>

                <th className="px-6 py-4 text-left">
                  Score
                </th>

                <th className="px-6 py-4 text-left">
                  Risk Level
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {assessments.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    border-slate-100
                    dark:border-slate-800
                  "
                >
                  <td className="px-6 py-5">
                    {item.patient}
                  </td>

                  <td className="px-6 py-5">
                    {item.assessment}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {item.score}/100
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.risk === "High"
                          ? "bg-red-100 text-red-600"
                          : item.risk === "Medium"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {item.risk}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {item.date}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center">
                      <button className="rounded-xl bg-violet-500 p-2 text-white">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AI Insight */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-3">
          <Brain className="h-6 w-6 text-violet-500" />

          <h2 className="text-xl font-semibold">
            AI Clinical Insight
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
          <p className="leading-relaxed">
            Recent assessment data indicates an increase
            in anxiety-related symptoms among students
            during examination periods. Consider proactive
            counseling and stress-management interventions.
          </p>
        </div>
      </section>

      {/* Recent Reviews */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-3">
          <Clock3 className="h-6 w-6 text-cyan-500" />

          <h2 className="text-xl font-semibold">
            Recently Reviewed
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Anxiety assessment reviewed for Emma Wilson
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Depression assessment reviewed for John Smith
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Sleep disorder assessment reviewed for David Lee
          </div>
        </div>
      </section>
    </div>
  );
}