"use client";

interface SidebarOverlayProps {
  open: boolean;
  onClose: () =>void;
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

        bg-black/40
        backdrop-blur-sm

        lg:hidden
      "
    />
  );
}