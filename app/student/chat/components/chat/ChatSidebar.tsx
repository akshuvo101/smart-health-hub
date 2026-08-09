"use client";

import {
  MessageSquare,
  Pin,
  Plus,
  Search,
  Settings,
  User2,
} from "lucide-react";

/* ==========================================================
   Mock Data
========================================================== */

const todayChats = [
  "Sleep issues",
  "Feeling anxious",
];

const yesterdayChats = [
  "Daily wellness report",
];

const weekChats = [
  "Exam stress",
  "Healthy habits",
  "Motivation",
];

/* ==========================================================
   Component
========================================================== */

export default function ChatSidebar() {
  return (
    <div
      className="
        flex
        h-full
        w-full
        flex-col

        bg-white/70

        backdrop-blur-xl

        dark:bg-slate-950/70
      "
    >
      {/* ======================================================
          Header
      ====================================================== */}

      <div
        className="
          border-b

          border-slate-200/70

          p-5

          dark:border-slate-800
        "
      >
        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2

            rounded-2xl

            bg-slate-900

            py-3

            text-sm
            font-medium

            text-white

            transition-all

            hover:scale-[1.02]

            hover:bg-slate-800

            active:scale-[0.98]

            dark:bg-white
            dark:text-slate-900
          "
        >
          <Plus className="h-4 w-4" />

          New Conversation
        </button>

        {/* Search */}

        <div className="relative mt-5">
          <Search
            className="
              absolute
              left-4
              top-1/2

              h-4
              w-4

              -translate-y-1/2

              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="
              w-full

              rounded-2xl

              border

              border-slate-200

              bg-slate-100

              py-3
              pl-11
              pr-4

              text-sm

              outline-none

              transition-all

              focus:border-indigo-500

              focus:ring-4

              focus:ring-indigo-100

              dark:border-slate-700

              dark:bg-slate-900

              dark:focus:ring-indigo-900/30
            "
          />
        </div>
      </div>

      {/* ======================================================
          Conversations
      ====================================================== */}

      <div
        className="
          flex-1

          overflow-y-auto

          px-3

          py-5
        "
      >
        <SidebarGroup
          title="Today"
          chats={todayChats}
        />

        <SidebarGroup
          title="Yesterday"
          chats={yesterdayChats}
        />

        <SidebarGroup
          title="Previous 7 Days"
          chats={weekChats}
        />

        {/* Pinned */}

        <div className="mt-8">
          <div
            className="
              mb-3

              flex
              items-center
              gap-2

              px-2

              text-xs

              font-semibold

              uppercase

              tracking-wider

              text-slate-400
            "
          >
            <Pin className="h-3.5 w-3.5" />

            Pinned
          </div>

          <ConversationItem
            title="My Mental Progress"
          />
        </div>
      </div>

      {/* ======================================================
          Footer
      ====================================================== */}

      <div
        className="
          border-t

          border-slate-200/70

          p-4

          dark:border-slate-800
        "
      >
        <button
          className="
            flex
            w-full
            items-center
            gap-3

            rounded-2xl

            p-3

            transition-all

            hover:bg-slate-100

            dark:hover:bg-slate-800
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center

              rounded-full

              bg-gradient-to-br

              from-indigo-500

              to-sky-500

              text-white
            "
          >
            <User2 className="h-5 w-5" />
          </div>

          <div className="min-w-0 flex-1 text-left">
            <h4
              className="
                truncate

                text-sm

                font-semibold
              "
            >
              AK Shuvo
            </h4>

            <p
              className="
                truncate

                text-xs

                text-slate-400
              "
            >
              Student Account
            </p>
          </div>

          <Settings
            className="
              h-5
              w-5

              text-slate-400
            "
          />
        </button>
      </div>
    </div>
  );
}

/* ==========================================================
   Sidebar Group
========================================================== */

function SidebarGroup({
  title,
  chats,
}: {
  title: string;
  chats: string[];
}) {
  return (
    <section className="mb-8">
      <h3
        className="
          mb-3

          px-2

          text-xs

          font-semibold

          uppercase

          tracking-widest

          text-slate-400
        "
      >
        {title}
      </h3>

      <div className="space-y-1">
        {chats.map((chat) => (
          <ConversationItem
            key={chat}
            title={chat}
          />
        ))}
      </div>
    </section>
  );
}

/* ==========================================================
   Conversation Item
========================================================== */

function ConversationItem({
  title,
}: {
  title: string;
}) {
  return (
    <button
      className="
        flex
        w-full
        items-center
        gap-3

        rounded-xl

        px-3
        py-2.5

        text-left

        text-sm

        transition-all

        hover:bg-slate-100

        dark:hover:bg-slate-800
      "
    >
      <MessageSquare
        className="
          h-4
          w-4

          shrink-0

          text-slate-400
        "
      />

      <span className="truncate">
        {title}
      </span>
    </button>
  );
}