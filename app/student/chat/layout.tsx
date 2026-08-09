
"use client";

import { useState } from "react";

import ChatLayout from "./components/layout/ChatLayout";
import ChatHeader from "./components/chat/ChatHeader";

import DesktopSidebar from "./components/layout/DesktopSidebar";
import MobileSidebar from "./components/layout/MobileSidebar";
import SidebarOverlay from "./components/layout/SidebarOverlay";

export default function StudentChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      className="
        flex
        h-[calc(100vh-80px)]
        min-h-0
        overflow-hidden
      "
    >
      <DesktopSidebar />

      <MobileSidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <SidebarOverlay
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div
        className="
          flex
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
            />
          }
        >
          {children}
        </ChatLayout>
      </div>
    </div>
  );
}