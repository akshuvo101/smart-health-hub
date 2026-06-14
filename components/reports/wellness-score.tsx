export default function WellnessScore() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="text-lg font-semibold">
        Overall Wellness Score
      </h2>

      <div className="mt-8 flex justify-center">
        <div className="flex h-44 w-44 items-center justify-center rounded-full border-[12px] border-emerald-500">
          <div className="text-center">
            <h3 className="text-5xl font-bold text-emerald-500">
              87
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Excellent
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        Based on Mood, Sleep, Habits & Assessments
      </p>
    </div>
  );
}