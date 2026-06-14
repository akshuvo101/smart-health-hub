import Image from "next/image";

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  ShieldAlert,
  MessageSquare,
  Building2,
  HelpCircle,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer:
        "Students can schedule appointments directly through their dashboard.",
    },
    {
      question: "Is my wellness data secure?",
      answer:
        "Yes. Smart HealthHub uses secure authentication and privacy-focused data handling.",
    },
    {
      question: "Can universities partner with Smart HealthHub?",
      answer:
        "Absolutely. We provide institutional onboarding and wellness management solutions.",
    },
    {
      question: "Does Smart HealthHub provide emergency services?",
      answer:
        "No. We are not an emergency healthcare provider. Please contact local emergency services if immediate assistance is required.",
    },
  ];

  return (
    <main className="bg-white dark:bg-slate-950">
      {/* Hero */}

      {/* <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-blue-500/10" />

        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-600">
                Contact Smart HealthHub
              </span>

              <h1 className="mt-6 text-5xl font-bold text-slate-900 dark:text-white lg:text-6xl">
                We're Here To Help
              </h1>

              <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
                Have questions about wellness tracking, appointments,
                AI-powered guidance, or platform access? Our team is
                ready to assist students, counselors, healthcare
                professionals, and institutions.
              </p>
            </div>

            <div>
              <Image
                src="/images/contact-hero.jpg"
                alt="Contact Smart HealthHub"
                width={700}
                height={500}
                className="rounded-[32px] object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section> */}

      <section className="relative overflow-hidden">
        {/* Background Image */}

        <div className="absolute inset-0">
          <Image
            src="/images/contact-hero.jpg"
            alt="Smart HealthHub Contact"
            fill
            priority
            className="object-cover"
          />

          {/* Dark Overlay */}

          <div className="absolute inset-0 bg-slate-950/70" />

          {/* Gradient Overlay */}

          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/60 via-slate-950/70 to-cyan-900/60" />
        </div>

        {/* Content */}

        <div className="relative container mx-auto px-6 py-28 lg:py-40">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              Contact Smart HealthHub
            </span>

            <h1 className="mt-6 text-5xl font-bold text-white lg:text-7xl">
              We're Here To Help
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-slate-200 lg:text-xl">
              Whether you're a student seeking wellness support, a counselor
              managing appointments, or an institution exploring partnerships,
              our team is ready to assist you.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur-md">
                📧 support@smarthealthhub.com
              </div>

              <div className="rounded-2xl bg-white/10 px-5 py-3 text-white backdrop-blur-md">
                📞 +1 (800) 123-4567
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
              <Mail className="mb-4 h-10 w-10 text-emerald-500" />

              <h3 className="font-semibold">Email</h3>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                support@smarthealthhub.com
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
              <Phone className="mb-4 h-10 w-10 text-cyan-500" />

              <h3 className="font-semibold">Phone</h3>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                +1 (800) 123-4567
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
              <MapPin className="mb-4 h-10 w-10 text-blue-500" />

              <h3 className="font-semibold">Location</h3>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Wellness Innovation Center
                <br />
                New York, USA
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
              <Clock className="mb-4 h-10 w-10 text-purple-500" />

              <h3 className="font-semibold">Office Hours</h3>

              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Mon - Fri
                <br />
                9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + Support */}

      <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-2">
            {/* Form */}

            <div className="rounded-[32px] bg-white p-8 shadow-xl dark:bg-slate-950">
              <h2 className="text-3xl font-bold">Send Us A Message</h2>

              <form className="mt-8 space-y-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                />

                <textarea
                  rows={5}
                  placeholder="How can we help you?"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
                />

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3 font-semibold text-white"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Support */}

            <div>
              <h2 className="text-3xl font-bold">Support Categories</h2>

              <div className="mt-8 space-y-4">
                {[
                  "General Support",
                  "Technical Assistance",
                  "Student Wellness Help",
                  "Counselor Support",
                  "Partnership Requests",
                  "Privacy & Security Questions",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 dark:border-slate-800"
                  >
                    <MessageSquare className="h-5 w-5 text-emerald-500" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-3xl border border-slate-200 p-6 dark:border-slate-800">
                <Building2 className="mb-4 h-10 w-10 text-cyan-500" />

                <h3 className="text-xl font-semibold">
                  Institutional Partnerships
                </h3>

                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  We work with educational institutions to create healthier
                  student communities through AI-powered wellness solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="rounded-[32px] border border-red-200 bg-red-50 p-8 dark:border-red-500/20 dark:bg-red-500/5">
            <div className="flex gap-4">
              <ShieldAlert className="h-10 w-10 text-red-500" />

              <div>
                <h2 className="text-2xl font-bold text-red-600">
                  Emergency Notice
                </h2>

                <p className="mt-3 text-slate-700 dark:text-slate-300">
                  Smart HealthHub is not an emergency healthcare provider. If
                  you are experiencing a medical or mental health emergency,
                  contact your local emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="py-20 bg-slate-50 dark:bg-slate-900/40">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <HelpCircle className="mx-auto h-12 w-12 text-emerald-500" />

            <h2 className="mt-4 text-4xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-4xl space-y-5">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-3xl border border-slate-200 p-6 dark:border-slate-800"
              >
                <h3 className="font-semibold">{faq.question}</h3>

                <p className="mt-3 text-slate-600 dark:text-slate-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
