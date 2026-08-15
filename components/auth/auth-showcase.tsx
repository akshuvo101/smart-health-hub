"use client";

import { motion } from "framer-motion";
import {
  Brain,
  HeartPulse,
  Moon,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function AuthShowcase() {
  return (
    <div className="relative hidden min-h-screen overflow-hidden lg:flex lg:w-[52%] xl:w-[55%]">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-700" />

      {/* Ambient Glow */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/20 blur-[100px]" />
      <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-emerald-300/20 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[100px]" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur-xl">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="text-sm font-bold tracking-wide text-white">
              PsychoMentalHub
            </p>
            <p className="text-xs text-white/60">AI Wellness Platform</p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-xl">
              <Sparkles className="h-3.5 w-3.5 text-cyan-100" />

              <span className="text-xs font-medium text-white/90">
                AI-Powered Student Wellness
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-5xl">
              Your Mind.
              <br />
              Your Wellness.
              <br />
              <span className="text-cyan-100">Smarter.</span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/75 xl:text-base">
              Understand your mental wellness, build healthier habits, and get
              personalized AI-powered guidance — all in one place.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {/* Mood */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <HeartPulse className="h-4 w-4 text-white" />
              </div>

              <p className="text-sm font-semibold text-white">Mood</p>
              <p className="mt-1 text-[11px] leading-4 text-white/60">
                Track emotions
              </p>
            </div>

            {/* Sleep */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Moon className="h-4 w-4 text-white" />
              </div>

              <p className="text-sm font-semibold text-white">Sleep</p>
              <p className="mt-1 text-[11px] leading-4 text-white/60">
                Build better habits
              </p>
            </div>

            {/* AI */}
            <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/15">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
                <Brain className="h-4 w-4 text-white" />
              </div>

              <p className="text-sm font-semibold text-white">AI Insights</p>
              <p className="mt-1 text-[11px] leading-4 text-white/60">
                Personal guidance
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex items-center justify-between border-t border-white/10 pt-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>

            <div>
              <p className="text-xs font-medium text-white">
                Private & Secure
              </p>
              <p className="text-[10px] text-white/50">
                Your wellness data stays protected
              </p>
            </div>
          </div>

          <div className="hidden text-right xl:block">
            <p className="text-xs font-semibold text-white">24/7 AI Support</p>
            <p className="text-[10px] text-white/50">
              Always here when you need it
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}