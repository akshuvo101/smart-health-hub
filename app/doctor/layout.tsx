import DoctorHeader from "@/components/doctor/header";
import DoctorSidebar from "@/components/doctor/sidebar";
import { requireRole } from "@/lib/auth/require-role";

export default async function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await requireRole(["doctor"]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DoctorSidebar />

      <div className="lg:pl-72">
        <DoctorHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
