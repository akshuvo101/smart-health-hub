import {
  Brain,
  Sparkles,
  Activity,
  AlertTriangle,
  Stethoscope,
  MessageSquare,
  FileText,
  Send,
} from "lucide-react";

export default function DoctorAIAssistantPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
            AI Medical Assistant
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            Doctor AI Assistant
          </h1>

          <p className="mt-4 max-w-3xl text-white/90">
            Analyze symptoms, generate patient summaries,
            identify risk factors, and receive AI-powered
            treatment recommendations.
          </p>
        </div>
      </section>

      {/* AI Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="h-10 w-10 text-violet-500" />

          <h2 className="mt-4 text-3xl font-bold">
            1,245
          </h2>

          <p className="text-slate-500">
            AI Analyses Generated
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Sparkles className="h-10 w-10 text-cyan-500" />

          <h2 className="mt-4 text-3xl font-bold">
            98%
          </h2>

          <p className="text-slate-500">
            Recommendation Accuracy
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Activity className="h-10 w-10 text-emerald-500" />

          <h2 className="mt-4 text-3xl font-bold">
            432
          </h2>

          <p className="text-slate-500">
            Patient Reports Generated
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <AlertTriangle className="h-10 w-10 text-orange-500" />

          <h2 className="mt-4 text-3xl font-bold">
            28
          </h2>

          <p className="text-slate-500">
            High Risk Cases Flagged
          </p>
        </div>
      </section>

      {/* AI Workspace */}

      <section className="grid gap-6 lg:grid-cols-3">
        {/* Input */}

        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-violet-500" />

            <h2 className="text-xl font-semibold">
              Ask AI Assistant
            </h2>
          </div>

          <textarea
            rows={10}
            placeholder="Example:

Patient:
24-year-old male

Symptoms:
• Anxiety
• Sleep issues
• Increased stress

Generate diagnosis insights and treatment recommendations..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              bg-slate-50
              p-4
              outline-none
              focus:border-violet-500
              dark:border-slate-800
              dark:bg-slate-800
            "
          />

          <button
            className="
              mt-5
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-violet-500
              to-fuchsia-600
              px-6
              py-3
              font-semibold
              text-white
            "
          >
            <Send className="h-4 w-4" />
            Generate AI Analysis
          </button>
        </div>

        {/* Quick Tools */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-5 text-xl font-semibold">
            Quick Tools
          </h2>

          <div className="space-y-4">
            <button className="flex w-full items-center gap-3 rounded-2xl bg-violet-50 p-4 text-left dark:bg-violet-950/20">
              <Brain className="h-5 w-5 text-violet-500" />
              Symptom Analysis
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl bg-cyan-50 p-4 text-left dark:bg-cyan-950/20">
              <Stethoscope className="h-5 w-5 text-cyan-500" />
              Treatment Suggestions
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-left dark:bg-emerald-950/20">
              <FileText className="h-5 w-5 text-emerald-500" />
              Generate Medical Report
            </button>

            <button className="flex w-full items-center gap-3 rounded-2xl bg-orange-50 p-4 text-left dark:bg-orange-950/20">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Risk Assessment
            </button>
          </div>
        </div>
      </section>

      {/* AI Response */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center gap-3">
          <Sparkles className="h-6 w-6 text-violet-500" />

          <h2 className="text-xl font-semibold">
            AI Generated Insight
          </h2>
        </div>

        <div className="rounded-2xl bg-slate-50 p-6 leading-relaxed dark:bg-slate-800">
          <p>
            Based on the patient's symptoms, the AI
            identifies moderate anxiety patterns with
            stress-related sleep disruption.
          </p>

          <p className="mt-4">
            Suggested interventions include cognitive
            behavioral therapy (CBT), sleep hygiene
            improvements, mindfulness exercises, and
            ongoing mood tracking.
          </p>

          <p className="mt-4">
            Risk level: <strong>Medium</strong>
          </p>

          <p className="mt-2">
            Recommended follow-up: <strong>2 weeks</strong>
          </p>
        </div>
      </section>

      {/* Recent AI Activity */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-5 text-xl font-semibold">
          Recent AI Activity
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            AI generated treatment recommendation for
            Emma Wilson
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Risk assessment completed for John Smith
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Medical summary generated for Sarah Johnson
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            Symptom analysis completed for David Lee
          </div>
        </div>
      </section>
    </div>
  );
}