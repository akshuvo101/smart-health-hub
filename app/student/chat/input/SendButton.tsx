"use client";

import { ArrowUp, Loader2 } from "lucide-react";

/* ==========================================================
   Props
========================================================== */

interface SendButtonProps {
  onClick: () => void | Promise<void>;

  disabled?: boolean;

  isLoading?: boolean;
}

/* ==========================================================
   Component
========================================================== */

export default function SendButton({
  onClick,
  disabled = false,
  isLoading = false,
}: SendButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label="Send message"
      className="
        flex
        h-11
        w-11
        shrink-0

        items-center
        justify-center

        rounded-full

        bg-slate-900

        text-white

        transition-all
        duration-200

        hover:scale-105
        hover:bg-slate-800

        active:scale-95

        disabled:cursor-not-allowed
        disabled:scale-100
        disabled:bg-slate-300

        dark:bg-white
        dark:text-slate-900
        dark:hover:bg-slate-200
        dark:disabled:bg-slate-700
      "
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <ArrowUp className="h-5 w-5" />
      )}
    </button>
  );
}