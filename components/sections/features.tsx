"use client";

import { motion } from "framer-motion";
import {
  Brain,
  HeartPulse,
  MoonStar,
  CalendarDays,
  Users,
  ClipboardList,
} from "lucide-react";

import Container from "@/components/layout/container";

const features = [
  {
    title: "Mood Tracking",
    description:
      "Track your daily emotions and understand patterns that impact your mental well-being.",
    icon: HeartPulse,
  },
  {
    title: "Sleep Monitoring",
    description:
      "Monitor sleep quality, sleep duration, and build healthier sleeping habits.",
    icon: MoonStar,
  },
  {
    title: "AI Recommendations",
    description:
      "Receive personalized wellness suggestions based on your mood, habits, and progress.",
    icon: Brain,
  },
  {
    title: "Self Assessment Quiz",
    description:
      "Evaluate stress levels, wellness status, and gain insights through guided assessments.",
    icon: ClipboardList,
  },
  {
    title: "Appointment Booking",
    description:
      "Book counseling and wellness sessions quickly through a simple scheduling system.",
    icon: CalendarDays,
  },
  {
    title: "Peer Support Community",
    description:
      "Connect anonymously with fellow students and share experiences in a safe environment.",
    icon: Users,
  },
];

export default function Features() {
  return (
    <section className="relative py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute right-1/4 bottom-0 h-64 w-64 rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <Container>
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
            Powerful Wellness Features
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Everything Students Need
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              For Better Wellness
            </span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Smart HealthHub combines AI, wellness tracking, and support
            services to help students maintain a healthier and more balanced
            lifestyle.
          </p>
        </motion.div>

        {/* Feature Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none"
              >
                {/* Hover Gradient */}

                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-transparent to-cyan-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Icon */}

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>

                {/* Bottom Line */}

                <div className="mt-6 h-1 w-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}