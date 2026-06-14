"use client";

const questions = [
  "How often have you felt stressed in the last week?",
  "How often do you struggle to relax?",
  "How often do you feel overwhelmed by tasks?",
];

export default function QuizStep() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6">
        <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-600 dark:bg-purple-500/10">
          Question 1 of 10
        </span>
      </div>

      <h2 className="text-xl font-semibold">
        {questions[0]}
      </h2>

      <div className="mt-6 space-y-3">
        {[
          "Never",
          "Rarely",
          "Sometimes",
          "Often",
          "Always",
        ].map((option) => (
          <button
            key={option}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-left transition-all hover:border-purple-500 hover:bg-purple-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}