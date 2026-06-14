"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import Container from "@/components/layout/container";

export default function CTA() {
  return (
    <section className="relative py-24">
      <Container>
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
          className="relative overflow-hidden rounded-[40px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-8 py-16 text-center shadow-2xl shadow-emerald-500/20 md:px-16"
        >
          {/* Glow Effects */}

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          {/* Content */}

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Start Your Wellness Journey Today
            </div>

            <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
              Build Better Habits,
              <br />
              Live Healthier Every Day
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              Track mood, monitor sleep, complete wellness assessments,
              receive AI-powered recommendations, and take control of
              your mental and physical well-being.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 font-semibold text-emerald-600 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Get Started Free

                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Learn More
              </Link>
            </div>

            {/* Small Stats */}

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div>
                <h3 className="text-3xl font-bold text-white">
                  10K+
                </h3>

                <p className="text-white/80">
                  Wellness Logs
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  95%
                </h3>

                <p className="text-white/80">
                  Student Satisfaction
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white">
                  24/7
                </h3>

                <p className="text-white/80">
                  AI Support
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}