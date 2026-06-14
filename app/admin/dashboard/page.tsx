import {
  Users,
  Calendar,
  MessageSquare,
  Activity,
} from "lucide-react";

import AnalyticsCard from "@/components/admin/analytics-card";
import UserTable from "@/components/admin/user-table";
import ReportTable from "@/components/admin/report-table";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-xl">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Monitor students, wellness activities,
          appointments, reports, and overall system
          performance.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <AnalyticsCard
          title="Total Students"
          value="1,245"
          growth="+12%"
          icon={Users}
        />

        <AnalyticsCard
          title="Appointments"
          value="324"
          growth="+8%"
          icon={Calendar}
          color="from-cyan-500 to-blue-500"
        />

        <AnalyticsCard
          title="Forum Posts"
          value="2,876"
          growth="+18%"
          icon={MessageSquare}
          color="from-purple-500 to-pink-500"
        />

        <AnalyticsCard
          title="Assessments"
          value="1,120"
          growth="+15%"
          icon={Activity}
          color="from-orange-500 to-red-500"
        />
      </section>

      {/* Tables */}

      <UserTable />

      <ReportTable />
    </div>
  );
}