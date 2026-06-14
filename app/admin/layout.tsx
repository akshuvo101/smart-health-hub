import AdminSidebar from "@/components/admin/sidebar";
import AdminHeader from "@/components/admin/header";
import { requireRole } from "@/lib/auth/require-role";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await requireRole(["admin", "super_admin"]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminSidebar />

      <div className="lg:pl-72">
        <AdminHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
