import Image from "next/image";
import Link from "next/link";

import {
  HeartPulse,
  Brain,
  ShieldCheck,
  Activity,
  Users,
  Sparkles,
  Stethoscope,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const ecosystem = [
    {
      icon: GraduationCap,
      title: "Students",
      description:
        "Track wellness, complete assessments, monitor habits, and access support resources.",
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description:
        "Provides personalized wellness insights and 24/7 intelligent guidance.",
    },
    {
      icon: Users,
      title: "Counselors",
      description:
        "Support students through mental health consultations and wellness interventions.",
    },
    {
      icon: Stethoscope,
      title: "Doctors",
      description:
        "Monitor physical health, provide recommendations, and review wellness reports.",
    },
    {
      icon: ShieldCheck,
      title: "Administrators",
      description:
        "Manage users, analytics, appointments, and platform-wide wellness initiatives.",
    },
  ];

  const roadmap = [
    "AI Mental Health Prediction",
    "Smart Risk Detection",
    "Wearable Device Integration",
    "Mobile Application Launch",
    "University Analytics Dashboard",
    "Personalized Wellness Recommendations",
  ];

  return (
    <main className="bg-white dark:bg-slate-950">
      {/* HERO */}

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10" />

        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="mx-auto max-w-5xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
              <HeartPulse className="h-4 w-4" />
              Smart HealthHub
            </div>

            <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white lg:text-7xl">
              Empowering Student Wellness Through AI & Technology
            </h1>

            <p className="mx-auto mt-8 max-w-3xl text-lg text-slate-600 dark:text-slate-400 lg:text-xl">
              Smart HealthHub is an AI-powered wellness platform designed
              to help students improve their mental and physical well-being,
              connect with healthcare professionals, and build healthier
              lifestyles through data-driven insights.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="rounded-2xl border border-slate-300 px-8 py-4 font-semibold transition-all hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="font-semibold uppercase tracking-wider text-emerald-500">
              Our Story
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
              Why Smart HealthHub Was Created
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Student wellness has become one of the most important
              challenges in modern education. Academic pressure, stress,
              anxiety, poor sleep habits, unhealthy lifestyles, and limited
              access to support services can negatively impact both academic
              performance and personal well-being.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Smart HealthHub was built to bridge this gap by combining
              artificial intelligence, wellness tracking, professional
              healthcare support, and institutional management into a
              unified platform designed specifically for students.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION */}

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Image
                src="/images/mission.jpg"
                alt="Our Mission"
                width={800}
                height={600}
                className="rounded-[32px] object-cover shadow-xl"
              />
            </div>

            <div>
              <span className="font-semibold uppercase tracking-wider text-emerald-500">
                Our Mission
              </span>

              <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
                Making Wellness Accessible For Every Student
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Our mission is to provide an intelligent, secure, and
                accessible wellness ecosystem where students can monitor
                their health, receive personalized guidance, and connect
                with professionals whenever support is needed.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                We believe wellness should not be reactive—it should be
                proactive, measurable, and available to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}

      <section className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="font-semibold uppercase tracking-wider text-cyan-500">
                Our Vision
              </span>

              <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
                Building The Future Of Digital Student Wellness
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                We envision a future where every educational institution
                has access to a connected wellness ecosystem powered by AI.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                A future where students receive support before challenges
                become crises, and where technology empowers healthier,
                happier, and more successful communities.
              </p>
            </div>

            <div>
              <Image
                src="/images/vision.jpg"
                alt="Our Vision"
                width={800}
                height={600}
                className="rounded-[32px] object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <span className="font-semibold uppercase tracking-wider text-emerald-500">
              Platform Ecosystem
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              One Platform. Multiple Stakeholders.
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-slate-600 dark:text-slate-400">
              Smart HealthHub brings together students, healthcare
              professionals, administrators, and AI technologies to create
              a complete wellness ecosystem.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 p-6 transition-all hover:-translate-y-1 hover:shadow-xl dark:border-slate-800"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROADMAP */}

      <section className="bg-slate-50 py-24 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <span className="font-semibold uppercase tracking-wider text-emerald-500">
              Future Roadmap
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              What Comes Next
            </h2>
          </div>

          <div className="mx-auto mt-14 max-w-4xl grid gap-4 md:grid-cols-2">
            {roadmap.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="rounded-[40px] bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-12 text-center text-white">
            <Sparkles className="mx-auto h-12 w-12" />

            <h2 className="mt-5 text-4xl font-bold">
              Start Your Wellness Journey Today
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-white/85">
              Join Smart HealthHub and experience a smarter way to manage
              mental and physical well-being through technology,
              professional support, and AI-powered guidance.
            </p>

            <Link
              href="/register"
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-emerald-600 transition-all hover:scale-105"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}