import {
  Search,
  Filter,
  Users,
  Eye,
  FileText,
  Calendar,
  Activity,
  Plus,
} from "lucide-react";

const patients = [
  {
    id: "PT-1001",
    name: "John Smith",
    age: 22,
    gender: "Male",
    status: "Stable",
    risk: "Low",
    lastVisit: "2 Days Ago",
  },
  {
    id: "PT-1002",
    name: "Emma Wilson",
    age: 20,
    gender: "Female",
    status: "Monitoring",
    risk: "Medium",
    lastVisit: "Today",
  },
  {
    id: "PT-1003",
    name: "David Lee",
    age: 24,
    gender: "Male",
    status: "Critical",
    risk: "High",
    lastVisit: "Today",
  },
  {
    id: "PT-1004",
    name: "Sarah Johnson",
    age: 21,
    gender: "Female",
    status: "Stable",
    risk: "Low",
    lastVisit: "1 Week Ago",
  },
  {
    id: "PT-1005",
    name: "Michael Brown",
    age: 23,
    gender: "Male",
    status: "Monitoring",
    risk: "Medium",
    lastVisit: "Yesterday",
  },
];

export default function DoctorPatientsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
              Patient Management
            </span>

            <h1 className="mt-4 text-4xl font-bold">
              Patients Directory
            </h1>

            <p className="mt-3 max-w-2xl text-white/90">
              Manage patients, track wellness
              progress, review assessments and
              monitor overall health status.
            </p>
          </div>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-white
              px-5
              py-3
              font-semibold
              text-cyan-600
              transition-all
              hover:-translate-y-1
            "
          >
            <Plus className="h-5 w-5" />
            Add Patient
          </button>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Users className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            248
          </h2>

          <p className="text-slate-500">
            Total Patients
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Activity className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            182
          </h2>

          <p className="text-slate-500">
            Stable Patients
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Calendar className="h-10 w-10 text-purple-500" />

          <h2 className="mt-4 text-3xl font-bold">
            34
          </h2>

          <p className="text-slate-500">
            Appointments Today
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <FileText className="h-10 w-10 text-orange-500" />

          <h2 className="mt-4 text-3xl font-bold">
            89
          </h2>

          <p className="text-slate-500">
            New Assessments
          </p>
        </div>
      </section>

      {/* Search */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search patient..."
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                py-3
                pl-11
                pr-4
                outline-none
                focus:border-cyan-500
                dark:border-slate-800
                dark:bg-slate-800
              "
            />
          </div>

          <button
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-slate-200
              px-5
              py-3
              dark:border-slate-800
            "
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </section>

      {/* Table */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                <th className="px-6 py-4 text-left">
                  Patient
                </th>

                <th className="px-6 py-4 text-left">
                  Age
                </th>

                <th className="px-6 py-4 text-left">
                  Gender
                </th>

                <th className="px-6 py-4 text-left">
                  Status
                </th>

                <th className="px-6 py-4 text-left">
                  Risk
                </th>

                <th className="px-6 py-4 text-left">
                  Last Visit
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="
                    border-b
                    border-slate-100
                    transition-all
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "
                >
                  <td className="px-6 py-5">
                    <div>
                      <h3 className="font-medium">
                        {patient.name}
                      </h3>

                      <p className="text-sm text-slate-500">
                        {patient.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    {patient.age}
                  </td>

                  <td className="px-6 py-5">
                    {patient.gender}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          patient.status === "Stable"
                            ? "bg-emerald-100 text-emerald-700"
                            : patient.status ===
                                "Monitoring"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {patient.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-medium
                        ${
                          patient.risk === "Low"
                            ? "bg-cyan-100 text-cyan-700"
                            : patient.risk ===
                                "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {patient.risk}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    {patient.lastVisit}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button
                        className="
                          rounded-xl
                          bg-cyan-500
                          p-2.5
                          text-white
                          transition-all
                          hover:scale-105
                        "
                      >
                        <Eye className="h-4 w-4" />
                      </button>

                      <button
                        className="
                          rounded-xl
                          bg-emerald-500
                          p-2.5
                          text-white
                          transition-all
                          hover:scale-105
                        "
                      >
                        <FileText className="h-4 w-4" />
                      </button>

                      <button
                        className="
                          rounded-xl
                          bg-purple-500
                          p-2.5
                          text-white
                          transition-all
                          hover:scale-105
                        "
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}