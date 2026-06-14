import CounselorHeader from "@/components/counselor/header";
import CounselorSidebar from "@/components/counselor/sidebar";
import { requireRole } from "@/lib/auth/require-role";

export default async function CounselorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await requireRole(["counselor"]);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <CounselorSidebar />

      <div className="lg:pl-72">
        <CounselorHeader />

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
