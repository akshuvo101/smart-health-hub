import Image from "next/image";
import Link from "next/link";

import {
  BookOpen,
  Brain,
  HeartPulse,
  Moon,
  Download,
  Users,
  ArrowRight,
  FileText,
  ShieldCheck,
  Activity,
} from "lucide-react";

const categories = [
  {
    title: "Mental Health",
    description:
      "Evidence-based articles and guides to improve emotional wellbeing.",
    icon: Brain,
  },
  {
    title: "Physical Wellness",
    description:
      "Learn healthy habits, exercise routines, and wellness practices.",
    icon: HeartPulse,
  },
  {
    title: "Sleep Health",
    description:
      "Improve sleep quality and understand healthy sleep patterns.",
    icon: Moon,
  },
  {
    title: "Student Success",
    description:
      "Resources focused on productivity, stress management, and balance.",
    icon: Activity,
  },
];

const resources = [
  {
    title: "Understanding Mental Health",
    image: "/images/resources/mental-health.jpg",
    description:
      "Learn the fundamentals of mental health awareness and emotional resilience.",
  },
  {
    title: "Student Wellness Guide",
    image: "/images/resources/student-wellness.jpg",
    description:
      "A complete guide for maintaining academic and personal wellbeing.",
  },
  {
    title: "Professional Counseling Support",
    image: "/images/resources/counselor-support.jpg",
    description:
      "Discover how counseling services can help during challenging times.",
  },
];

export default function ResourcesPage() {
  return (
    <main className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      {/* Hero */}

      <section className="relative h-[70vh] min-h-[600px] mt-20 overflow-hidden">
        <Image
          src="/images/resources/hero.jpg"
          alt="Resources"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="max-w-3xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              Wellness Resource Library
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-white md:text-7xl">
              Knowledge That Supports Your Wellness Journey
            </h1>

            <p className="mt-6 text-lg text-slate-200 md:text-xl">
              Access trusted wellness resources, mental health guides,
              educational articles, and practical tools designed to help
              students build healthier habits and improve overall wellbeing.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-2xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-600"
              >
                Get Started
              </Link>

              <Link
                href="/contact"
                className="rounded-2xl border border-white/30 px-6 py-4 font-semibold text-white backdrop-blur transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Explore Wellness Categories
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-600 dark:text-slate-400">
            Browse curated content designed to support every aspect of student
            wellbeing.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-500/10">
                  <Icon className="h-7 w-7 text-emerald-600" />
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
      </section>

      {/* Featured Resources */}

      <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-bold">
                Featured Resources
              </h2>

              <p className="mt-3 text-slate-600 dark:text-slate-400">
                Recommended wellness content for students.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {resources.map((resource) => (
              <div
                key={resource.title}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-semibold">
                    {resource.title}
                  </h3>

                  <p className="mt-4 text-slate-600 dark:text-slate-400">
                    {resource.description}
                  </p>

                  <button className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-600">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wellness Toolkit */}

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Image
              src="/images/resources/toolkit.jpg"
              alt="Toolkit"
              width={700}
              height={500}
              className="rounded-3xl object-cover"
            />
          </div>

          <div>
            <span className="font-semibold text-emerald-600">
              Wellness Toolkit
            </span>

            <h2 className="mt-4 text-4xl font-bold">
              Practical Tools For Everyday Wellbeing
            </h2>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <Download className="mt-1 h-6 w-6 text-emerald-600" />
                <div>
                  <h3 className="font-semibold">
                    Downloadable Guides
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Wellness checklists, sleep planners, and self-care guides.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FileText className="mt-1 h-6 w-6 text-emerald-600" />
                <div>
                  <h3 className="font-semibold">
                    Self-Assessments
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Track your wellbeing and identify areas for improvement.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <ShieldCheck className="mt-1 h-6 w-6 text-emerald-600" />
                <div>
                  <h3 className="font-semibold">
                    Trusted Information
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Curated resources reviewed by healthcare professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community */}

      <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="font-semibold text-emerald-600">
                Community Support
              </span>

              <h2 className="mt-4 text-4xl font-bold">
                Learn, Connect & Grow Together
              </h2>

              <p className="mt-6 text-slate-600 dark:text-slate-400">
                Smart HealthHub encourages students to engage with wellness
                communities, educational programs, and professional support
                services.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Users className="h-6 w-6 text-emerald-600" />
                <span>Peer Support & Wellness Discussions</span>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <BookOpen className="h-6 w-6 text-emerald-600" />
                <span>Evidence-Based Learning Resources</span>
              </div>
            </div>

            <Image
              src="/images/resources/community.jpg"
              alt="Community"
              width={700}
              height={500}
              className="rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-5xl font-bold">
            Start Your Wellness Journey Today
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 dark:text-slate-400">
            Explore trusted wellness resources, connect with professionals,
            and build healthier habits with Smart HealthHub.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="rounded-2xl bg-emerald-500 px-8 py-4 font-semibold text-white hover:bg-emerald-600"
            >
              Create Account
            </Link>

            <Link
              href="/features"
              className="rounded-2xl border border-slate-300 px-8 py-4 font-semibold dark:border-slate-700"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}