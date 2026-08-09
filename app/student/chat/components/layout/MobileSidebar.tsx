"use client";

import SidebarContent from "./SidebarContent";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileSidebar({
  open,
  onClose,
}: MobileSidebarProps) {
  return (
    <aside
      className={`
        fixed
        inset-y-0
        left-0

        z-50

        w-80
        max-w-[85vw]

        bg-white

        dark:bg-slate-950

        border-r
        border-slate-200

        dark:border-slate-800

        shadow-2xl

        transition-transform
        duration-300

        lg:hidden

        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
    >
      <SidebarContent />

    </aside>
  );
}