"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import {
  X,
  Menu,
  HeartPulse,
  Heart,
} from "lucide-react";

import { menuItems } from "@/config/student-menu";

export default function MobileSidebar() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Lock body scroll */

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const drawer = (
    <>
      {/* Overlay */}

      <div
        onClick={() => setOpen(false)}
        className={`
          fixed
          inset-0
          z-[90]
          bg-slate-950/60
          backdrop-blur-sm
          transition-opacity
          duration-300
          lg:hidden
          ${
            open
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          bottom-3
          left-3
          top-3
          z-[100]
          flex
          w-[280px]
          flex-col
          overflow-hidden
          rounded-[28px]
          border
          border-slate-200
          bg-white
          shadow-[0_30px_100px_rgba(0,0,0,0.25)]
          transition-transform
          duration-300
          ease-out
          lg:hidden
          dark:border-slate-800
          dark:bg-slate-950
          ${
            open
              ? "translate-x-0"
              : "-translate-x-[calc(100%+20px)]"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-slate-800">
          <Link
            href="/student/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/20">
              <HeartPulse className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                PsycoMentalHub
              </h2>

              <p className="text-[10px] text-slate-400">
                Student Portal
              </p>
            </div>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Navigation
          </p>

          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(
                  `${item.href}/`
                );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    px-4
                    py-3
                    text-sm
                    font-medium
                    transition
                    ${
                      active
                        ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20"
                        : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                    }
                  `}
                >
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                  )}

                  <Icon className="h-5 w-5 shrink-0" />

                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Wellness */}

        <div className="p-4 pt-2">
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2.5">
                <Heart className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Daily Wellness
                </h3>

                <p className="text-[10px] text-white/75">
                  Keep your wellness journey on track.
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1.5 flex justify-between text-[10px]">
                <span>Today's Progress</span>
                <span>87%</span>
              </div>

              <div className="h-1.5 rounded-full bg-white/20">
                <div className="h-full w-[87%] rounded-full bg-white" />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {/* ONLY BUTTON INSIDE HEADER */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-sm
          transition
          hover:border-emerald-300
          hover:bg-emerald-50
          hover:text-emerald-600
          active:scale-95
          lg:hidden
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-200
        "
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Drawer goes directly to BODY */}

      {mounted &&
        createPortal(drawer, document.body)}
    </>
  );
}