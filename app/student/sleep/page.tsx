import SleepForm from "@/components/sleep/sleep-form";
import SleepCard from "@/components/sleep/sleep-card";
import SleepHistory from "@/components/sleep/sleep-history";

export default function SleepPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-blue-500 via-cyan-500 to-sky-500 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Sleep Tracker
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Monitor your sleep habits, improve recovery,
          and build a healthier lifestyle through better sleep.
        </p>
      </section>

      {/* Overview */}

      <section className="grid gap-6 lg:grid-cols-3">
        <SleepCard />

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Weekly Goal
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            8h
          </h2>

          <p className="mt-2 text-emerald-500">
            On Track ✅
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500">
            Sleep Score
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            92
          </h2>

          <p className="mt-2 text-blue-500">
            Excellent 😴
          </p>
        </div>
      </section>

      {/* Main Grid */}

      <section className="grid gap-6 lg:grid-cols-3">
        <div>
          <SleepForm />
        </div>

        <div className="lg:col-span-2">
          <SleepHistory />
        </div>
      </section>
    </div>
  );
}