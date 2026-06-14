import Link from "next/link";

import {
  ArrowLeft,
  HeartPulse,
  Mail,
} from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
          {/* Logo */}

          <Link
            href="/"
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>

            <div>
              <h2 className="font-bold">
                Smart HealthHub
              </h2>

              <p className="text-xs text-slate-500">
                AI Wellness Platform
              </p>
            </div>
          </Link>

          {/* Heading */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Enter your email address and we'll send you
              instructions to reset your password.
            </p>
          </div>

          {/* Form */}

          <form className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    py-3
                    pl-12
                    pr-4
                    outline-none
                    transition-all
                    focus:border-emerald-500
                    dark:border-slate-800
                    dark:bg-slate-900
                  "
                />
              </div>
            </div>

            <button
              type="submit"
              className="
                w-full
                rounded-2xl
                bg-gradient-to-r
                from-emerald-500
                via-teal-500
                to-cyan-500
                py-3.5
                font-semibold
                text-white
                shadow-lg
                shadow-emerald-500/25
                transition-all
                duration-300
                hover:-translate-y-1
              "
            >
              Send Reset Link
            </button>
          </form>

          {/* Back */}

          <Link
            href="/login"
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-sm
              font-medium
              text-slate-500
              transition-colors
              hover:text-emerald-600
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}