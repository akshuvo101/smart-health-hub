import {
  Brain,
  Sparkles,
  Bot,
  AlertTriangle,
  HeartPulse,
  MessageSquare,
  TrendingUp,
  Send,
} from "lucide-react";

export default function CounselorAIAssistantPage() {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

        <div className="relative z-10">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
            AI-Powered Counseling
          </span>

          <h1 className="mt-5 text-4xl font-bold lg:text-5xl">
            AI Counseling Assistant
          </h1>

          <p className="mt-4 max-w-3xl text-white/90">
            Get intelligent recommendations, student risk
            assessments, session summaries, intervention
            strategies, and mental health insights powered
            by AI.
          </p>
        </div>
      </section>

      {/* Stats */}

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Bot className="mb-4 h-10 w-10 text-violet-500" />

          <h3 className="text-3xl font-bold">1,248</h3>

          <p className="text-slate-500">
            AI Consultations
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <Brain className="mb-4 h-10 w-10 text-pink-500" />

          <h3 className="text-3xl font-bold">94%</h3>

          <p className="text-slate-500">
            Recommendation Accuracy
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <HeartPulse className="mb-4 h-10 w-10 text-emerald-500" />

          <h3 className="text-3xl font-bold">187</h3>

          <p className="text-slate-500">
            Wellness Insights
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <TrendingUp className="mb-4 h-10 w-10 text-cyan-500" />

          <h3 className="text-3xl font-bold">89%</h3>

          <p className="text-slate-500">
            Positive Outcomes
          </p>
        </div>
      </section>

      {/* AI Chat */}

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center gap-3">
            <Bot className="h-8 w-8 text-violet-500" />

            <div>
              <h2 className="text-xl font-semibold">
                AI Counseling Assistant
              </h2>

              <p className="text-sm text-slate-500">
                Ask questions about student wellbeing,
                counseling strategies, or risk analysis.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
              <p className="font-medium text-violet-600">
                AI Assistant
              </p>

              <p className="mt-2 text-sm">
                Hello Counselor. How can I assist you
                today?
              </p>
            </div>

            <div className="rounded-2xl bg-violet-500 p-4 text-white">
              <p className="font-medium">
                Counselor
              </p>

              <p className="mt-2 text-sm">
                Analyze stress patterns among students
                this week.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
              <p className="font-medium text-violet-600">
                AI Assistant
              </p>

              <p className="mt-2 text-sm">
                Stress levels increased by 11% during
                midterm assessments. Academic workload
                remains the primary contributor. Recommend
                mindfulness sessions and early intervention
                support.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <input
              type="text"
              placeholder="Ask the AI assistant..."
              className="
                flex-1
                rounded-2xl
                border
                border-slate-200
                px-4
                py-3
                outline-none
                focus:border-violet-500
                dark:border-slate-800
                dark:bg-slate-950
              "
            />

            <button className="rounded-2xl bg-violet-500 px-5 text-white">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* AI Features */}

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Sparkles className="mb-4 h-10 w-10 text-yellow-500" />

            <h3 className="font-semibold">
              Smart Suggestions
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Personalized counseling recommendations
              generated from student behavior and wellness
              trends.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <MessageSquare className="mb-4 h-10 w-10 text-cyan-500" />

            <h3 className="font-semibold">
              Session Summaries
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Automatically generate structured counseling
              notes and follow-up recommendations.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <AlertTriangle className="mb-4 h-10 w-10 text-red-500" />

            <h3 className="font-semibold">
              Risk Detection
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              AI identifies high-risk students requiring
              immediate attention or intervention.
            </p>
          </div>
        </div>
      </section>

      {/* Student Risk Analysis */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-xl font-semibold">
          AI Risk Analysis
        </h2>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/20">
            <h3 className="font-semibold text-red-600">
              High Risk
            </h3>

            <p className="mt-2 text-3xl font-bold">
              7
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Students require urgent intervention.
            </p>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50 p-5 dark:border-orange-900 dark:bg-orange-950/20">
            <h3 className="font-semibold text-orange-600">
              Medium Risk
            </h3>

            <p className="mt-2 text-3xl font-bold">
              24
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Monitoring and follow-up recommended.
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/20">
            <h3 className="font-semibold text-emerald-600">
              Low Risk
            </h3>

            <p className="mt-2 text-3xl font-bold">
              138
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Stable and progressing positively.
            </p>
          </div>
        </div>
      </section>

      {/* AI Recommendations */}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-6 text-xl font-semibold">
          Recommended Actions
        </h2>

        <div className="space-y-4">
          <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
            🧠 Schedule follow-up counseling sessions for
            students flagged as high-risk.
          </div>

          <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
            📚 Introduce stress-management workshops during
            examination periods.
          </div>

          <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
            💬 Increase wellness check-ins for students
            showing declining engagement.
          </div>

          <div className="rounded-2xl bg-violet-50 p-4 dark:bg-slate-800">
            🎯 Launch targeted mindfulness programs for
            students experiencing academic pressure.
          </div>
        </div>
      </section>
    </div>
  );
}