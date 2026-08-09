"use client";

import {
  MessageSquare,
  Pin,
  Plus,
  Search,
} from "lucide-react";

/* ==========================================================
   Mock Data
========================================================== */

const conversations = {
  today: [
    "Feeling anxious today",
    "Sleep quality discussion",
  ],

  yesterday: [
    "Weekly mood review",
  ],

  previous: [
    "Exam stress",
    "Healthy habits",
    "Daily reflection",
  ],

  pinned: [
    "My Mental Progress",
  ],
};

/* ==========================================================
   Component
========================================================== */

export default function SidebarContent() {
  return (
    <div
      className="
        flex
        h-full
        flex-col
        overflow-hidden
      "
    >
      {/* ======================================================
          Header
      ====================================================== */}

      <div
        className="
          shrink-0

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

            px-4
            py-3

            text-sm
            font-semibold

            text-white

            transition-all

            hover:scale-[1.02]
            active:scale-100

            dark:bg-white
            dark:text-slate-900
          "
        >
          <Plus size={18} />

          New Chat
        </button>

        {/* Search */}

        <div className="relative mt-4">
          <Search
            size={16}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2

              text-slate-400
            "
          />

          <input
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

              dark:border-slate-700
              dark:bg-slate-900
            "
          />
        </div>
      </div>

      {/* ======================================================
          Conversation Area
      ====================================================== */}

      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
          px-4
          py-5

          space-y-8
        "
      >
        <ConversationGroup
          title="Today"
          items={conversations.today}
        />

        <ConversationGroup
          title="Yesterday"
          items={conversations.yesterday}
        />

        <ConversationGroup
          title="Previous 7 Days"
          items={conversations.previous}
        />

        <ConversationGroup
          title="Pinned"
          icon={<Pin size={12} />}
          items={conversations.pinned}
        />
      </div>

      {/* ======================================================
          Footer
      ====================================================== */}

      <div
        className="
          shrink-0

          border-t
          border-slate-200/70

          px-5
          py-4

          text-center
          text-xs

          text-slate-400

          dark:border-slate-800
        "
      >
        WellMind AI • Conversation History
      </div>
    </div>
  );
}

/* ==========================================================
   Group
========================================================== */

function ConversationGroup({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div>
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

          tracking-widest

          text-slate-400
        "
      >
        {icon}

        {title}
      </div>

      <div className="space-y-1">
        {items.map((item) => (
          <ConversationItem
            key={item}
            title={item}
          />
        ))}
      </div>
    </div>
  );
}

/* ==========================================================
   Item
========================================================== */

function ConversationItem({
  title,
}: {
  title: string;
}) {
  return (
    <button
      className="
        group

        flex
        w-full
        items-center
        gap-3

        rounded-2xl

        px-3
        py-3

        text-left

        transition-all

        hover:bg-slate-100

        dark:hover:bg-slate-900
      "
    >
      <div
        className="
          flex
          h-9
          w-9
          items-center
          justify-center

          rounded-xl

          bg-slate-100

          transition

          group-hover:bg-white

          dark:bg-slate-800
          dark:group-hover:bg-slate-700
        "
      >
        <MessageSquare
          size={16}
          className="text-slate-500"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="
            truncate

            text-sm
            font-medium

            text-slate-700

            dark:text-slate-300
          "
        >
          {title}
        </p>

        <p
          className="
            mt-0.5

            text-xs

            text-slate-400
          "
        >
          Just now
        </p>
      </div>
    </button>
  );
}