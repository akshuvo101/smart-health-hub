import AssessmentForm from "@/components/assessments/assessment-form";
import AssessmentResult from "@/components/assessments/assessment-result";
import QuizStep from "@/components/assessments/quiz-step";

export default function AssessmentsPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="rounded-3xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold">
          Wellness Assessments
        </h1>

        <p className="mt-3 max-w-2xl text-white/90">
          Take scientifically inspired wellness assessments
          to understand your stress, anxiety, and emotional
          wellbeing.
        </p>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-sm text-slate-500">
            Assessments Taken
          </h3>

          <p className="mt-2 text-4xl font-bold">
            12
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-sm text-slate-500">
            Wellness Score
          </h3>

          <p className="mt-2 text-4xl font-bold">
            84%
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-slate-900">
          <h3 className="text-sm text-slate-500">
            Last Assessment
          </h3>

          <p className="mt-2 text-xl font-semibold">
            Stress Test
          </p>
        </div>
      </section>

      {/* Main Grid */}

      <section className="grid gap-6 xl:grid-cols-3">
        <AssessmentForm />

        <div className="space-y-6 xl:col-span-2">
          <QuizStep />

          <AssessmentResult />
        </div>
      </section>
    </div>
  );
}