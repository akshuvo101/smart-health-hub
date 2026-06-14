"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

import Container from "@/components/layout/container";

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Computer Science Student",
    content:
      "Smart HealthHub helped me better understand my stress patterns and improve my daily wellness routine.",
  },
  {
    name: "Jamil Hasan",
    role: "Business Administration Student",
    content:
      "The AI recommendations and wellness tracking features make self-care much easier and more organized.",
  },
  {
    name: "Nusrat Jahan",
    role: "Engineering Student",
    content:
      "The platform encouraged me to monitor my sleep habits and maintain a healthier lifestyle.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Container>
        {/* Header */}

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
            Student Experiences
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            What Students
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Are Saying
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Helping students improve their wellness journey through technology
            and personalized guidance.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
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
              className="group rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/10 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="mb-5 flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-emerald-500 text-emerald-500"
                  />
                ))}
              </div>

              <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                "{item.content}"
              </p>

              <div className="mt-8">
                <h4 className="font-bold text-slate-900 dark:text-white">
                  {item.name}
                </h4>

                <p className="text-sm text-slate-500">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}