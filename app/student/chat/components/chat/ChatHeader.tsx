
"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  Menu,
  MoreVertical,
  Search,
  Trash2,
  Sparkles,
} from "lucide-react";

/* ==========================================================
   Props
========================================================== */

interface ChatHeaderProps {
  onMenuClick: () => void;
  onDeleteConversation: () => Promise<void>;
  canDeleteConversation: boolean;
}

/* ==========================================================
   Component
========================================================== */

export default function ChatHeader({
  onMenuClick,
  onDeleteConversation,
  canDeleteConversation,
}: ChatHeaderProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-30

        flex
        h-[68px]
        shrink-0
        items-center
        justify-between

        border-b
        border-slate-200/70

        bg-white/80

        px-3
        sm:px-4
        md:px-6

        backdrop-blur-2xl

        dark:border-slate-800/70
        dark:bg-slate-950/80
      "
    >
      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Mobile Sidebar Button */}

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open chat sidebar"
          title="Open sidebar"
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-xl

            text-slate-600

            transition-all
            duration-200

            hover:bg-slate-100
            hover:text-slate-900

            active:scale-95

            lg:hidden

            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* AI Avatar */}

        <div
          className="
            relative
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            overflow-hidden
            rounded-xl

            bg-gradient-to-br
            from-indigo-500
            via-violet-500
            to-sky-500

            text-white

            shadow-lg
            shadow-indigo-500/20
          "
        >
          <Sparkles className="h-5 w-5" />

          {/* Online indicator */}

          <span
            className="
              absolute
              bottom-0
              right-0

              h-3
              w-3

              rounded-full

              border-2
              border-white

              bg-emerald-500

              dark:border-slate-950
            "
          />
        </div>

        {/* AI Info */}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <h1
                className="
                  truncate

                  text-sm
                  font-semibold
                  sm:text-base
                  md:text-lg

                  text-slate-900

                  dark:text-white
                "
              >
                WellMind AI
              </h1>

              <span
                className="
                  hidden
                  rounded-full

                  bg-emerald-100
                  px-2
                  py-0.5

                  text-[9px]
                  font-semibold

                  uppercase
                  tracking-wider

                  text-emerald-700
                  md:inline-flex

                  dark:bg-emerald-500/10
                  dark:text-emerald-300
                "
              >
                Premium
              </span>
            </div>

            {/* Beta */}

            <span
              className="
                hidden
                rounded-full

                bg-indigo-100

                px-2
                py-0.5

                text-[9px]
                font-semibold

                uppercase
                tracking-wider

                text-indigo-700

                md:inline-flex

                dark:bg-indigo-500/20
                dark:text-indigo-300
              "
            >
              Beta
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-2">
            {/* Online */}

            <span
              className="
                flex
                items-center
                gap-1.5

                text-[11px]
                font-medium

                text-emerald-600

                dark:text-emerald-400
              "
            >
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute
                    inline-flex
                    h-full
                    w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative
                    inline-flex
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>

              Online
            </span>

            <span className="hidden text-slate-300 sm:block dark:text-slate-700">
              •
            </span>

            <span
              className="
                hidden

                truncate

                text-[11px]

                text-slate-500

                sm:block

                dark:text-slate-400
              "
            >
              Mental Wellness Assistant
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          CENTER
      ===================================================== */}

      <div
        className="
          hidden
          xl:flex

          items-center
          gap-2
        "
      >
        {/* Memory */}

        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            border
            border-slate-200/80

            bg-slate-50

            px-3
            py-1.5

            text-[11px]
            font-medium

            text-slate-600

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
          "
        >
          <Brain
            className="
              h-3.5
              w-3.5
              text-indigo-500
            "
          />

          Memory Enabled
        </div>

        {/* Model */}

        <div
          className="
            rounded-full

            border
            border-slate-200/80

            bg-slate-50

            px-3
            py-1.5

            text-[11px]
            font-medium

            text-slate-600

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
          "
        >
          Gemini 2.5 Flash
        </div>
      </div>

      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div className="flex items-center gap-1 sm:gap-2">
        {/* Dashboard */}

        <Link
          href="/student/dashboard"
          aria-label="Back to dashboard"
          title="Back to dashboard"
          className="
    flex
    h-10
    w-10
    items-center
    justify-center

    rounded-xl

    border
    border-slate-200

    text-slate-600

    transition-all
    duration-200

    hover:border-indigo-200
    hover:bg-indigo-50
    hover:text-indigo-600

    active:scale-95

    md:w-auto
    md:gap-2
    md:px-3

    dark:border-slate-700
    dark:text-slate-300
    dark:hover:border-indigo-500/30
    dark:hover:bg-indigo-500/10
    dark:hover:text-indigo-400
  "
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />

          {/* Desktop only */}
          <span className="hidden md:inline">
            Dashboard
          </span>
        </Link>


        {/* Search */}

        <button
          type="button"
          aria-label="Search conversation"
          title="Search conversation"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            text-slate-600

            transition-all
            duration-200

            hover:bg-slate-100
            hover:text-slate-900

            active:scale-95

            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <Search className="h-[18px] w-[18px]" />
        </button>

        {/* Delete */}

        <button
          type="button"
          aria-label="Delete conversation"
          title="Delete conversation"
          onClick={onDeleteConversation}
          disabled={!canDeleteConversation}
          className="
            hidden

            h-10
            w-10

            items-center
            justify-center

            rounded-xl

            text-slate-500

            transition-all
            duration-200

            hover:bg-red-50
            hover:text-red-600

            active:scale-95

            disabled:opacity-50
            disabled:cursor-not-allowed

            md:flex

            dark:text-slate-400
            dark:hover:bg-red-500/10
            dark:hover:text-red-400
          "
        >
          <Trash2 className="h-[18px] w-[18px]" />
        </button>

        {/* More */}

        <button
          type="button"
          aria-label="More chat options"
          title="More options"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            text-slate-600

            transition-all
            duration-200

            hover:bg-slate-100
            hover:text-slate-900

            active:scale-95

            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <MoreVertical className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  );
}
