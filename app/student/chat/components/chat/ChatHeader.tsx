"use client";

import {
  Bot,
  Brain,
  Menu,
  MoreVertical,
  Search,
  Trash2,
} from "lucide-react";

/* ==========================================================
   Props
========================================================== */

interface ChatHeaderProps {
  onMenuClick: () => void;
}

/* ==========================================================
   Component
========================================================== */

export default function ChatHeader({
  onMenuClick,
}: ChatHeaderProps) {
  return (
    <header
      className="
        sticky
        top-0
        z-30

        flex
        h-20
        shrink-0
        items-center
        justify-between

        border-b
        border-slate-200/70

        bg-white/80

        px-4
        md:px-6

        backdrop-blur-2xl

        dark:border-slate-800
        dark:bg-slate-950/80
      "
    >
      {/* =====================================================
          Left
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-4">
        {/* Mobile Sidebar Button */}

        <button
          type="button"
          onClick={onMenuClick}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center

            rounded-xl

            transition-all

            hover:bg-slate-100
            active:scale-95

            lg:hidden

            dark:hover:bg-slate-800
          "
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Avatar */}

        <div
          className="
            relative

            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center

            rounded-2xl

            bg-gradient-to-br
            from-indigo-500
            via-violet-500
            to-sky-500

            text-white

            shadow-lg
            shadow-indigo-500/25
          "
        >
          <Bot className="h-6 w-6" />

          <span
            className="
              absolute
              bottom-0
              right-0

              h-3.5
              w-3.5

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
            <h1
              className="
                truncate

                text-lg
                font-semibold

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

                bg-indigo-100

                px-2.5
                py-1

                text-[10px]
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

          <div className="mt-1 flex items-center gap-2">
            <span
              className="
                flex
                items-center
                gap-1

                text-xs

                text-emerald-600
              "
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </span>

            <span className="hidden md:block text-slate-300">
              •
            </span>

            <span
              className="
                hidden

                text-xs

                text-slate-500

                md:block
              "
            >
              Personalized Mental Wellness Assistant
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          Center
      ===================================================== */}

      <div
        className="
          hidden
          xl:flex

          items-center
          gap-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2

            rounded-full

            border
            border-slate-200

            bg-white

            px-3
            py-2

            text-xs
            font-medium

            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          <Brain className="h-4 w-4 text-indigo-500" />

          Memory Enabled
        </div>

        <div
          className="
            rounded-full

            border
            border-slate-200

            bg-white

            px-3
            py-2

            text-xs
            font-medium

            dark:border-slate-700
            dark:bg-slate-900
          "
        >
          Gemini 2.5 Flash
        </div>
      </div>

      {/* =====================================================
          Right
      ===================================================== */}

      <div className="flex items-center gap-1 md:gap-2">
        {/* Search */}

        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            transition-all

            hover:bg-slate-100
            active:scale-95

            dark:hover:bg-slate-800
          "
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Clear */}

        <button
          type="button"
          className="
            hidden

            md:flex

            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            transition-all

            hover:bg-red-50
            hover:text-red-600

            active:scale-95

            dark:hover:bg-red-500/10
          "
        >
          <Trash2 className="h-5 w-5" />
        </button>

        {/* More */}

        <button
          type="button"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            transition-all

            hover:bg-slate-100
            active:scale-95

            dark:hover:bg-slate-800
          "
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}