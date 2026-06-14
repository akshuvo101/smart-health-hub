import HabitForm from "@/components/habits/habit-form";
import HabitList from "@/components/habits/habit-list";
import HabitProgress from "@/components/habits/habit-progress";

export default function HabitsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Habit Tracker
        </h1>

        <p className="mt-2 max-w-2xl text-white/90">
          Create healthy habits, track your progress,
          and build consistency for a better lifestyle.
        </p>
      </section>

      {/* Grid */}

      <section className="grid gap-6 lg:grid-cols-3">
        <div>
          <HabitForm />
        </div>

        <div className="lg:col-span-2">
          <HabitProgress />
        </div>
      </section>

      <HabitList />
    </div>
  );
}