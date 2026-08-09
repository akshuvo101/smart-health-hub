"use client";

import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  Clock3,
  ShieldCheck,
  Brain,
} from "lucide-react";

import Card from "@/components/ui/card";
import LoadingBrain from "../assessment/loading/Loading-brain";
// import LoadingBrain from "@/components/assessment/loading/LoadingBrain";

export default function MentalCheckCard() {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-[#071A1D] via-[#0B2C33] to-[#123F48] p-0 text-white shadow-2xl">
      {/* Background Glow */}

      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      {/* Content */}

      <div className="relative grid items-center gap-8 px-8 py-8 lg:grid-cols-2 lg:px-12">
        {/* LEFT */}

        <div>
          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
            <Sparkles className="h-4 w-4" />

            AI Mental Wellness
          </div>

          {/* Title */}

          <h2 className="mt-6 text-3xl font-bold leading-tight lg:text-5xl">
            How are you
            <br />
            feeling today?
          </h2>

          {/* Description */}

          <p className="mt-5 max-w-md text-base text-white/85">
            Get personalized mental health insights with our
            AI-powered assessment in less than 2 minutes.
          </p>

          {/* Quick Features */}

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
              <Clock3 className="h-4 w-4" />
              2 min
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
              <ShieldCheck className="h-4 w-4" />
              Private
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur-xl">
              <Brain className="h-4 w-4" />
              AI Powered
            </div>
          </div>

          {/* CTA */}

          <Link
            href="/student/assessment/questions"
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-white
              px-7
              py-4
              font-semibold
              text-indigo-700
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-105
              hover:shadow-2xl
            "
          >
            Start Assessment

            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* RIGHT */}

        <div className="relative flex items-center justify-center">
          {/* Glow */}

          <div className="absolute h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

          {/* Brain */}

          <div className="relative">
            <LoadingBrain progress={0} />
          </div>
        </div>
      </div>
    </Card>
  );
}