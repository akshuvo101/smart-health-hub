import WellnessScore from "@/components/reports/wellness-score";
import ReportSummary from "@/components/reports/report-summary";
import AIReportCard from "@/components/reports/ai-report-card";
import ExportReport from "@/components/reports/export-report";

import MoodChart from "@/components/charts/mood-chart";
import SleepChart from "@/components/charts/sleep-chart";
import StressChart from "@/components/charts/stress-chart";
import WellnessChart from "@/components/charts/wellness-chart";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Wellness Reports
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Analyze your mood, sleep, habits, assessments,
          and overall wellness progress through detailed
          reports and AI-powered insights.
        </p>
      </section>

      {/* Top Cards */}

      <section className="grid gap-6 xl:grid-cols-3">
        <WellnessScore />

        <div className="xl:col-span-2">
          <ReportSummary />
        </div>
      </section>

      {/* Charts */}

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Mood Trend
          </h2>

          <MoodChart />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Sleep Analytics
          </h2>

          <SleepChart />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Stress Analysis
          </h2>

          <StressChart />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-lg font-semibold">
            Wellness Progress
          </h2>

          <WellnessChart />
        </div>
      </section>

      {/* AI + Export */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AIReportCard />
        </div>

        <ExportReport />
      </section>
    </div>
  );
}