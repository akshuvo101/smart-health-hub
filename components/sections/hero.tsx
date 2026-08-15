"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  HeartPulse,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Container from "@/components/layout/container";

export default function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        bg-slate-50
        pt-24
        pb-12
        sm:pt-28
        sm:pb-16
        lg:min-h-[calc(100dvh-72px)]
        lg:pt-32
        lg:pb-12
        dark:bg-slate-950
      "
    >
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {/* Main gradient */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.10),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(6,182,212,0.10),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.08),transparent_35%)]
            dark:bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.14),transparent_32%),radial-gradient(circle_at_85%_25%,rgba(6,182,212,0.13),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(20,184,166,0.08),transparent_35%)]
          "
        />

        {/* Left glow */}

        <div
          className="
            absolute
            -left-40
            top-20
            h-80
            w-80
            rounded-full
            bg-emerald-400/10
            blur-[130px]
            dark:bg-emerald-500/15
          "
        />

        {/* Right glow */}

        <div
          className="
            absolute
            -right-40
            top-32
            h-96
            w-96
            rounded-full
            bg-cyan-400/10
            blur-[140px]
            dark:bg-cyan-500/15
          "
        />

        {/* Subtle grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)]
            [background-size:48px_48px]
            dark:opacity-[0.035]
            dark:[background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
          "
        />
      </div>

      <Container>
        <div
          className="
            grid
            items-center
            gap-10
            lg:grid-cols-[0.92fr_1.08fr]
            lg:gap-14
          "
        >
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            {/* Badge */}

            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-cyan-500/20
                bg-cyan-500/5
                px-3.5
                py-2
                text-xs
                font-semibold
                text-cyan-700
                backdrop-blur-xl
                dark:text-cyan-300
                sm:text-sm
              "
            >
              <Sparkles className="h-4 w-4" />

              AI-Powered Mental Wellness
            </div>

            {/* Heading */}

            <h1
              className="
                max-w-2xl
                text-4xl
                font-extrabold
                leading-[1.06]
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-5xl
                lg:text-[58px]
              "
            >
              Understand Your

              <span
                className="
                  block
                  bg-linear-to-r
                  from-cyan-500
                  via-teal-500
                  to-emerald-500
                  bg-clip-text
                  text-transparent
                  dark:from-cyan-300
                  dark:via-teal-400
                  dark:to-emerald-400
                "
              >
                Mental Wellness.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-5
                max-w-lg
                text-sm
                leading-6
                text-slate-600
                dark:text-slate-400
                sm:text-base
              "
            >
              Take a short assessment, get AI-powered insights, and receive
              personalized guidance for a healthier mind.
            </p>

            {/* CTA */}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="
                  group
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-linear-to-r
                  from-emerald-500
                  via-teal-500
                  to-cyan-500
                  px-6
                  text-sm
                  font-bold
                  text-white
                  shadow-xl
                  shadow-emerald-500/20
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                  hover:shadow-cyan-500/20
                "
              >
                Start Assessment

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/features"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white/70
                  px-6
                  text-sm
                  font-semibold
                  text-slate-700
                  shadow-sm
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-cyan-400/40
                  hover:bg-white
                  dark:border-slate-800
                  dark:bg-slate-900/60
                  dark:text-slate-300
                  dark:hover:border-cyan-400/30
                  dark:hover:bg-slate-900
                  dark:hover:text-white
                "
              >
                Explore Platform
              </Link>
            </div>

            {/* Trust Features */}

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  sm:text-sm
                "
              >
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Private & Secure
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  sm:text-sm
                "
              >
                <Brain className="h-4 w-4 text-cyan-500" />
                AI Analysis
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-xs
                  text-slate-500
                  sm:text-sm
                "
              >
                <MessageCircleHeart className="h-4 w-4 text-teal-500" />
                AI Counselor
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT ASSESSMENT PREVIEW
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
            }}
            className="relative mx-auto w-full max-w-[590px]"
          >
            {/* Outer Glow */}

            <div
              className="
                absolute
                -inset-8
                rounded-[50px]
                bg-linear-to-r
                from-emerald-500/10
                via-cyan-500/10
                to-teal-500/10
                blur-3xl
              "
            />

            {/* Main Dashboard Card */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200
                bg-white/95
                p-4
                shadow-2xl
                shadow-slate-300/40
                backdrop-blur-2xl
                dark:border-slate-800
                dark:bg-slate-900/95
                dark:shadow-[0_30px_100px_-30px_rgba(6,182,212,0.25)]
                sm:p-5
              "
            >
              {/* Dashboard Header */}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-500/10
                    "
                  >
                    <Brain className="h-5 w-5 text-emerald-500" />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Mental Assessment
                    </p>

                    <p className="text-[10px] text-slate-500">
                      AI-generated wellness insights
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-500/10
                    bg-emerald-500/5
                    px-2.5
                    py-1.5
                  "
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />

                  <span className="text-[9px] font-bold uppercase tracking-wide text-emerald-500">
                    AI Ready
                  </span>
                </div>
              </div>

              {/* Score + Indicators */}

              <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-[1fr_1.15fr]">
                {/* Score Card */}

                <div
                  className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50/80
                    p-4
                    dark:border-slate-800
                    dark:bg-slate-950/60
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
                        Overall Score
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
                        Mental Health
                      </p>
                    </div>

                    <div
                      className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-emerald-500/10
                      "
                    >
                      <HeartPulse className="h-4 w-4 text-emerald-500" />
                    </div>
                  </div>

                  {/* Animated Score */}

                  <AnimatedScore />

                  {/* Mental State */}

                  <div
                    className="
                      mt-3
                      rounded-xl
                      bg-emerald-500/10
                      px-3
                      py-2
                      text-center
                    "
                  >
                    <p className="text-[9px] text-slate-500">
                      Mental State
                    </p>

                    <p className="mt-0.5 text-xs font-bold text-emerald-500">
                      😊 Good Wellness
                    </p>
                  </div>
                </div>

                {/* Main Indicators */}

                <div className="grid grid-cols-2 gap-2.5">
                  <MiniIndicator
                    emoji="😌"
                    title="Stress"
                    level="Low"
                  />

                  <MiniIndicator
                    emoji="😟"
                    title="Anxiety"
                    level="Low"
                  />

                  <MiniIndicator
                    emoji="🌧️"
                    title="Depression"
                    level="Very Low"
                  />

                  <MiniIndicator
                    emoji="🔥"
                    title="Burnout"
                    level="Low"
                  />
                </div>
              </div>

              {/* Secondary Indicators */}

              <div className="mt-3 grid grid-cols-2 gap-2.5 min-[500px]:grid-cols-4">
                <SmallIndicator
                  icon="🌙"
                  title="Sleep"
                  level="Good"
                />

                <SmallIndicator
                  icon="🎯"
                  title="Focus"
                  level="Good"
                />

                <SmallIndicator
                  icon="🤝"
                  title="Social"
                  level="Good"
                />

                <SmallIndicator
                  icon="💚"
                  title="Mood"
                  level="Good"
                />
              </div>

              {/* AI Counselor Feature */}

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-cyan-500/15
                  bg-linear-to-r
                  from-cyan-500/[0.04]
                  via-teal-500/[0.04]
                  to-emerald-500/[0.04]
                  px-4
                  py-3
                  dark:border-cyan-400/15
                  dark:from-cyan-500/[0.06]
                  dark:via-teal-500/[0.06]
                  dark:to-emerald-500/[0.06]
                "
              >
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-xl
                      bg-linear-to-br
                      from-cyan-500
                      to-teal-500
                      shadow-md
                      shadow-cyan-500/20
                    "
                  >
                    <MessageCircleHeart className="h-4 w-4 text-white" />
                  </div>

                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      AI Counselor
                    </p>

                    <p className="text-[9px] text-slate-500 dark:text-slate-400">
                      Personalized guidance when you need it
                    </p>
                  </div>
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-1.5
                    rounded-full
                    bg-emerald-500/10
                    px-2
                    py-1
                  "
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-[8px] font-bold text-emerald-500">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ===============================================================
   ANIMATED SCORE
================================================================ */

function AnimatedScore() {
  const [score, setScore] = useState(0);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let animationFrame: number;

    const duration = 1800;
    const target = 83;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out animation

      const eased = 1 - Math.pow(1 - progress, 3);

      const currentScore = Math.round(eased * target);

      setScore(currentScore);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const strokeDashoffset =
    circumference - (circumference * score) / 100;

  return (
    <div className="mt-3 flex justify-center">
      <div className="relative h-24 w-24">
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background Ring */}

          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Animated Progress Ring */}

          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />

          <defs>
            <linearGradient
              id="scoreGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#06b6d4"
              />

              <stop
                offset="50%"
                stopColor="#14b8a6"
              />

              <stop
                offset="100%"
                stopColor="#10b981"
              />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated Number */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
          "
        >
          <span
            className="
              text-2xl
              font-extrabold
              tabular-nums
              text-slate-900
              dark:text-white
            "
          >
            {score}
          </span>
        </div>

        {/* /100 */}

        <span
          className="
            absolute
            bottom-1.5
            left-1/2
            -translate-x-1/2
            text-[8px]
            font-medium
            text-slate-500
          "
        >
          /100
        </span>
      </div>
    </div>
  );
}

/* ===============================================================
   MINI INDICATOR
================================================================ */

function MiniIndicator({
  emoji,
  title,
  level,
}: {
  emoji: string;
  title: string;
  level: string;
}) {
  return (
    <div
      className="
        flex
        flex-col
        justify-between
        rounded-2xl
        border
        border-emerald-500/20
        bg-emerald-500/[0.035]
        p-3
      "
    >
      <div className="flex items-start justify-between">
        <span className="text-xl">
          {emoji}
        </span>

        <span
          className="
            rounded-full
            bg-emerald-500/10
            px-1.5
            py-1
            text-[7px]
            font-bold
            uppercase
            text-emerald-500
          "
        >
          {level}
        </span>
      </div>

      <div className="mt-3">
        <p className="text-[11px] font-bold text-slate-900 dark:text-white">
          {title}
        </p>

        <p className="mt-0.5 text-[8px] text-emerald-500">
          Wellness indicator
        </p>
      </div>
    </div>
  );
}

/* ===============================================================
   SMALL INDICATOR
================================================================ */

function SmallIndicator({
  icon,
  title,
  level,
}: {
  icon: string;
  title: string;
  level: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-emerald-500/15
        bg-emerald-500/[0.025]
        p-3
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-base">
          {icon}
        </span>

        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </div>

      <p className="mt-2 text-[10px] font-bold text-slate-900 dark:text-white">
        {title}
      </p>

      <p className="mt-0.5 text-[8px] font-medium text-emerald-500">
        {level}
      </p>
    </div>
  );
}