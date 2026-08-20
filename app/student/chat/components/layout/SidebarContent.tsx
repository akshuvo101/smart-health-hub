"use client";

import {
  MessageSquare,
  Plus,
  Search,
  Settings,
  User2,
  MoreHorizontal,
  Sparkles,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

import { ConversationListItem } from "@/types/ai-chat";
import { useChatContext } from "../../context/ChatContext";

interface SidebarContentProps {
  activeConversationId: string | null;

  onSelectConversation: (
    conversationId: string
  ) => void;

  onNewConversation: () => Promise<void>;
}

export default function SidebarContent({
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}: SidebarContentProps) {
  const {
    conversations,
    isLoadingConversations,
    deleteConversation,
  } = useChatContext();

  const [isCreating, setIsCreating] =
    useState(false);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [deletingConversationId, setDeletingConversationId] =
    useState<string | null>(null);

  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  // ==========================================================
  // Search
  // ==========================================================

  const filteredConversations = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    if (!query) {
      return conversations;
    }

    return conversations.filter(
      (conversation) =>
        conversation.title
          ?.toLowerCase()
          .includes(query)
    );
  }, [conversations, searchQuery]);

  // ==========================================================
  // Group Conversations
  // ==========================================================

  const groupedConversations = useMemo(() => {
    const now = new Date();

    const today: ConversationListItem[] = [];
    const yesterday: ConversationListItem[] = [];
    const previous7Days: ConversationListItem[] = [];

    filteredConversations.forEach(
      (conversation) => {
        const date = new Date(
          conversation.updated_at
        );

        if (Number.isNaN(date.getTime())) {
          return;
        }

        const diff =
          now.getTime() -
          date.getTime();

        const days =
          diff /
          (1000 * 60 * 60 * 24);

        // Today
        if (
          date.toDateString() ===
          now.toDateString()
        ) {
          today.push(conversation);
          return;
        }

        // Yesterday
        if (days < 2) {
          yesterday.push(conversation);
          return;
        }

        // Previous 7 Days
        if (days <= 7) {
          previous7Days.push(conversation);
        }
      }
    );

    return {
      today,
      yesterday,
      previous7Days,
    };
  }, [filteredConversations]);

  // ==========================================================
  // New Conversation
  // ==========================================================

  const handleNewConversation =
    async () => {
      try {
        setIsCreating(true);

        setOpenMenuId(null);

        await onNewConversation();
      } catch (error) {
        console.error(
          "Failed to create conversation:",
          error
        );
      } finally {
        setIsCreating(false);
      }
    };

  // ==========================================================
  // Conversation Selection
  // ==========================================================

  const handleSelectConversation = (
    conversationId: string
  ) => {
    setOpenMenuId(null);

    onSelectConversation(
      conversationId
    );
  };

  // ==========================================================
  // Delete Conversation
  // ==========================================================

  const handleDeleteConversation =
    async (
      conversationId: string
    ) => {
      const conversation =
        conversations.find(
          (item) =>
            item.id ===
            conversationId
        );

      const title =
        conversation?.title ||
        "this conversation";

      const confirmed =
        window.confirm(
          `Delete "${title}"?\n\nThis conversation and its messages will be permanently deleted.`
        );

      if (!confirmed) {
        return;
      }

      try {
        setDeletingConversationId(
          conversationId
        );

        setOpenMenuId(null);

        await deleteConversation(
          conversationId
        );
      } catch (error) {
        console.error(
          "Failed to delete conversation:",
          error
        );
      } finally {
        setDeletingConversationId(
          null
        );
      }
    };

  // ==========================================================
  // Render
  // ==========================================================

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
      "
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          shrink-0
          border-b
          border-slate-200/60
          p-4
          dark:border-slate-800/70
        "
      >
        {/* Brand */}

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
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
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                WellMind AI
              </p>

              <p className="text-[10px] text-slate-400">
                Your wellness companion
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="More options"
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              text-slate-400
              transition
              hover:bg-slate-100
              hover:text-slate-700
              dark:hover:bg-slate-900
              dark:hover:text-white
            "
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* ==================================================
            New Conversation
        ================================================== */}

        <button
          type="button"
          onClick={
            handleNewConversation
          }
          disabled={isCreating}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-gradient-to-r
            from-emerald-500
            via-teal-500
            to-cyan-500
            px-4
            py-2.5
            text-sm
            font-semibold
            text-white
            shadow-md
            shadow-emerald-500/20
            transition-all
            hover:-translate-y-0.5
            hover:shadow-lg
            hover:shadow-emerald-500/25
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {isCreating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}

          {isCreating
            ? "Creating..."
            : "New Conversation"}
        </button>

        {/* ==================================================
            Search
        ================================================== */}

        <div className="relative mt-3">
          <Search
            className="
              absolute
              left-3.5
              top-1/2
              h-4
              w-4
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
            placeholder="Search chats..."
            className="
              h-10
              w-full
              rounded-xl
              border
              border-slate-200/80
              bg-slate-100/70
              pl-10
              pr-10
              text-xs
              text-slate-700
              outline-none
              transition-all
              placeholder:text-slate-400
              focus:border-emerald-400
              focus:bg-white
              focus:ring-4
              focus:ring-emerald-500/10
              dark:border-slate-800
              dark:bg-slate-900/70
              dark:text-white
              dark:focus:bg-slate-900
            "
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() =>
                setSearchQuery("")
              }
              aria-label="Clear search"
              className="
                absolute
                right-3
                top-1/2
                flex
                h-5
                w-5
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                text-slate-400
                transition
                hover:bg-slate-200
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-white
              "
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* ======================================================
          CONVERSATIONS
      ====================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          px-3
          py-5
          scrollbar-thin
          scrollbar-thumb-slate-300
          dark:scrollbar-thumb-slate-700
        "
      >
        {/* Loading */}

        {isLoadingConversations && (
          <div
            className="
              flex
              items-center
              justify-center
              py-10
            "
          >
            <Loader2
              className="
                h-5
                w-5
                animate-spin
                text-emerald-500
              "
            />
          </div>
        )}

        {/* Empty */}

        {!isLoadingConversations &&
          filteredConversations.length ===
            0 && (
            <div className="px-4 py-10 text-center">
              <MessageSquare
                className="
                  mx-auto
                  mb-3
                  h-7
                  w-7
                  text-slate-300
                  dark:text-slate-700
                "
              />

              <p
                className="
                  text-xs
                  font-medium
                  text-slate-600
                  dark:text-slate-300
                "
              >
                {searchQuery
                  ? "No conversations found"
                  : "No conversations yet"}
              </p>

              <p className="mt-1 text-[10px] text-slate-400">
                {searchQuery
                  ? "Try another search."
                  : "Start a new conversation."}
              </p>
            </div>
          )}

        {/* Today */}

        {!isLoadingConversations &&
          groupedConversations.today
            .length > 0 && (
            <SidebarGroup
              title="Today"
              conversations={
                groupedConversations.today
              }
              activeConversationId={
                activeConversationId
              }
              openMenuId={openMenuId}
              deletingConversationId={
                deletingConversationId
              }
              onMenuToggle={(id) =>
                setOpenMenuId(
                  openMenuId === id
                    ? null
                    : id
                )
              }
              onSelectConversation={
                handleSelectConversation
              }
              onDeleteConversation={
                handleDeleteConversation
              }
            />
          )}

        {/* Yesterday */}

        {!isLoadingConversations &&
          groupedConversations
            .yesterday.length > 0 && (
            <SidebarGroup
              title="Yesterday"
              conversations={
                groupedConversations.yesterday
              }
              activeConversationId={
                activeConversationId
              }
              openMenuId={openMenuId}
              deletingConversationId={
                deletingConversationId
              }
              onMenuToggle={(id) =>
                setOpenMenuId(
                  openMenuId === id
                    ? null
                    : id
                )
              }
              onSelectConversation={
                handleSelectConversation
              }
              onDeleteConversation={
                handleDeleteConversation
              }
            />
          )}

        {/* Previous 7 Days */}

        {!isLoadingConversations &&
          groupedConversations
            .previous7Days.length > 0 && (
            <SidebarGroup
              title="Previous 7 Days"
              conversations={
                groupedConversations.previous7Days
              }
              activeConversationId={
                activeConversationId
              }
              openMenuId={openMenuId}
              deletingConversationId={
                deletingConversationId
              }
              onMenuToggle={(id) =>
                setOpenMenuId(
                  openMenuId === id
                    ? null
                    : id
                )
              }
              onSelectConversation={
                handleSelectConversation
              }
              onDeleteConversation={
                handleDeleteConversation
              }
            />
          )}
      </div>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200/60
          p-3
          dark:border-slate-800/70
        "
      >
        <button
          type="button"
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            p-2
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
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-indigo-500
              to-violet-500
              text-white
            "
          >
            <User2 className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p
              className="
                truncate
                text-xs
                font-semibold
                text-slate-800
                dark:text-white
              "
            >
              AK Shuvo
            </p>

            <p className="truncate text-[10px] text-slate-400">
              Student Account
            </p>
          </div>

          <Settings className="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </div>
  );
}

// ==========================================================
// Sidebar Group
// ==========================================================

function SidebarGroup({
  title,
  conversations,
  activeConversationId,
  openMenuId,
  deletingConversationId,
  onMenuToggle,
  onSelectConversation,
  onDeleteConversation,
}: {
  title: string;

  conversations: ConversationListItem[];

  activeConversationId: string | null;

  openMenuId: string | null;

  deletingConversationId: string | null;

  onMenuToggle: (
    conversationId: string
  ) => void;

  onSelectConversation: (
    conversationId: string
  ) => void;

  onDeleteConversation: (
    conversationId: string
  ) => Promise<void>;
}) {
  return (
    <section className="mb-6">
      <h3
        className="
          mb-2
          px-2
          text-[10px]
          font-semibold
          uppercase
          tracking-widest
          text-slate-400
        "
      >
        {title}
      </h3>

      <div className="space-y-1">
        {conversations.map(
          (conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={
                conversation
              }
              active={
                activeConversationId ===
                conversation.id
              }
              menuOpen={
                openMenuId ===
                conversation.id
              }
              isDeleting={
                deletingConversationId ===
                conversation.id
              }
              onClick={() =>
                onSelectConversation(
                  conversation.id
                )
              }
              onMenuToggle={() =>
                onMenuToggle(
                  conversation.id
                )
              }
              onDelete={() =>
                onDeleteConversation(
                  conversation.id
                )
              }
            />
          )
        )}
      </div>
    </section>
  );
}

// ==========================================================
// Conversation Item
// ==========================================================

function ConversationItem({
  conversation,
  active,
  menuOpen,
  isDeleting,
  onClick,
  onMenuToggle,
  onDelete,
}: {
  conversation: ConversationListItem;

  active: boolean;

  menuOpen: boolean;

  isDeleting: boolean;

  onClick: () => void;

  onMenuToggle: () => void;

  onDelete: () => void;
}) {
  return (
    <div className="group relative">
      {/* ====================================================
          Conversation Button
      ==================================================== */}

      <button
        type="button"
        onClick={onClick}
        disabled={isDeleting}
        aria-current={
          active ? "page" : undefined
        }
        className={`
          relative
          flex
          w-full
          items-center
          gap-2.5
          rounded-xl
          px-2.5
          py-2.5
          pr-10
          text-left
          transition-all

          disabled:cursor-not-allowed
          disabled:opacity-60

          ${
            active
              ? `
                bg-emerald-50
                dark:bg-emerald-950/30
              `
              : `
                hover:bg-slate-100
                dark:hover:bg-slate-900
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
              w-0.5
              rounded-full
              bg-gradient-to-b
              from-emerald-400
              to-cyan-400
            "
          />
        )}

        {/* Icon */}

        <div
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            transition-all

            ${
              active
                ? `
                  bg-emerald-100
                  text-emerald-600
                  dark:bg-emerald-900/50
                  dark:text-emerald-400
                `
                : `
                  bg-slate-100
                  text-slate-400
                  group-hover:bg-white
                  group-hover:text-emerald-500
                  dark:bg-slate-900
                  dark:group-hover:bg-slate-800
                `
            }
          `}
        >
          {isDeleting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <MessageSquare className="h-3.5 w-3.5" />
          )}
        </div>

        {/* Text */}

        <div className="min-w-0 flex-1">
          <p
            className={`
              truncate
              text-xs
              font-medium

              ${
                active
                  ? `
                    text-emerald-700
                    dark:text-emerald-300
                  `
                  : `
                    text-slate-700
                    dark:text-slate-300
                  `
              }
            `}
          >
            {conversation.title ||
              "Untitled Conversation"}
          </p>

          <p className="mt-0.5 text-[10px] text-slate-400">
            {formatConversationDate(
              conversation.updated_at
            )}
          </p>
        </div>
      </button>

      {/* ====================================================
          More Button
      ==================================================== */}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onMenuToggle();
        }}
        disabled={isDeleting}
        aria-label="Conversation options"
        aria-expanded={menuOpen}
        className={`
          absolute
          right-1.5
          top-1/2
          flex
          h-7
          w-7
          -translate-y-1/2
          items-center
          justify-center
          rounded-lg
          text-slate-400
          transition-all

          disabled:cursor-not-allowed
          disabled:opacity-50

          ${
            menuOpen
              ? `
                bg-slate-200
                text-slate-700
                dark:bg-slate-800
                dark:text-white
              `
              : `
                opacity-0
                group-hover:opacity-100
                hover:bg-slate-200
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-white
              `
          }
        `}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {/* ====================================================
          More Menu
      ==================================================== */}

      {menuOpen && (
        <div
          className="
            absolute
            right-1
            top-full
            z-50
            mt-1
            w-40
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            p-1
            shadow-xl
            shadow-slate-900/10
            dark:border-slate-800
            dark:bg-slate-950
            dark:shadow-black/30
          "
          onClick={(event) =>
            event.stopPropagation()
          }
        >
          {/* Delete */}

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="
              flex
              w-full
              items-center
              gap-2.5
              rounded-lg
              px-3
              py-2
              text-left
              text-xs
              font-medium
              text-red-600
              transition
              hover:bg-red-50
              dark:text-red-400
              dark:hover:bg-red-950/30
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isDeleting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}

            {isDeleting
              ? "Deleting..."
              : "Delete conversation"}
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================================
// Date Formatter
// ==========================================================

function formatConversationDate(
  dateString: string
) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  );
}


// "use client";

// import {
//   MessageSquare,
//   Plus,
//   Search,
//   Settings,
//   User2,
//   MoreHorizontal,
//   Sparkles,
//   Loader2,
// } from "lucide-react";

// import {
//   useMemo,
//   useState,
// } from "react";

// import { ConversationListItem } from "@/types/ai-chat";
// import { useChatContext } from "../../context/ChatContext";

// interface SidebarContentProps {
//   activeConversationId: string | null;
//   onSelectConversation: (conversationId: string) => void;
//   onNewConversation: () => Promise<void>;
// }

// export default function SidebarContent({
//   activeConversationId,
//   onSelectConversation,
//   onNewConversation,
// }: SidebarContentProps) {
//   const {
//     conversations,
//     isLoadingConversations,
//   } = useChatContext();

//   const [isCreating, setIsCreating] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   // ==========================================================
//   // Search
//   // ==========================================================

//   const filteredConversations = useMemo(() => {
//     const query = searchQuery.trim().toLowerCase();

//     if (!query) {
//       return conversations;
//     }

//     return conversations.filter(
//       (conversation) =>
//         conversation.title
//           ?.toLowerCase()
//           .includes(query)
//     );
//   }, [conversations, searchQuery]);

//   // ==========================================================
//   // Group Conversations
//   // ==========================================================

//   const groupedConversations = useMemo(() => {
//     const now = new Date();

//     const today: ConversationListItem[] = [];
//     const yesterday: ConversationListItem[] = [];
//     const previous7Days: ConversationListItem[] = [];

//     filteredConversations.forEach(
//       (conversation) => {
//         const date = new Date(
//           conversation.updated_at
//         );

//         if (Number.isNaN(date.getTime())) {
//           return;
//         }

//         const diff =
//           now.getTime() - date.getTime();

//         const days =
//           diff / (1000 * 60 * 60 * 24);

//         // Today
//         if (
//           date.toDateString() ===
//           now.toDateString()
//         ) {
//           today.push(conversation);
//           return;
//         }

//         // Yesterday
//         if (days < 2) {
//           yesterday.push(conversation);
//           return;
//         }

//         // Previous 7 Days
//         if (days <= 7) {
//           previous7Days.push(conversation);
//         }
//       }
//     );

//     return {
//       today,
//       yesterday,
//       previous7Days,
//     };
//   }, [filteredConversations]);

//   // ==========================================================
//   // New Conversation
//   // ==========================================================

//   const handleNewConversation = async () => {
//     try {
//       setIsCreating(true);

//       await onNewConversation();
//     } catch (error) {
//       console.error(
//         "Failed to create conversation:",
//         error
//       );
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   // ==========================================================
//   // Conversation Selection
//   // ==========================================================

//   const handleSelectConversation = (
//     conversationId: string
//   ) => {
//     onSelectConversation(conversationId);
//   };

//   // ==========================================================
//   // Render
//   // ==========================================================

//   return (
//     <div
//       className="
//         flex
//         h-full
//         min-h-0
//         flex-col
//       "
//     >
//       {/* ======================================================
//           HEADER
//       ====================================================== */}

//       <div
//         className="
//           shrink-0
//           border-b
//           border-slate-200/60
//           p-4
//           dark:border-slate-800/70
//         "
//       >
//         {/* Brand */}

//         <div className="mb-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div
//               className="
//                 flex
//                 h-10
//                 w-10
//                 items-center
//                 justify-center
//                 rounded-xl
//                 bg-gradient-to-br
//                 from-emerald-500
//                 via-teal-500
//                 to-cyan-500
//                 text-white
//                 shadow-lg
//                 shadow-emerald-500/20
//               "
//             >
//               <Sparkles className="h-5 w-5" />
//             </div>

//             <div>
//               <p className="text-sm font-bold text-slate-900 dark:text-white">
//                 WellMind AI
//               </p>

//               <p className="text-[10px] text-slate-400">
//                 Your wellness companion
//               </p>
//             </div>
//           </div>

//           <button
//             type="button"
//             aria-label="More options"
//             className="
//               flex
//               h-8
//               w-8
//               items-center
//               justify-center
//               rounded-lg
//               text-slate-400
//               transition
//               hover:bg-slate-100
//               hover:text-slate-700
//               dark:hover:bg-slate-900
//               dark:hover:text-white
//             "
//           >
//             <MoreHorizontal className="h-4 w-4" />
//           </button>
//         </div>

//         {/* ==================================================
//             New Conversation
//         ================================================== */}

//         <button
//           type="button"
//           onClick={handleNewConversation}
//           disabled={isCreating}
//           className="
//             flex
//             w-full
//             items-center
//             justify-center
//             gap-2
//             rounded-xl
//             bg-gradient-to-r
//             from-emerald-500
//             via-teal-500
//             to-cyan-500
//             px-4
//             py-2.5
//             text-sm
//             font-semibold
//             text-white
//             shadow-md
//             shadow-emerald-500/20
//             transition-all
//             hover:-translate-y-0.5
//             hover:shadow-lg
//             hover:shadow-emerald-500/25
//             active:scale-[0.98]
//             disabled:cursor-not-allowed
//             disabled:opacity-60
//           "
//         >
//           {isCreating ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <Plus className="h-4 w-4" />
//           )}

//           {isCreating
//             ? "Creating..."
//             : "New Conversation"}
//         </button>

//         {/* ==================================================
//             Search
//         ================================================== */}

//         <div className="relative mt-3">
//           <Search
//             className="
//               absolute
//               left-3.5
//               top-1/2
//               h-4
//               w-4
//               -translate-y-1/2
//               text-slate-400
//             "
//           />

//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(event) =>
//               setSearchQuery(event.target.value)
//             }
//             placeholder="Search chats..."
//             className="
//               h-10
//               w-full
//               rounded-xl
//               border
//               border-slate-200/80
//               bg-slate-100/70
//               pl-10
//               pr-10
//               text-xs
//               text-slate-700
//               outline-none
//               transition-all
//               placeholder:text-slate-400
//               focus:border-emerald-400
//               focus:bg-white
//               focus:ring-4
//               focus:ring-emerald-500/10
//               dark:border-slate-800
//               dark:bg-slate-900/70
//               dark:text-white
//               dark:focus:bg-slate-900
//             "
//           />

//           {searchQuery && (
//             <button
//               type="button"
//               onClick={() => setSearchQuery("")}
//               aria-label="Clear search"
//               className="
//                 absolute
//                 right-3
//                 top-1/2
//                 -translate-y-1/2
//                 text-xs
//                 text-slate-400
//                 hover:text-slate-700
//                 dark:hover:text-white
//               "
//             >
//               ×
//             </button>
//           )}
//         </div>
//       </div>

//       {/* ======================================================
//           CONVERSATIONS
//       ====================================================== */}

//       <div
//         className="
//           min-h-0
//           flex-1
//           overflow-y-auto
//           px-3
//           py-5
//           scrollbar-thin
//           scrollbar-thumb-slate-300
//           dark:scrollbar-thumb-slate-700
//         "
//       >
//         {/* Loading */}

//         {isLoadingConversations && (
//           <div
//             className="
//               flex
//               items-center
//               justify-center
//               py-10
//             "
//           >
//             <Loader2
//               className="
//                 h-5
//                 w-5
//                 animate-spin
//                 text-emerald-500
//               "
//             />
//           </div>
//         )}

//         {/* Empty */}

//         {!isLoadingConversations &&
//           filteredConversations.length === 0 && (
//             <div className="px-4 py-10 text-center">
//               <MessageSquare
//                 className="
//                   mx-auto
//                   mb-3
//                   h-7
//                   w-7
//                   text-slate-300
//                   dark:text-slate-700
//                 "
//               />

//               <p
//                 className="
//                   text-xs
//                   font-medium
//                   text-slate-600
//                   dark:text-slate-300
//                 "
//               >
//                 {searchQuery
//                   ? "No conversations found"
//                   : "No conversations yet"}
//               </p>

//               <p className="mt-1 text-[10px] text-slate-400">
//                 {searchQuery
//                   ? "Try another search."
//                   : "Start a new conversation."}
//               </p>
//             </div>
//           )}

//         {/* Today */}

//         {!isLoadingConversations &&
//           groupedConversations.today.length > 0 && (
//             <SidebarGroup
//               title="Today"
//               conversations={
//                 groupedConversations.today
//               }
//               activeConversationId={
//                 activeConversationId
//               }
//               onSelectConversation={
//                 handleSelectConversation
//               }
//             />
//           )}

//         {/* Yesterday */}

//         {!isLoadingConversations &&
//           groupedConversations.yesterday.length >
//             0 && (
//             <SidebarGroup
//               title="Yesterday"
//               conversations={
//                 groupedConversations.yesterday
//               }
//               activeConversationId={
//                 activeConversationId
//               }
//               onSelectConversation={
//                 handleSelectConversation
//               }
//             />
//           )}

//         {/* Previous 7 Days */}

//         {!isLoadingConversations &&
//           groupedConversations.previous7Days
//             .length > 0 && (
//             <SidebarGroup
//               title="Previous 7 Days"
//               conversations={
//                 groupedConversations.previous7Days
//               }
//               activeConversationId={
//                 activeConversationId
//               }
//               onSelectConversation={
//                 handleSelectConversation
//               }
//             />
//           )}
//       </div>

//       {/* ======================================================
//           FOOTER
//       ====================================================== */}

//       <div
//         className="
//           shrink-0
//           border-t
//           border-slate-200/60
//           p-3
//           dark:border-slate-800/70
//         "
//       >
//         <button
//           type="button"
//           className="
//             flex
//             w-full
//             items-center
//             gap-3
//             rounded-xl
//             p-2
//             text-left
//             transition-all
//             hover:bg-slate-100
//             dark:hover:bg-slate-900
//           "
//         >
//           <div
//             className="
//               flex
//               h-9
//               w-9
//               shrink-0
//               items-center
//               justify-center
//               rounded-full
//               bg-gradient-to-br
//               from-indigo-500
//               to-violet-500
//               text-white
//             "
//           >
//             <User2 className="h-4 w-4" />
//           </div>

//           <div className="min-w-0 flex-1">
//             <p
//               className="
//                 truncate
//                 text-xs
//                 font-semibold
//                 text-slate-800
//                 dark:text-white
//               "
//             >
//               AK Shuvo
//             </p>

//             <p className="truncate text-[10px] text-slate-400">
//               Student Account
//             </p>
//           </div>

//           <Settings className="h-4 w-4 text-slate-400" />
//         </button>
//       </div>
//     </div>
//   );
// }

// // ==========================================================
// // Sidebar Group
// // ==========================================================

// function SidebarGroup({
//   title,
//   conversations,
//   activeConversationId,
//   onSelectConversation,
// }: {
//   title: string;
//   conversations: ConversationListItem[];
//   activeConversationId: string | null;
//   onSelectConversation: (
//     conversationId: string
//   ) => void;
// }) {
//   return (
//     <section className="mb-6">
//       <h3
//         className="
//           mb-2
//           px-2
//           text-[10px]
//           font-semibold
//           uppercase
//           tracking-widest
//           text-slate-400
//         "
//       >
//         {title}
//       </h3>

//       <div className="space-y-1">
//         {conversations.map((conversation) => (
//           <ConversationItem
//             key={conversation.id}
//             conversation={conversation}
//             active={
//               activeConversationId ===
//               conversation.id
//             }
//             onClick={() =>
//               onSelectConversation(
//                 conversation.id
//               )
//             }
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

// // ==========================================================
// // Conversation Item
// // ==========================================================

// function ConversationItem({
//   conversation,
//   active,
//   onClick,
// }: {
//   conversation: ConversationListItem;
//   active: boolean;
//   onClick: () => void;
// }) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       aria-current={active ? "page" : undefined}
//       className={`
//         group
//         relative
//         flex
//         w-full
//         items-center
//         gap-2.5
//         rounded-xl
//         px-2.5
//         py-2.5
//         text-left
//         transition-all

//         ${
//           active
//             ? `
//               bg-emerald-50
//               dark:bg-emerald-950/30
//             `
//             : `
//               hover:bg-slate-100
//               dark:hover:bg-slate-900
//             `
//         }
//       `}
//     >
//       {/* Active Indicator */}

//       {active && (
//         <span
//           className="
//             absolute
//             left-0
//             top-2
//             bottom-2
//             w-0.5
//             rounded-full
//             bg-gradient-to-b
//             from-emerald-400
//             to-cyan-400
//           "
//         />
//       )}

//       {/* Icon */}

//       <div
//         className={`
//           flex
//           h-8
//           w-8
//           shrink-0
//           items-center
//           justify-center
//           rounded-lg
//           transition-all

//           ${
//             active
//               ? `
//                 bg-emerald-100
//                 text-emerald-600
//                 dark:bg-emerald-900/50
//                 dark:text-emerald-400
//               `
//               : `
//                 bg-slate-100
//                 text-slate-400
//                 group-hover:bg-white
//                 group-hover:text-emerald-500
//                 dark:bg-slate-900
//                 dark:group-hover:bg-slate-800
//               `
//           }
//         `}
//       >
//         <MessageSquare className="h-3.5 w-3.5" />
//       </div>

//       {/* Text */}

//       <div className="min-w-0 flex-1">
//         <p
//           className={`
//             truncate
//             text-xs
//             font-medium

//             ${
//               active
//                 ? `
//                   text-emerald-700
//                   dark:text-emerald-300
//                 `
//                 : `
//                   text-slate-700
//                   dark:text-slate-300
//                 `
//             }
//           `}
//         >
//           {conversation.title || "Untitled Conversation"}
//         </p>

//         <p className="mt-0.5 text-[10px] text-slate-400">
//           {formatConversationDate(
//             conversation.updated_at
//           )}
//         </p>
//       </div>

//       {/* More */}

//       <MoreHorizontal
//         className="
//           h-4
//           w-4
//           shrink-0
//           text-slate-400
//           opacity-0
//           transition
//           group-hover:opacity-100
//         "
//       />
//     </button>
//   );
// }

// // ==========================================================
// // Date Formatter
// // ==========================================================

// function formatConversationDate(
//   dateString: string
// ) {
//   const date = new Date(dateString);

//   if (Number.isNaN(date.getTime())) {
//     return "";
//   }

//   return date.toLocaleDateString(undefined, {
//     month: "short",
//     day: "numeric",
//   });
// }