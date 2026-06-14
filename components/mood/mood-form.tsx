"use client";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";

export default function MoodForm() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        Daily Reflection
      </h2>

      <textarea
        rows={6}
        placeholder="Describe your day, emotions, stress level, achievements, or anything important..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-4
          text-sm
          outline-none
          transition-all
          focus:border-emerald-500
          focus:ring-4
          focus:ring-emerald-500/10
          dark:border-slate-700
          dark:bg-slate-950
          dark:text-white
        "
      />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Your mood entries remain private.
        </p>

        <Button>
          Save Entry
        </Button>
      </div>
    </Card>
  );
}