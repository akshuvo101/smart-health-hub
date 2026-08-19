"use client";

import { FcGoogle } from "react-icons/fc";
import { createClient } from "@/lib/supabase/client";

export default function SocialLogin() {
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
        }
      },
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Divider */}

      <div className="relative flex items-center">
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />

        <span className="px-3 text-[10px] font-medium uppercase tracking-wider text-slate-400 sm:text-xs">
          Or continue with
        </span>

        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Google Button */}

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="
          group
          flex
          h-11
          w-full
          items-center
          justify-center
          gap-2.5
          rounded-xl
          border
          border-slate-200
          bg-white
          px-4
          text-sm
          font-semibold
          text-slate-700
          shadow-sm
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:border-slate-300
          hover:bg-slate-50
          hover:shadow-md
          active:translate-y-0
          sm:h-12
          sm:rounded-2xl
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-200
          dark:hover:border-slate-700
          dark:hover:bg-slate-800
        "
      >
        <span
          className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-white
            shadow-sm
            transition-transform
            duration-300
            group-hover:scale-110
          "
        >
          <FcGoogle className="h-4 w-4" />
        </span>

        <span>Continue with Google</span>
      </button>

      {/* Security Note */}

      <p className="text-center text-[10px] leading-4 text-slate-400 sm:text-[11px] dark:text-slate-500">
        Secure sign-in powered by Google OAuth
      </p>
    </div>
  );
}