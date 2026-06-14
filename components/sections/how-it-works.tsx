"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  MoonStar,
  ClipboardCheck,
  Brain,
  TrendingUp,
} from "lucide-react";

import Container from "@/components/layout/container";

const steps = [
  {
    number: "01",
    title: "Track Your Mood",
    description:
      "Log your daily emotions and understand patterns affecting your mental well-being.",
    icon: HeartPulse,
  },
  {
    number: "02",
    title: "Monitor Sleep",
    description:
      "Record sleep quality and duration to build healthier sleeping habits.",
    icon: MoonStar,
  },
  {
    number: "03",
    title: "Complete Assessments",
    description:
      "Take guided wellness assessments to evaluate stress and overall wellness.",
    icon: ClipboardCheck,
  },
  {
    number: "04",
    title: "Receive AI Insights",
    description:
      "Get personalized wellness recommendations powered by intelligent analysis.",
    icon: Brain,
  },
  {
    number: "05",
    title: "Improve Your Lifestyle",
    description:
      "Follow recommendations, monitor progress, and build healthy daily habits.",
    icon: TrendingUp,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden py-24"
    >
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      <Container>
        {/* Section Header */}

        <motion.div
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
            duration: 0.6,
          }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
            Simple Wellness Journey
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            How
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Smart HealthHub
            </span>
            Works
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            A simple step-by-step process that helps students monitor,
            understand, and improve their mental and physical well-being.
          </p>
        </motion.div>

        {/* Timeline */}

        <div className="relative mt-20">
          {/* Center Line */}

          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-teal-500 to-cyan-500 lg:block" />

          <div className="space-y-10">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
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
                    delay: index * 0.1,
                  }}
                  className={`flex items-center ${
                    index % 2 === 0
                      ? "lg:flex-row"
                      : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}

                  <div className="w-full lg:w-1/2">
                    <div className="group rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/70">
                      <div className="mb-6 flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30">
                          <Icon className="h-8 w-8 text-white" />
                        </div>

                        <div>
                          <span className="text-sm font-semibold text-emerald-600">
                            STEP {step.number}
                          </span>

                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}

                  <div className="relative hidden lg:flex lg:w-20 lg:justify-center">
                    <div className="z-10 h-6 w-6 rounded-full border-4 border-white bg-emerald-500 shadow-lg dark:border-slate-950" />
                  </div>

                  {/* Spacer */}

                  <div className="hidden lg:block lg:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}