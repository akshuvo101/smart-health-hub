export default function UserTable() {
  const users = [
    {
      name: "AK Shuvo",
      email: "shuvo@example.com",
      role: "Student",
      status: "Active",
    },
    {
      name: "Basir Uddin",
      email: "basir@example.com",
      role: "Student",
      status: "Active",
    },
    {
      name: "Imtiaz Ahmed",
      email: "imtiaz@example.com",
      role: "Student",
      status: "Inactive",
    },
    {
      name: "Jamil Ahmed",
      email: "jamil@example.com",
      role: "Student",
      status: "Inactive",
    },
    {
      name: "Asad Sheikh",
      email: "asad@example.com",
      role: "Student",
      status: "Inactive",
    },
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 p-6 dark:border-slate-800">
        <h2 className="text-xl font-semibold">
          Recent Users
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4 text-left text-sm font-semibold">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.email}
                className="border-b border-slate-100 dark:border-slate-800"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">
                      {user.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {user.role}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      user.status === "Active"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10"
                        : "bg-red-100 text-red-600 dark:bg-red-500/10"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}