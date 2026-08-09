import Link from "next/link";
import {
  HeartPulse,
  Mail,
  Phone,
  MapPin,
  
} from "lucide-react";

import Container from "./container";
import { GiThunderBlade } from "react-icons/gi";
import { LiaLinkedin } from "react-icons/lia";
import { BsTwitter } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px]" />

        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}

          <div>
            <Link
              href="/"
              className="group flex items-center gap-3"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
                <HeartPulse className="h-6 w-6 text-white" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  PsycoMentalHub
                </h3>

                <p className="text-xs text-slate-500">
                  AI Wellness Platform
                </p>
              </div>
            </Link>

            <p className="mt-5 leading-relaxed text-slate-600 dark:text-slate-400">
              Empowering students with AI-powered wellness tools,
              personalized insights, and accessible mental health
              support.
            </p>

            {/* Social Links */}

            <div className="mt-6 flex items-center gap-3">
              <Link
                href="#"
                className="rounded-xl border border-slate-200 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                <GiThunderBlade className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-slate-200 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                <LiaLinkedin className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-slate-200 p-3 transition-all hover:border-emerald-300 hover:bg-emerald-50 dark:border-slate-800 dark:hover:bg-slate-900"
              >
                <BsTwitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}

          <div>
            <h4 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
              Platform
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400"
                >
                  Features
                </Link>
              </li>

              <li>
                <Link
                  href="/student/dashboard"
                  className="text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/resources"
                  className="text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400"
                >
                  Resources
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}

          <div>
            <h4 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
              Features
            </h4>

            <ul className="space-y-3">
              <li className="text-slate-600 dark:text-slate-400">
                Mood Tracking
              </li>

              <li className="text-slate-600 dark:text-slate-400">
                Sleep Monitoring
              </li>

              <li className="text-slate-600 dark:text-slate-400">
                AI Recommendations
              </li>

              <li className="text-slate-600 dark:text-slate-400">
                Wellness Reports
              </li>

              <li className="text-slate-600 dark:text-slate-400">
                Appointment Booking
              </li>
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h4 className="mb-5 text-lg font-semibold text-slate-900 dark:text-white">
              Contact
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5 text-emerald-500" />

                <span className="text-slate-600 dark:text-slate-400">
                  support@smarthealthhub.com
                </span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5 text-emerald-500" />

                <span className="text-slate-600 dark:text-slate-400">
                  +880 1234 567890
                </span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 text-emerald-500" />

                <span className="text-slate-600 dark:text-slate-400">
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="border-t border-slate-200 py-6 dark:border-slate-800">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
            <p className="text-sm text-slate-500">
              © 2026 Smart HealthHub. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/privacy">Privacy Policy</Link>

              <Link href="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}