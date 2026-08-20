"use client";

import SidebarContent from "./SidebarContent";

interface DesktopSidebarProps {
  activeConversationId: string | null;

  onSelectConversation: (
    conversationId: string
  ) => void;

  onNewConversation: () => Promise<void>;
}

export default function DesktopSidebar({
  activeConversationId,
  onSelectConversation,
  onNewConversation,
}: DesktopSidebarProps) {
  return (
    <aside
      aria-label="Chat conversations"
      className="
        hidden
        h-full
        w-[280px]
        shrink-0
        flex-col
        overflow-hidden

        border-r
        border-slate-200/60

        bg-white/75
        backdrop-blur-2xl

        dark:border-slate-800/70
        dark:bg-slate-950/75

        lg:flex
      "
    >
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
    </aside>
  );
}



// "use client";

// import SidebarContent from "./SidebarContent";

// interface DesktopSidebarProps {
//   activeConversationId: string | null;

//   onSelectConversation: (
//     id: string
//   ) => void;

//   onNewConversation: () => Promise<void>;
// }

// export default function DesktopSidebar({
//   activeConversationId,
//   onSelectConversation,
//   onNewConversation,
// }: DesktopSidebarProps) {
//   return (
//     <aside
//       className="
//         hidden
//         h-full
//         w-[280px]
//         shrink-0
//         flex-col

//         border-r
//         border-slate-200/60

//         bg-white/75
//         backdrop-blur-2xl

//         dark:border-slate-800/70
//         dark:bg-slate-950/75

//         lg:flex
//       "
//     >
//       <SidebarContent
//         activeConversationId={
//           activeConversationId
//         }
//         onSelectConversation={
//           onSelectConversation
//         }
//         onNewConversation={
//           onNewConversation
//         }
//       />
//     </aside>
//   );
// }