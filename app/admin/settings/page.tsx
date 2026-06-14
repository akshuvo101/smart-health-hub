export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-r from-slate-800 to-slate-700 p-8 text-white">
        <h1 className="text-4xl font-bold">
          Admin Settings
        </h1>

        <p className="mt-3 text-slate-300">
          Configure platform preferences and security.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-semibold">
            Platform Settings
          </h2>

          <div className="space-y-4">
            <input
              placeholder="Platform Name"
              defaultValue="Smart HealthHub"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
            />

            <button className="rounded-2xl bg-indigo-500 px-6 py-3 font-semibold text-white">
              Save Changes
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900 dark:bg-slate-900">
          <h2 className="mb-4 text-xl font-semibold text-red-500">
            Security
          </h2>

          <button className="w-full rounded-2xl bg-red-500 py-3 font-semibold text-white">
            Reset System
          </button>
        </div>
      </div>
    </div>
  );
}