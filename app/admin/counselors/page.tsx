import {
  Mail,
  Phone,
  Plus,
} from "lucide-react";

const counselors = [
  {
    name: "Dr. Sarah Ahmed",
    email: "sarah@healthhub.com",
    phone: "+880 171111111",
  },
  {
    name: "Dr. John Smith",
    email: "john@healthhub.com",
    phone: "+880 181111111",
  },
];

export default function CounselorsPage() {
  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-500 p-8 text-white lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold">
            Counselors
          </h1>

          <p className="mt-3 text-white/90">
            Manage wellness professionals.
          </p>
        </div>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 font-semibold text-purple-600">
          <Plus className="h-5 w-5" />
          Add Counselor
        </button>
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        {counselors.map((counselor) => (
          <div
            key={counselor.email}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 font-bold text-white">
              {counselor.name[0]}
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              {counselor.name}
            </h3>

            <div className="mt-4 space-y-3 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {counselor.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {counselor.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}