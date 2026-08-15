"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  HeartPulse,
  Lock,
  Mail,
  User,
} from "lucide-react";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { getDashboardRoute } from "@/lib/redirects";
import { getUserRole } from "@/lib/get-user-role";

import SocialLogin from "./social-login";

interface AuthCardProps {
  type: "login" | "register";
}

export default function AuthCard({ type }: AuthCardProps) {
  const supabase = createClient();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isLogin = type === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!isLogin) {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: "student",
            },
          },
        });

        if (error) {
          throw error;
        }

        toast.success(
          "Account created successfully. Please verify your email.",
        );

        router.push("/login");
        return;
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Login successful");

      const role = await getUserRole();

      router.push(getDashboardRoute(role || "student"));
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[440px]">
      <div
        className="
          rounded-3xl
          border border-slate-200/80
          bg-white/95
          p-5
          shadow-[0_20px_60px_-20px_rgba(15,23,42,0.18)]
          backdrop-blur-xl
          sm:p-7
          lg:rounded-[30px]
          lg:p-8
          dark:border-slate-800
          dark:bg-slate-950/95
          dark:shadow-black/30
        "
      >
        {/* Brand */}

        <Link
          href="/"
          className="mb-5 flex items-center gap-3 sm:mb-6"
        >
          <div
            className="
              flex h-10 w-10 shrink-0 items-center justify-center
              rounded-xl
              bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500
              shadow-lg shadow-emerald-500/20
              sm:h-11 sm:w-11
              sm:rounded-2xl
            "
          >
            <HeartPulse className="h-5 w-5 text-white sm:h-5.5 sm:w-5.5" />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold tracking-tight text-slate-900 sm:text-base dark:text-white">
              PsychoMentalHub
            </h2>

            <p className="text-[10px] text-slate-500 sm:text-xs dark:text-slate-400">
              AI Wellness Platform
            </p>
          </div>
        </Link>

        {/* Heading */}

        <div className="mb-5 sm:mb-6">
          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-950
              sm:text-3xl
              dark:text-white
            "
          >
            {isLogin ? "Welcome back 👋" : "Create your account"}
          </h1>

          <p className="mt-1.5 max-w-sm text-xs leading-5 text-slate-500 sm:text-sm dark:text-slate-400">
            {isLogin
              ? "Sign in to continue your wellness journey."
              : "Start your personalized wellness journey with Smart HealthHub."}
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          {/* Full Name */}

          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm dark:text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <User
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border border-slate-200
                    bg-slate-50/70
                    pl-10 pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    focus:border-emerald-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                    sm:h-12
                    sm:rounded-2xl
                    dark:border-slate-800
                    dark:bg-slate-900/70
                    dark:text-white
                    dark:focus:bg-slate-900
                  "
                />
              </div>
            </div>
          )}

          {/* Email */}

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm dark:text-slate-300">
              Email Address
            </label>

            <div className="relative">
              <Mail
                className="
                  absolute left-3.5 top-1/2
                  h-4 w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  h-11
                  w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50/70
                  pl-10 pr-4
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  focus:border-emerald-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-emerald-500/10
                  sm:h-12
                  sm:rounded-2xl
                  dark:border-slate-800
                  dark:bg-slate-900/70
                  dark:text-white
                  dark:focus:bg-slate-900
                "
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700 sm:text-sm dark:text-slate-300">
                Password
              </label>

              {isLogin && (
                <Link
                  href="/forgot-password"
                  className="
                    text-[11px]
                    font-semibold
                    text-emerald-600
                    transition-colors
                    hover:text-emerald-500
                    sm:text-xs
                  "
                >
                  Forgot password?
                </Link>
              )}
            </div>

            <div className="relative">
              <Lock
                className="
                  absolute left-3.5 top-1/2
                  h-4 w-4
                  -translate-y-1/2
                  text-slate-400
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  h-11
                  w-full
                  rounded-xl
                  border border-slate-200
                  bg-slate-50/70
                  pl-10 pr-11
                  text-sm
                  text-slate-900
                  outline-none
                  transition-all
                  placeholder:text-slate-400
                  focus:border-emerald-400
                  focus:bg-white
                  focus:ring-4
                  focus:ring-emerald-500/10
                  sm:h-12
                  sm:rounded-2xl
                  dark:border-slate-800
                  dark:bg-slate-900/70
                  dark:text-white
                  dark:focus:bg-slate-900
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="
                  absolute right-3.5 top-1/2
                  -translate-y-1/2
                  text-slate-400
                  transition-colors
                  hover:text-slate-600
                  dark:hover:text-slate-200
                "
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          {!isLogin && (
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-700 sm:text-sm dark:text-slate-300">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  className="
                    absolute left-3.5 top-1/2
                    h-4 w-4
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border border-slate-200
                    bg-slate-50/70
                    pl-10 pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    focus:border-emerald-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-emerald-500/10
                    sm:h-12
                    sm:rounded-2xl
                    dark:border-slate-800
                    dark:bg-slate-900/70
                    dark:text-white
                    dark:focus:bg-slate-900
                  "
                />
              </div>
            </div>
          )}

          {/* Remember Me */}

          {isLogin && (
            <label className="flex cursor-pointer items-center gap-2 pt-0.5 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
              <input
                type="checkbox"
                className="
                  h-3.5
                  w-3.5
                  rounded
                  border-slate-300
                  accent-emerald-500
                  sm:h-4
                  sm:w-4
                "
              />

              <span>Remember me</span>
            </label>
          )}

          {/* Submit Button */}

          <button
            type="submit"
            disabled={loading}
            className="
              group
              relative
              h-11
              w-full
              overflow-hidden
              rounded-xl
              bg-linear-to-r
              from-emerald-500
              via-teal-500
              to-cyan-500
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-emerald-500/20
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              hover:shadow-emerald-500/25
              active:translate-y-0
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:h-12
              sm:rounded-2xl
            "
          >
            <span className="relative z-10">
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Sign In"
                  : "Create Account"}
            </span>

            <div
              className="
                absolute inset-0
                -translate-x-full
                bg-linear-to-r
                from-transparent
                via-white/20
                to-transparent
                transition-transform
                duration-700
                group-hover:translate-x-full
              "
            />
          </button>
        </form>

        {/* Social Login */}

        <div className="mt-5 sm:mt-6">
          <SocialLogin />
        </div>

        {/* Footer */}

        <div className="mt-5 text-center text-xs text-slate-500 sm:mt-6 sm:text-sm dark:text-slate-400">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="
                  font-semibold
                  text-emerald-600
                  transition-colors
                  hover:text-emerald-500
                "
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/login"
                className="
                  font-semibold
                  text-emerald-600
                  transition-colors
                  hover:text-emerald-500
                "
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}