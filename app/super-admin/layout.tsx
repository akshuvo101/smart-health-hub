import SuperAdminHeader from "@/components/super-admin/header";
import SuperAdminSidebar from "@/components/super-admin/sidebar";
import { requireRole } from "@/lib/auth/require-role";

export default async function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await requireRole(["super_admin"]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <SuperAdminSidebar />

      <div className="lg:pl-72">
        <SuperAdminHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
