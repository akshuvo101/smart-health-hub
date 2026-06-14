import ReportTable from "@/components/admin/report-table";

export default function AdminReportsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Wellness Reports
        </h1>

        <p className="mt-3 text-white/90">
          Monitor student wellness reports and analytics.
        </p>
      </section>

      <ReportTable />
    </div>
  );
}