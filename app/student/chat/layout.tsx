"use client";

import { useState } from "react";

import ChatLayout from "./components/layout/ChatLayout";
import ChatHeader from "./components/chat/ChatHeader";

import DesktopSidebar from "./components/layout/DesktopSidebar";
import MobileSidebar from "./components/layout/MobileSidebar";
import SidebarOverlay from "./components/layout/SidebarOverlay";

import {
  ChatProvider,
  useChatContext,
} from "./context/ChatContext";

function StudentChatLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    activeConversationId,
    selectConversation,
    createConversation,
    deleteConversation,
  } = useChatContext();

  const handleSelectConversation = (
    id: string
  ) => {
    selectConversation(id);
    setSidebarOpen(false);
  };

  const handleDeleteConversation = async () => {
    if (!activeConversationId) {
      return;
    }

    const confirmed = window.confirm(
      "Delete this conversation? This cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    await deleteConversation(activeConversationId);
  };

  const handleNewConversation = async () => {
    await createConversation();
    setSidebarOpen(false);
  };


  return (
    <div
      className="
          relative
          flex
          h-[100dvh]
          w-full
          min-h-0
          overflow-hidden

          bg-slate-50

          dark:bg-slate-950
        "
    >
        {/* ==================================================
            Desktop Sidebar
        ================================================== */}

        <DesktopSidebar
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
        />

        {/* ==================================================
            Mobile Sidebar
        ================================================== */}

        <MobileSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeConversationId={activeConversationId}
          onSelectConversation={handleSelectConversation}
          onNewConversation={handleNewConversation}
        />

        {/* ==================================================
            Mobile Overlay
        ================================================== */}

        <SidebarOverlay
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* ==================================================
            Main Chat Layout
        ================================================== */}

        <div
          className="
            flex
            min-w-0
            min-h-0
            flex-1
            flex-col
            overflow-hidden
          "
        >
          <ChatLayout
            header={
              <ChatHeader
                onMenuClick={() =>
                  setSidebarOpen(true)
                }
                onDeleteConversation={
                  handleDeleteConversation
                }
                canDeleteConversation={
                  Boolean(activeConversationId)
                }
              />
            }
          >
            {children}
          </ChatLayout>
        </div>
      </div>
  );
}

export default function StudentChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChatProvider>
      <StudentChatLayoutContent>
        {children}
      </StudentChatLayoutContent>
    </ChatProvider>
  );
}
