"use client";

import SidebarContent from "./SidebarContent";

/* ==========================================================
   Component
========================================================== */

export default function DesktopSidebar() {
  return (
    <aside
      className="
        hidden
        lg:flex

        h-full
        w-[320px]
        shrink-0
        flex-col

        border-r
        border-slate-200/70

        bg-white/80

        backdrop-blur-2xl

        dark:border-slate-800
        dark:bg-slate-950/80
      "
    >
      <SidebarContent />
    </aside>
  );
}