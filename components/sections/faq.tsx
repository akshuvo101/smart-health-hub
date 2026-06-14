"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import Container from "@/components/layout/container";

const faqs = [
  {
    question: "What is Smart HealthHub?",
    answer:
      "Smart HealthHub is an AI-powered student wellness platform designed to help students monitor mood, sleep, stress, and daily wellness activities while receiving personalized wellness recommendations.",
  },
  {
    question: "How does the AI recommendation system work?",
    answer:
      "The platform analyzes wellness data such as mood logs, sleep patterns, and wellness assessments to generate personalized wellness suggestions and healthy lifestyle recommendations.",
  },
  {
    question: "Is my personal wellness data secure?",
    answer:
      "Yes. Smart HealthHub follows secure authentication and data management practices to protect user information and maintain privacy.",
  },
  {
    question: "Can I book counselor appointments through the platform?",
    answer:
      "Yes. Students can schedule wellness and counseling appointments directly from the appointment management system.",
  },
  {
    question: "Does the platform support anonymous discussions?",
    answer:
      "Yes. Students can participate in anonymous peer-support discussions while maintaining privacy and confidentiality.",
  },
  {
    question: "Can I track my wellness progress over time?",
    answer:
      "Absolutely. The platform provides wellness analytics, reports, and visual dashboards to help students monitor their improvement.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="relative py-24">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute right-0 bottom-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Container>
        {/* Header */}

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
          className="mx-auto max-w-3xl text-center"
        >
          <div className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
            Frequently Asked Questions
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white md:text-5xl">
            Got Questions?
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              We've Answers
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Everything you need to know about Smart HealthHub and how it helps
            students maintain better mental and physical wellness.
          </p>
        </motion.div>

        {/* FAQ Items */}

        <div className="mx-auto mt-16 max-w-4xl space-y-5">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <motion.div
                key={faq.question}
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
                  delay: index * 0.05,
                }}
                className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 shadow-lg shadow-slate-200/30 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/70"
              >
                <button
                  onClick={() =>
                    setActive(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-6 py-6 text-left"
                >
                  <span className="text-lg font-semibold text-slate-900 dark:text-white">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <div className="px-6 pb-6 text-slate-600 dark:text-slate-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}