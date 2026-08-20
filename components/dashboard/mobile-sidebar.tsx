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
  const [hasNewCounselorMessage, setHasNewCounselorMessage] =
    useState(false);

  /* =====================================
     MOUNT
  ====================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =====================================
     LOCK BODY SCROLL
  ====================================== */

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  /* =====================================
     LOAD COUNSELOR NOTIFICATION
  ====================================== */

  useEffect(() => {
    const loadNewCounselorStatus = async () => {
      try {
        const response = await fetch(
          "/api/chat/conversations",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        const conversations = result.data ?? [];

        const hasNew = conversations.some(
          (conversation: {
            is_new?: boolean;
            assessment_id?: string | null;
          }) =>
            conversation.is_new === true &&
            conversation.assessment_id !== null
        );

        setHasNewCounselorMessage(hasNew);
      } catch (error) {
        console.error(
          "Failed to load counselor notification:",
          error
        );
      }
    };

    loadNewCounselorStatus();
  }, [pathname]);

  /* =====================================
     CLOSE SIDEBAR
  ====================================== */

  const closeSidebar = () => {
    setOpen(false);
  };

  /* =====================================
     DRAWER
  ====================================== */

  const drawer = (
    <>
      {/* =====================================
          OVERLAY
      ====================================== */}

      <div
        onClick={closeSidebar}
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

      {/* =====================================
          DRAWER
      ====================================== */}

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
          border-slate-200/70
          bg-white/95
          shadow-[0_30px_100px_rgba(15,23,42,0.25)]
          backdrop-blur-2xl
          transition-transform
          duration-300
          ease-out
          lg:hidden
          dark:border-slate-800/80
          dark:bg-slate-950/95
          dark:shadow-black/40
          ${
            open
              ? "translate-x-0"
              : "-translate-x-[calc(100%+20px)]"
          }
        `}
      >
        {/* =====================================
            HEADER
        ====================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200/70
            px-4
            py-4
            dark:border-slate-800/70
          "
        >
          <Link
            href="/student/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3"
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

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                PsycoMentalHub
              </h2>

              <p className="text-[10px] text-slate-400">
                Student Portal
              </p>
            </div>
          </Link>

          {/* Close Button */}

          <button
            type="button"
            onClick={closeSidebar}
            aria-label="Close navigation"
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              text-slate-500
              transition
              hover:bg-slate-100
              hover:text-slate-900
              active:scale-95
              dark:border-slate-800
              dark:text-slate-400
              dark:hover:bg-slate-900
              dark:hover:text-white
            "
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* =====================================
            NAVIGATION
        ====================================== */}

        <div className="flex-1 overflow-y-auto p-4">
          <p
            className="
              mb-3
              px-2
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-slate-400
            "
          >
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
                  onClick={closeSidebar}
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
                    transition-all
                    duration-200
                    ${
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
                    }
                  `}
                >
                  {/* Active Indicator */}

                  {active && (
                    <span
                      className="
                        absolute
                        left-0
                        top-2
                        bottom-2
                        w-1
                        rounded-r-full
                        bg-white
                      "
                    />
                  )}

                  {/* Icon + Notification */}

                  <div className="relative shrink-0">
                    <Icon
                      className={`
                        h-5
                        w-5
                        transition-transform
                        duration-200
                        ${active ? "scale-110" : ""}
                      `}
                    />

                    {/* New Counselor Message Dot */}

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

                  {/* Title + New Badge */}

                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate">
                      {item.title}
                    </span>

                    {item.title === "AI Counselor" &&
                      hasNewCounselorMessage && (
                        <span
                          className="
                            shrink-0
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
                </Link>
              );
            })}
          </nav>
        </div>

        {/* =====================================
            WELLNESS CARD
        ====================================== */}

        <div className="p-4 pt-2">
          <div
            className="
              rounded-2xl
              bg-gradient-to-br
              from-emerald-500
              via-teal-500
              to-cyan-500
              p-4
              text-white
              shadow-lg
              shadow-emerald-500/15
            "
          >
            {/* Wellness Header */}

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white/15 p-2.5">
                <Heart className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold">
                  Daily Wellness
                </h3>

                <p className="mt-0.5 text-[10px] leading-relaxed text-white/75">
                  Keep your wellness journey on track.
                </p>
              </div>
            </div>

            {/* Progress */}

            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between text-[10px]">
                <span>Today's Progress</span>

                <span className="font-semibold">
                  87%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/20">
                <div
                  className="
                    h-full
                    w-[87%]
                    rounded-full
                    bg-white
                    transition-all
                    duration-500
                  "
                />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );

  /* =====================================
     RENDER
  ====================================== */

  return (
    <>
      {/* =====================================
          MOBILE MENU BUTTON
      ====================================== */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
        aria-expanded={open}
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
          transition-all
          duration-200
          hover:border-emerald-300
          hover:bg-emerald-50
          hover:text-emerald-600
          active:scale-95
          lg:hidden
          dark:border-slate-800
          dark:bg-slate-900
          dark:text-slate-200
          dark:hover:border-emerald-700
          dark:hover:bg-emerald-950/40
          dark:hover:text-emerald-400
        "
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* =====================================
          PORTAL
      ====================================== */}

      {mounted &&
        createPortal(drawer, document.body)}
    </>
  );
}