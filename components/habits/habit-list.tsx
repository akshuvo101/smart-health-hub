"use client";

import { CheckCircle2 } from "lucide-react";

const habits = [
  {
    id: 1,
    name: "Drink 3L Water",
    streak: 12,
    completed: true,
  },
  {
    id: 2,
    name: "Morning Exercise",
    streak: 7,
    completed: false,
  },
  {
    id: 3,
    name: "Meditation",
    streak: 21,
    completed: true,
  },
  {
    id: 4,
    name: "Sleep Before 11 PM",
    streak: 9,
    completed: false,
  },
];

export default function HabitList() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
        My Habits
      </h2>

      <div className="space-y-4">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800"
          >
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {habit.name}
              </h3>

              <p className="text-sm text-slate-500">
                🔥 {habit.streak} Day Streak
              </p>
            </div>

            <button
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition
                ${
                  habit.completed
                    ? "bg-emerald-500 text-white"
                    : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300"
                }`}
            >
              <CheckCircle2 className="h-4 w-4" />

              {habit.completed ? "Completed" : "Mark Done"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}