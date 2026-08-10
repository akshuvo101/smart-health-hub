
"use client";

import { usePathname } from "next/navigation";

import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

import {
  StudentSidebarProvider,
  useStudentSidebar,
} from "./student-sidebar-context";

/* ==========================================================
   Student Shell Content
========================================================== */

function StudentShellContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const { collapsed } =
    useStudentSidebar();

  /* ========================================================
     Detect Chat Page
  ======================================================== */

  const isChatPage =
    pathname.startsWith("/student/chat");

  /* ========================================================
     Chat Layout
     
     IMPORTANT:
     Chat should NOT be inside dashboard
     header/sidebar/main layout.
  ======================================================== */

  if (isChatPage) {
    return (
      <div className="h-[100dvh] w-full overflow-hidden">
        {children}
      </div>
    );
  }

  /* ========================================================
     Normal Student Pages
  ======================================================== */

  return (
    <div
      className={`
        min-h-screen

        transition-[padding]
        duration-300
        ease-in-out

        ${
          collapsed
            ? "lg:pl-[92px]"
            : "lg:pl-[276px]"
        }
      `}
    >
      {/* Dashboard Sidebar */}

      <Sidebar />

      {/* Dashboard Header */}

      <Header />

      {/* Page Content */}

      <main
        className="
          p-4
          sm:p-5
          lg:p-6
        "
      >
        {children}
      </main>
    </div>
  );
}

/* ==========================================================
   Student Shell
========================================================== */

export default function StudentShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StudentSidebarProvider>
      <StudentShellContent>
        {children}
      </StudentShellContent>
    </StudentSidebarProvider>
  );
}

