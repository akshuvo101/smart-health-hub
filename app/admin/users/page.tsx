import UserTable from "@/components/admin/user-table";

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 to-cyan-500 p-8 text-white">
        <h1 className="text-4xl font-bold">
          User Management
        </h1>

        <p className="mt-3 text-white/90">
          Manage all registered students and users.
        </p>
      </section>

      <UserTable />
    </div>
  );
}