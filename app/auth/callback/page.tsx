"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";
import { getUserRole } from "@/lib/get-user-role";
import { getDashboardRoute } from "@/lib/redirects";

export default function AuthCallbackPage() {
  const router = useRouter();

  const [status, setStatus] = useState(
    "Signing you in..."
  );

  useEffect(() => {
  const supabase = createClient();

  let subscription:
    | { unsubscribe: () => void }
    | undefined;

  async function redirectUser() {
    const role = await getUserRole();

    router.replace(
      getDashboardRoute(role || "student")
    );
  }

  async function handleAuth() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      setStatus(
        "Unable to read session after redirect."
      );
      return;
    }

    if (session) {
      await redirectUser();
      return;
    }

    setStatus(
      "Waiting for authentication to complete..."
    );

    const { data } =
      supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session) {
            await redirectUser();
          }
        }
      );

    subscription = data.subscription;
  }

  handleAuth();

  return () => {
    subscription?.unsubscribe();
  };
}, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-xl dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
          Signing you in...
        </h1>

        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          {status}
        </p>

        <div className="mt-6 rounded-2xl bg-slate-100 p-4 text-sm text-slate-700 dark:bg-slate-950 dark:text-slate-300">
          If you are not redirected automatically,
          refresh the page or return to{" "}
          <a
            href="/login"
            className="font-medium text-emerald-600 hover:underline"
          >
            login
          </a>
          .
        </div>
      </div>
    </div>
  );
}