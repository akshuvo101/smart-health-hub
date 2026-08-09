"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, HeartPulse, Lock, Mail, User } from "lucide-react";

import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { getDashboardRoute } from "@/lib/redirects";

import SocialLogin from "./social-login";
import { getUserRole } from "@/lib/get-user-role";


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
    <div className="w-full max-w-md">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/20">
        {/* Logo */}

        <Link href="/" className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30">
            <HeartPulse className="h-6 w-6 text-white" />
          </div>

          <div>
            <h2 className="font-bold text-slate-900 dark:text-white">
              Smart HealthHub
            </h2>

            <p className="text-xs text-slate-500">AI Wellness Platform</p>
          </div>
        </Link>

        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {isLogin ? "Welcome Back 👋" : "Create Account"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isLogin
              ? "Sign in to continue your wellness journey."
              : "Join Smart HealthHub and start improving your wellness today."}
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900"
                />
              </div>
            </div>
          )}

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900"
              />
            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-12 outline-none transition-all focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          {!isLogin && (
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Confirm Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 outline-none transition-all focus:border-emerald-500 dark:border-slate-800 dark:bg-slate-900"
                />
              </div>
            </div>
          )}

          {/* Login Extras */}

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <input type="checkbox" className="rounded" />
                Remember Me
              </label>

              <Link
                href="/forgot-password"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
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
              hover:shadow-xl
              hover:shadow-emerald-500/30
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading
              ? "Please wait..."
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        {/* Social Login */}

        <div className="mt-8">
          <SocialLogin />
        </div>

        {/* Footer */}

        <div className="mt-8 text-center text-sm text-slate-500">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-emerald-600 hover:text-emerald-500"
              >
                Create Account
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-500"
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
