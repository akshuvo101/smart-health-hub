import {
  Users,
  Search,
  Mail,
  Phone,
  ArrowUpRight,
  Calendar,
  Brain,
} from "lucide-react";

export default function CounselorStudentsPage() {
  const students = [
    {
      id: 1,
      name: "John Smith",
      email: "john@student.edu",
      phone: "+1 555-123-4567",
      mood: "Improving",
      sessions: 8,
      risk: "Low",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@student.edu",
      phone: "+1 555-987-6543",
      mood: "Moderate",
      sessions: 5,
      risk: "Medium",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@student.edu",
      phone: "+1 555-111-2222",
      mood: "Needs Attention",
      sessions: 12,
      risk: "High",
    },
    {
      id: 4,
      name: "Emma Wilson",
      email: "emma@student.edu",
      phone: "+1 555-333-4444",
      mood: "Excellent",
      sessions: 3,
      risk: "Low",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              Student Management
            </span>

            <h1 className="mt-4 text-4xl font-bold">
              Student Wellness Tracking
            </h1>

            <p className="mt-3 max-w-2xl text-white/90">
              Monitor student wellbeing, counseling progress,
              risk levels, and support needs from one place.
            </p>
          </div>

          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-md">
            <Users className="h-10 w-10" />
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Total Students</p>

          <h2 className="mt-2 text-3xl font-bold">248</h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">Active Cases</p>

          <h2 className="mt-2 text-3xl font-bold text-blue-500">
            57
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">High Risk</p>

          <h2 className="mt-2 text-3xl font-bold text-red-500">
            8
          </h2>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Counseling Success
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-500">
            91%
          </h2>
        </div>
      </section>

      {/* Search */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search students..."
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
              focus:border-cyan-500
              dark:border-slate-700
              dark:bg-slate-800
            "
          />
        </div>
      </section>

      {/* Student List */}

      <section className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 p-6 dark:border-slate-800">
          <h2 className="text-xl font-semibold">
            Assigned Students
          </h2>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {students.map((student) => (
            <div
              key={student.id}
              className="p-6 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 font-bold text-white">
                    {student.name.charAt(0)}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {student.name}
                    </h3>

                    <div className="mt-2 flex flex-col gap-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {student.email}
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {student.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 lg:min-w-[420px]">
                  <div className="rounded-2xl bg-slate-100 p-3 text-center dark:bg-slate-800">
                    <p className="text-xs text-slate-500">
                      Mood Trend
                    </p>

                    <p className="mt-1 font-semibold">
                      {student.mood}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-3 text-center dark:bg-slate-800">
                    <p className="text-xs text-slate-500">
                      Sessions
                    </p>

                    <p className="mt-1 font-semibold">
                      {student.sessions}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 p-3 text-center dark:bg-slate-800">
                    <p className="text-xs text-slate-500">
                      Risk Level
                    </p>

                    <p
                      className={`mt-1 font-semibold ${
                        student.risk === "High"
                          ? "text-red-500"
                          : student.risk === "Medium"
                            ? "text-yellow-500"
                            : "text-emerald-500"
                      }`}
                    >
                      {student.risk}
                    </p>
                  </div>
                </div>

                <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-medium text-white transition-all hover:-translate-y-1">
                  View Profile
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Tools */}

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Calendar className="mb-4 h-8 w-8 text-cyan-500" />

          <h3 className="font-semibold">
            Upcoming Sessions
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            12 counseling appointments scheduled this
            week.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="mb-4 h-8 w-8 text-purple-500" />

          <h3 className="font-semibold">
            Mental Health Insights
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            AI detected increased stress patterns among
            final-year students.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Users className="mb-4 h-8 w-8 text-emerald-500" />

          <h3 className="font-semibold">
            Student Engagement
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            87% of students actively use wellness tools.
          </p>
        </div>
      </section>
    </div>
  );
}