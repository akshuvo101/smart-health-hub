import Image from "next/image";

import {
  Brain,
  HeartPulse,
  Moon,
  Activity,
  ClipboardCheck,
  CalendarDays,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Users,
  Stethoscope,
  UserCog,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "AI Wellness Assistant",
    description:
      "Get personalized wellness insights, guidance, and recommendations powered by AI.",
    icon: Brain,
  },
  {
    title: "Mood Tracking",
    description:
      "Monitor emotional wellbeing and identify wellness trends over time.",
    icon: HeartPulse,
  },
  {
    title: "Sleep Tracking",
    description:
      "Track sleep patterns and improve sleep quality with actionable insights.",
    icon: Moon,
  },
  {
    title: "Habit Tracking",
    description:
      "Build healthy routines and maintain positive daily habits.",
    icon: Activity,
  },
  {
    title: "Assessments",
    description:
      "Complete wellness assessments and receive personalized reports.",
    icon: ClipboardCheck,
  },
  {
    title: "Appointments",
    description:
      "Book and manage counseling or healthcare appointments easily.",
    icon: CalendarDays,
  },
  {
    title: "Community Forum",
    description:
      "Connect with peers, share experiences, and grow together.",
    icon: MessageSquare,
  },
  {
    title: "Reports & Analytics",
    description:
      "Gain valuable insights into wellness progress and engagement.",
    icon: BarChart3,
  },
];

export default function FeaturesPage() {
  return (
    <main className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Hero */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/features-hero.jpg"
            alt="Smart HealthHub Features"
            fill
            priority
            className="object-cover"
          />

          <div className="absolute inset-0 bg-slate-950/75" />

          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 via-slate-950/80 to-cyan-900/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-28 lg:py-40">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
              Platform Features
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white lg:text-7xl">
              Everything You Need For
              <span className="block text-emerald-400">
                Student Wellness
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-200 lg:text-xl">
              Smart HealthHub combines AI, wellness tracking,
              counseling, healthcare management, and analytics
              into one powerful platform.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
                <h3 className="text-3xl font-bold text-white">
                  10+
                </h3>

                <p className="mt-2 text-slate-300">
                  Wellness Modules
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
                <h3 className="text-3xl font-bold text-white">
                  5
                </h3>

                <p className="mt-2 text-slate-300">
                  User Portals
                </p>
              </div>

              <div className="rounded-3xl bg-white/10 p-6 backdrop-blur-md">
                <h3 className="text-3xl font-bold text-white">
                  AI
                </h3>

                <p className="mt-2 text-slate-300">
                  Powered Insights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Core Platform Features
          </h2>

          <p className="mt-4 text-slate-600 dark:text-slate-400">
            Designed to support mental, physical, and emotional wellness.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform Modules */}

      <section className="bg-white py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Built For Every Role
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-5">
            {[
              {
                title: "Students",
                icon: Users,
              },
              {
                title: "Counselors",
                icon: HeartPulse,
              },
              {
                title: "Doctors",
                icon: Stethoscope,
              },
              {
                title: "Admins",
                icon: UserCog,
              },
              {
                title: "Super Admins",
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 p-8 text-center dark:border-slate-800"
                >
                  <Icon className="mx-auto h-12 w-12 text-emerald-500" />

                  <h3 className="mt-4 text-lg font-semibold">
                    {item.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Smart HealthHub */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Why Choose Smart HealthHub?
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
            <Sparkles className="h-10 w-10 text-emerald-500" />

            <h3 className="mt-4 text-xl font-semibold">
              AI Powered
            </h3>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Personalized wellness recommendations and smart insights.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
            <ShieldCheck className="h-10 w-10 text-emerald-500" />

            <h3 className="mt-4 text-xl font-semibold">
              Secure & Private
            </h3>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Enterprise-grade security and role-based access control.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm dark:bg-slate-900">
            <BarChart3 className="h-10 w-10 text-emerald-500" />

            <h3 className="mt-4 text-xl font-semibold">
              Actionable Analytics
            </h3>

            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Real-time reports and wellness performance tracking.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl font-bold">
            Start Your Wellness Journey Today
          </h2>

          <p className="mt-4 text-lg text-white/90">
            Join Smart HealthHub and experience the future
            of student wellness management.
          </p>

          <button className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-emerald-600 transition-all hover:scale-105">
            Get Started
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>
    </main>
  );
}