"use client";

interface SidebarOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function SidebarOverlay({
  open,
  onClose,
}: SidebarOverlayProps) {
  if (!open) return null;

  return (
    <button
      type="button"
      aria-label="Close sidebar"
      onClick={onClose}
      className="
        fixed
        inset-0
        z-[60]

        bg-slate-950/30
        backdrop-blur-[2px]

        transition-opacity
        duration-300

        lg:hidden

        dark:bg-black/50
      "
    />
  );
}