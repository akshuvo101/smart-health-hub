import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { requireRole } from "@/lib/auth/require-role";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await requireRole(["student"]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />

      <div className="lg:pl-72">
        <Header />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
