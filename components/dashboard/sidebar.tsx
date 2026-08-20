"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import {
  ChevronLeft,
  ChevronRight,
  Heart,
  HeartPulse,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import { menuItems } from "@/config/student-menu";
import { useStudentSidebar } from "./student-sidebar-context";

export default function Sidebar() {
  const pathname = usePathname();
  const [hasNewCounselorMessage, setHasNewCounselorMessage] =
    useState(false);

  useEffect(() => {
    const loadNewCounselorStatus =
      async () => {
        try {
          const response =
            await fetch(
              "/api/chat/conversations",
              {
                cache: "no-store",
              }
            );

          if (!response.ok) {
            return;
          }

          const result =
            await response.json();

          const conversations =
            result.data ?? [];

          const hasNew =
            conversations.some(
              (conversation: {
                is_new?: boolean;
                assessment_id?: string | null;
              }) =>
                conversation.is_new === true &&
                conversation.assessment_id !== null
            );

          setHasNewCounselorMessage(
            hasNew
          );
        } catch (error) {
          console.error(
            "Failed to load counselor notification:",
            error
          );
        }
      };

    loadNewCounselorStatus();
  }, [pathname]);

  const {
    collapsed,
    toggleSidebar,
  } = useStudentSidebar();

  return (
    <aside
      className={clsx(
        `
          fixed
          left-4
          top-4
          bottom-4
          z-50
          hidden
          flex-col
          rounded-[28px]
          border
          border-slate-200/70
          bg-white/90
          shadow-[0_20px_60px_rgba(15,23,42,0.08)]
          backdrop-blur-2xl
          transition-all
          duration-300
          ease-in-out
          lg:flex
          dark:border-slate-800/80
          dark:bg-slate-950/90
          dark:shadow-black/30
        `,
        collapsed
          ? "w-[76px]"
          : "w-[256px]"
      )}
    >
      {/* =====================================
          HEADER
      ====================================== */}

      <div
        className={clsx(
          "flex items-center border-b border-slate-200/70 dark:border-slate-800/70",
          collapsed
            ? "justify-center px-3 py-5"
            : "justify-between px-4 py-4"
        )}
      >
        <Link
          href="/student/dashboard"
          className={clsx(
            "flex items-center",
            collapsed
              ? "justify-center"
              : "gap-3"
          )}
        >
          {/* Logo */}

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-emerald-500
              via-teal-500
              to-cyan-500
              shadow-lg
              shadow-emerald-500/20
            "
          >
            <HeartPulse className="h-5 w-5 text-white" />
          </div>

          {/* Brand */}

          {!collapsed && (
            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                PsycoMentalHub
              </h2>

              <p className="text-[10px] text-slate-400">
                Student Portal
              </p>
            </div>
          )}
        </Link>

        {/* Collapse Button */}

        {!collapsed && (
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Collapse sidebar"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              border-slate-200
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-900
              dark:border-slate-800
              dark:hover:bg-slate-900
              dark:hover:text-white
            "
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* =====================================
          COLLAPSED EXPAND BUTTON
      ====================================== */}

      {collapsed && (
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Expand sidebar"
          className="
            absolute
            -right-3
            top-12
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-md
            transition
            hover:scale-105
            hover:text-slate-900
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
          "
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}

      {/* =====================================
          NAVIGATION
      ====================================== */}

      <div className="flex-1 overflow-y-auto p-3">
        {!collapsed && (
          <p className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Navigation
          </p>
        )}

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(
                `${item.href}/`
              );

            return (
              <div
                key={item.href}
                className="group relative"
              >
                <Link
                  href={item.href}
                  className={clsx(
                    `
                      relative
                      flex
                      items-center
                      rounded-2xl
                      text-sm
                      font-medium
                      transition-all
                      duration-200
                    `,
                    collapsed
                      ? "h-12 justify-center"
                      : "gap-3 px-3.5 py-3",
                    active
                      ? `
                        bg-gradient-to-r
                        from-emerald-500
                        via-teal-500
                        to-cyan-500
                        text-white
                        shadow-lg
                        shadow-emerald-500/20
                      `
                      : `
                        text-slate-600
                        hover:bg-slate-100
                        hover:text-slate-900
                        dark:text-slate-400
                        dark:hover:bg-slate-900
                        dark:hover:text-white
                      `
                  )}
                >
                  {active && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-white" />
                  )}

                  <div className="relative">
                    <Icon
                      className={clsx(
                        "h-5 w-5 shrink-0",
                        active && "scale-110"
                      )}
                    />

                    {item.title === "AI Counselor" &&
                      hasNewCounselorMessage && (
                        <span
                          className="
          absolute
          -right-1
          -top-1
          h-2.5
          w-2.5
          rounded-full
          bg-red-500
          ring-2
          ring-white
          dark:ring-slate-950
        "
                        />
                      )}
                  </div>

                  {!collapsed && (
                    <div className="flex min-w-0 items-center gap-2">
                      <span>{item.title}</span>

                      {item.title === "AI Counselor" &&
                        hasNewCounselorMessage && (
                          <span
                            className="
            rounded-full
            bg-red-500
            px-1.5
            py-0.5
            text-[9px]
            font-bold
            uppercase
            tracking-wide
            text-white
          "
                          >
                            New
                          </span>
                        )}
                    </div>
                  )}
                </Link>

                {/* Tooltip */}

                {collapsed && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-full
                      top-1/2
                      z-[100]
                      ml-3
                      -translate-y-1/2
                      whitespace-nowrap
                      rounded-lg
                      bg-slate-900
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-white
                      opacity-0
                      shadow-xl
                      transition
                      group-hover:opacity-100
                      dark:bg-white
                      dark:text-slate-900
                    "
                  >
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* =====================================
          WELLNESS
      ====================================== */}

      <div className="p-3">
        {collapsed ? (
          <div className="flex h-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg">
            <Heart className="h-5 w-5" />
          </div>
        ) : (
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-4 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2.5">
                <Heart className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-sm font-semibold">
                  Daily Wellness
                </h3>

                <p className="mt-0.5 text-[10px] text-white/75">
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
        )}
      </div>
    </aside>
  );
}