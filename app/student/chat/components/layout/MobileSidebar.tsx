"use client";

import { X } from "lucide-react";

import SidebarContent from "./SidebarContent";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;

  activeConversationId: string | null;

  onSelectConversation: (
    id: string
  ) => void;

  onNewConversation: () => Promise<void>;
}

export default function MobileSidebar({
  open,
  onClose,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}: MobileSidebarProps) {
  return (
    <aside
      className={`
        fixed
        left-3
        top-3
        bottom-3

        z-[70]

        flex
        w-[300px]
        max-w-[calc(100vw-24px)]

        flex-col

        overflow-hidden

        rounded-3xl

        border
        border-slate-200

        bg-white

        shadow-2xl

        transition-all
        duration-300
        ease-out

        lg:hidden

        dark:border-slate-800
        dark:bg-slate-950

        ${
          open
            ? "translate-x-0 opacity-100"
            : "-translate-x-[110%] opacity-0 pointer-events-none"
        }
      `}
    >
      {/* Header */}

      <div
        className="
          flex
          shrink-0
          items-center
          justify-between

          border-b
          border-slate-200

          bg-white

          px-4
          py-4

          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        <div>
          <h2
            className="
              text-sm
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            Conversations
          </h2>

          <p className="mt-0.5 text-xs text-slate-400">
            Your wellness history
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close sidebar"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-xl

            text-slate-500

            transition

            hover:bg-slate-100
            hover:text-slate-900

            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar Content */}

      <div className="min-h-0 flex-1">
        <SidebarContent
          activeConversationId={
            activeConversationId
          }
          onSelectConversation={
            onSelectConversation
          }
          onNewConversation={
            onNewConversation
          }
        />
      </div>
    </aside>
  );
}