import {
  FileText,
  Plus,
  Search,
  User,
  Calendar,
  Pill,
  Download,
  Eye,
} from "lucide-react";

const prescriptions = [
  {
    id: "RX-1001",
    patient: "Emma Wilson",
    diagnosis: "Anxiety Disorder",
    medicines: 3,
    date: "02 Jun 2026",
  },
  {
    id: "RX-1002",
    patient: "John Smith",
    diagnosis: "Sleep Disorder",
    medicines: 2,
    date: "01 Jun 2026",
  },
  {
    id: "RX-1003",
    patient: "Sarah Johnson",
    diagnosis: "Stress Management",
    medicines: 4,
    date: "29 May 2026",
  },
  {
    id: "RX-1004",
    patient: "David Lee",
    diagnosis: "Depression",
    medicines: 5,
    date: "28 May 2026",
  },
];

export default function DoctorPrescriptionsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-8 text-white shadow-2xl">
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
          Prescription Management
        </span>

        <h1 className="mt-5 text-4xl font-bold">
          Digital Prescriptions
        </h1>

        <p className="mt-4 max-w-2xl text-white/90">
          Create, manage and review patient prescriptions
          securely with a centralized medical system.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <FileText className="h-10 w-10 text-blue-500" />

          <h2 className="mt-4 text-3xl font-bold">
            248
          </h2>

          <p className="text-slate-500">
            Total Prescriptions
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Plus className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            24
          </h2>

          <p className="text-slate-500">
            Created This Week
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Pill className="h-10 w-10 text-violet-500" />

          <h2 className="mt-4 text-3xl font-bold">
            685
          </h2>

          <p className="text-slate-500">
            Medicines Prescribed
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <User className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            98
          </h2>

          <p className="text-slate-500">
            Active Patients
          </p>
        </div>
      </section>

      {/* Search + Action */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search prescriptions..."
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
                focus:border-blue-500
                dark:border-slate-800
                dark:bg-slate-800
              "
            />
          </div>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-5
              py-3
              font-semibold
              text-white
            "
          >
            <Plus className="h-4 w-4" />
            New Prescription
          </button>
        </div>
      </section>

      {/* Prescription Table */}

      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
                <th className="px-6 py-4 text-left">
                  Prescription ID
                </th>

                <th className="px-6 py-4 text-left">
                  Patient
                </th>

                <th className="px-6 py-4 text-left">
                  Diagnosis
                </th>

                <th className="px-6 py-4 text-left">
                  Medicines
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {prescriptions.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-b
                    border-slate-100
                    hover:bg-slate-50
                    dark:border-slate-800
                    dark:hover:bg-slate-800
                  "
                >
                  <td className="px-6 py-5 font-medium">
                    {item.id}
                  </td>

                  <td className="px-6 py-5">
                    {item.patient}
                  </td>

                  <td className="px-6 py-5">
                    {item.diagnosis}
                  </td>

                  <td className="px-6 py-5">
                    {item.medicines}
                  </td>

                  <td className="px-6 py-5">
                    {item.date}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      <button className="rounded-xl bg-blue-500 p-2 text-white">
                        <Eye className="h-4 w-4" />
                      </button>

                      <button className="rounded-xl bg-emerald-500 p-2 text-white">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Prescriptions */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-cyan-500" />

          <h2 className="text-xl font-semibold">
            Recent Prescription Activity
          </h2>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            New prescription created for Emma Wilson
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Sleep medication updated for John Smith
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Prescription downloaded by Sarah Johnson
          </div>
        </div>
      </section>
    </div>
  );
}