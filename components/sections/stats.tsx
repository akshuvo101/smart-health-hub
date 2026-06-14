"use client";

import { motion } from "framer-motion";

import Container from "@/components/layout/container";

const stats = [
  {
    value: "10K+",
    label: "Wellness Logs",
  },
  {
    value: "95%",
    label: "Student Satisfaction",
  },
  {
    value: "24/7",
    label: "AI Wellness Support",
  },
  {
    value: "500+",
    label: "Assessments Completed",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
      </div>

      <Container>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
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
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
            Trusted Student Wellness Platform
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Supporting Student Wellness
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Every Day
            </span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
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
              className="group rounded-3xl border border-slate-200/60 bg-white/80 p-8 text-center shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none"
            >
              <h3 className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-5xl font-extrabold text-transparent">
                {stat.value}
              </h3>

              <p className="mt-4 text-sm font-medium tracking-wide text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}