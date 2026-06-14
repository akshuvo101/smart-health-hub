import {
  ShieldCheck,
  Crown,
  UserCog,
  Plus,
  Search,
  MoreHorizontal,
} from "lucide-react";

export default function SuperAdminAdminsPage() {
  const admins = [
    {
      id: 1,
      name: "AK Shuvo",
      email: "admin@smarthealthhub.com",
      role: "Super Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@smarthealthhub.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael@smarthealthhub.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma@smarthealthhub.com",
      role: "Admin",
      status: "Inactive",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
              <ShieldCheck className="h-4 w-4" />
              System Administration
            </span>

            <h1 className="mt-4 text-4xl font-bold">
              Admin Management
            </h1>

            <p className="mt-3 max-w-2xl text-white/90">
              Manage administrators, assign permissions,
              monitor activities, and maintain platform
              governance.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-red-600 transition hover:scale-105">
            <Plus className="h-5 w-5" />
            Add Administrator
          </button>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <Crown className="h-10 w-10 text-yellow-500" />

            <div>
              <p className="text-sm text-slate-500">
                Super Admins
              </p>

              <h3 className="text-3xl font-bold">1</h3>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <ShieldCheck className="h-10 w-10 text-red-500" />

            <div>
              <p className="text-sm text-slate-500">
                Administrators
              </p>

              <h3 className="text-3xl font-bold">12</h3>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <UserCog className="h-10 w-10 text-cyan-500" />

            <div>
              <p className="text-sm text-slate-500">
                Active Today
              </p>

              <h3 className="text-3xl font-bold">8</h3>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm text-slate-500">
              Security Score
            </p>

            <h3 className="text-3xl font-bold text-emerald-500">
              98%
            </h3>
          </div>
        </div>
      </section>

      {/* Search */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search administrators..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              py-3
              pl-12
              pr-4
              outline-none
              focus:border-red-500
              dark:border-slate-800
              dark:bg-slate-950
            "
          />
        </div>
      </section>

      {/* Admin Table */}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-xl font-semibold">
            Platform Administrators
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left dark:border-slate-800">
                <th className="p-5">Admin</th>
                <th className="p-5">Role</th>
                <th className="p-5">Status</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {admins.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b border-slate-100 dark:border-slate-800"
                >
                  <td className="p-5">
                    <div>
                      <p className="font-medium">
                        {admin.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {admin.email}
                      </p>
                    </div>
                  </td>

                  <td className="p-5">
                    <span
                      className={`
                        rounded-full px-3 py-1 text-xs font-medium
                        ${
                          admin.role === "Super Admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }
                      `}
                    >
                      {admin.role}
                    </span>
                  </td>

                  <td className="p-5">
                    <span
                      className={`
                        rounded-full px-3 py-1 text-xs font-medium
                        ${
                          admin.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {admin.status}
                    </span>
                  </td>

                  <td className="p-5">
                    <button className="rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Permission Matrix */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-xl font-semibold">
          Role Permissions
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
            <h3 className="font-semibold text-red-600">
              Super Admin
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>✓ Manage all users</li>
              <li>✓ Create admins</li>
              <li>✓ Delete accounts</li>
              <li>✓ Platform settings</li>
              <li>✓ Security controls</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">
            <h3 className="font-semibold text-blue-600">
              Admin
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>✓ Manage users</li>
              <li>✓ Manage appointments</li>
              <li>✓ View analytics</li>
              <li>✓ Moderate forum</li>
              <li>✗ Create admins</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}