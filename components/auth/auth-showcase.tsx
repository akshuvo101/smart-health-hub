"use client";

import { motion } from "framer-motion";
import {
  Brain,
  HeartPulse,
  Moon,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:flex-1">
      {/* Background */}

      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600" />

      {/* Glow Effects */}

      <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

      {/* Grid */}

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex w-full flex-col justify-between p-12 text-white">
        {/* Top */}

        <div>
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />

              <span className="text-sm font-medium">
                AI Powered Wellness Platform
              </span>
            </div>

            <h1 className="mt-8 max-w-xl text-5xl font-bold leading-tight">
              Transform Student Wellness With AI
            </h1>

            <p className="mt-6 max-w-lg text-lg text-white/85">
              Smart HealthHub helps students monitor mood,
              sleep, habits, stress, and wellness progress
              through intelligent insights and personalized
              recommendations.
            </p>
          </motion.div>
        </div>

        {/* Floating Cards */}

        <div className="grid gap-5">
          {/* Card 1 */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <HeartPulse className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-semibold">
                Mood Tracking
              </h3>

              <p className="text-sm text-white/75">
                Monitor emotional well-being daily.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Moon className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-semibold">
                Sleep Analytics
              </h3>

              <p className="text-sm text-white/75">
                Improve sleep quality with smart reports.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-4 rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Brain className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-semibold">
                AI Insights
              </h3>

              <p className="text-sm text-white/75">
                Personalized wellness recommendations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <TrendingUp className="mb-3 h-6 w-6" />

            <h3 className="text-3xl font-bold">
              94%
            </h3>

            <p className="text-sm text-white/70">
              Wellness Improvement
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <ShieldCheck className="mb-3 h-6 w-6" />

            <h3 className="text-3xl font-bold">
              100%
            </h3>

            <p className="text-sm text-white/70">
              Secure Platform
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-xl">
            <Sparkles className="mb-3 h-6 w-6" />

            <h3 className="text-3xl font-bold">
              AI
            </h3>

            <p className="text-sm text-white/70">
              Smart Assistance
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}