"use client";

import { FcGoogle } from "react-icons/fc";

import { supabase } from "@/lib/supabase/client";

export default function SocialLogin() {
  const handleGoogleLogin = async () => {
    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo:
            `${window.location.origin}/auth/callback`,
        },
      });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-5">
      {/* Divider */}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-sm text-slate-500 dark:bg-slate-950 dark:text-slate-400">
            Or continue with
          </span>
        </div>
      </div>

      {/* Google Button */}

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="
          group
          flex
          w-full
          items-center
          justify-center
          gap-3
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-4
          py-3.5
          text-sm
          font-medium
          text-slate-700
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-emerald-300
          hover:shadow-lg
          hover:shadow-emerald-500/10
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-200
        "
      >
        <FcGoogle className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />

        <span>Continue with Google</span>
      </button>

      {/* Security Text */}

      <p className="text-center text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        Secure authentication powered by Google OAuth.
        Your credentials are never stored in Smart HealthHub.
      </p>
    </div>
  );
}