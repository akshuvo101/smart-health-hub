"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  HeartPulse,
  Moon,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/layout/container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />

        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-teal-500/20 blur-[120px]" />

        <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />
      </div>

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
            }}
          >
            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-400">
              <HeartPulse className="h-4 w-4" />
              AI Powered Student Wellness Platform
            </div>

            {/* Heading */}

            <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-6xl">
              Build a
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                {" "}
                Healthier,
              </span>
              <br />
              Happier Student Life.
            </h1>

            {/* Description */}

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Track mood, monitor sleep, reduce stress, access wellness
              resources, and receive personalized AI recommendations through
              one smart platform.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-7 py-4 font-semibold text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/40"
              >
                Get Started
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-emerald-500/40"
              >
                Explore Features
              </Link>
            </div>

            {/* Mini Features */}

            <div className="mt-10 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <ShieldCheck className="h-5 w-5 text-emerald-500" />
                Secure Platform
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Brain className="h-5 w-5 text-teal-500" />
                AI Insights
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Moon className="h-5 w-5 text-cyan-500" />
                Sleep Monitoring
              </div>
            </div>
          </motion.div>

          {/* Right Content */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="relative"
          >
            {/* Floating Glow */}

            <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-emerald-500/30 blur-[80px]" />

            <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-teal-500/30 blur-[80px]" />

            {/* Dashboard Card */}

            <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/70 p-6 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
              {/* Header */}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Wellness Overview
                  </h3>

                  <p className="text-sm text-slate-500">
                    Weekly Summary
                  </p>
                </div>

                <div className="rounded-2xl bg-emerald-500/10 p-3">
                  <HeartPulse className="h-6 w-6 text-emerald-500" />
                </div>
              </div>

              {/* Stats */}

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500">
                    Mood Score
                  </p>

                  <h4 className="mt-2 text-2xl font-bold text-emerald-600">
                    89%
                  </h4>
                </div>

                <div className="rounded-2xl bg-teal-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500">
                    Sleep Quality
                  </p>

                  <h4 className="mt-2 text-2xl font-bold text-teal-600">
                    7.8h
                  </h4>
                </div>

                <div className="rounded-2xl bg-cyan-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500">
                    Stress Level
                  </p>

                  <h4 className="mt-2 text-2xl font-bold text-cyan-600">
                    Low
                  </h4>
                </div>

                <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-slate-800">
                  <p className="text-sm text-slate-500">
                    Habits
                  </p>

                  <h4 className="mt-2 text-2xl font-bold text-emerald-600">
                    92%
                  </h4>
                </div>
              </div>

              {/* AI Recommendation */}

              <div className="mt-6 rounded-3xl border border-emerald-500/10 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  AI Recommendation
                </p>

                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  Your wellness trend is improving. Continue maintaining
                  healthy sleep habits and daily mindfulness activities.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}