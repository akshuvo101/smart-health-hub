import { Download } from "lucide-react";

export default function ExportReport() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">
        Export Report
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Download your wellness report.
      </p>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-lg">
        <Download className="h-5 w-5" />

        Download PDF
      </button>
    </div>
  );
}