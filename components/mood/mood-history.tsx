import Card from "@/components/ui/card";

import {
  Smile,
  Meh,
  Frown,
  CalendarDays,
} from "lucide-react";

const moodHistory = [
  {
    mood: "Happy",
    date: "Today",
    note: "Feeling productive and motivated.",
    icon: Smile,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    mood: "Neutral",
    date: "Yesterday",
    note: "Completed classes and assignments.",
    icon: Meh,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    mood: "Sad",
    date: "2 Days Ago",
    note: "Academic pressure was higher than usual.",
    icon: Frown,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

export default function MoodHistory() {
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Mood History
        </h2>

        <CalendarDays className="h-5 w-5 text-slate-400" />
      </div>

      <div className="space-y-4">
        {moodHistory.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.date}
              className="
                rounded-2xl
                border
                border-slate-100
                p-4
                transition-all
                hover:border-emerald-200
                hover:bg-slate-50
                dark:border-slate-800
                dark:hover:bg-slate-800/50
              "
            >
              <div className="flex gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
                >
                  <Icon
                    className={`h-6 w-6 ${item.color}`}
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {item.mood}
                    </h3>

                    <span className="text-xs text-slate-500">
                      {item.date}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {item.note}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}