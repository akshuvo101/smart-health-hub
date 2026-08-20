"use client";

import Link from "next/link";

import {
  ArrowLeft,
  Brain,
  Menu,
  MoreVertical,
  Search,
  Sparkles,
  Trash2,
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

        bg-white/85

        px-3
        sm:px-4
        md:px-6

        backdrop-blur-2xl

        dark:border-slate-800/70
        dark:bg-slate-950/85
      "
    >
      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Mobile Menu */}

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
            from-emerald-500
            via-teal-500
            to-cyan-500

            text-white

            shadow-lg
            shadow-emerald-500/20
          "
        >
          <Sparkles className="h-5 w-5" />

          {/* Online Indicator */}

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

        {/* AI Information */}

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1
              className="
                truncate

                text-sm
                font-bold

                text-slate-900

                sm:text-base

                dark:text-white
              "
            >
              WellMind AI
            </h1>

            {/* AI Badge */}

            <span
              className="
                hidden

                items-center
                gap-1

                rounded-full

                bg-emerald-50

                px-2
                py-0.5

                text-[9px]
                font-semibold

                uppercase
                tracking-wider

                text-emerald-700

                sm:inline-flex

                dark:bg-emerald-500/10
                dark:text-emerald-300
              "
            >
              <Sparkles className="h-2.5 w-2.5" />

              AI
            </span>
          </div>

          <div className="mt-0.5 flex items-center gap-2">
            {/* Online Status */}

            <span
              className="
                flex
                items-center
                gap-1.5

                text-[10px]
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

            {/* Description */}

            <span
              className="
                hidden

                text-slate-300

                sm:block

                dark:text-slate-700
              "
            >
              •
            </span>

            <span
              className="
                hidden
                truncate

                text-[10px]

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
          CENTER STATUS
      ===================================================== */}

      <div
        className="
          hidden
          items-center
          gap-2

          xl:flex
        "
      >
        {/* Memory Status */}

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

            text-[10px]
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

              text-emerald-500
            "
          />

          Conversation Memory
        </div>

        {/* Privacy Status */}

        <div
          className="
            rounded-full

            border
            border-slate-200/80

            bg-slate-50

            px-3
            py-1.5

            text-[10px]
            font-medium

            text-slate-600

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
          "
        >
          Private & Secure
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
            shrink-0
            items-center
            justify-center

            rounded-xl

            border
            border-slate-200

            text-slate-600

            transition-all
            duration-200

            hover:border-emerald-200
            hover:bg-emerald-50
            hover:text-emerald-600

            active:scale-95

            md:w-auto
            md:gap-2
            md:px-3

            dark:border-slate-700
            dark:text-slate-300

            dark:hover:border-emerald-500/30
            dark:hover:bg-emerald-500/10
            dark:hover:text-emerald-400
          "
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />

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
          title={
            canDeleteConversation
              ? "Delete conversation"
              : "No conversation selected"
          }
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

            disabled:cursor-not-allowed
            disabled:opacity-40

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