
"use client";

/* ==========================================================
   Props
========================================================== */

interface InputFooterProps {
  className?: string;
}

/* ==========================================================
   Component
========================================================== */

export default function InputFooter({
  className = "",
}: InputFooterProps) {
  return (
    <div
      className={`
        mt-2

        flex
        items-center
        justify-center
        gap-2

        text-center
        text-[10px]
        sm:text-xs

        text-slate-400

        dark:text-slate-500

        ${className}
      `}
    >
      {/* Enter */}

      <span>
        Press{" "}
        <kbd
          className="
            font-medium
            text-slate-500

            dark:text-slate-400
          "
        >
          Enter
        </kbd>{" "}
        to send
      </span>

      <span
        className="
          text-slate-300
          dark:text-slate-700
        "
      >
        •
      </span>

      {/* Shift + Enter */}

      <span>
        <kbd
          className="
            font-medium
            text-slate-500

            dark:text-slate-400
          "
        >
          Shift + Enter
        </kbd>{" "}
        <span className="hidden sm:inline">
          for a new line
        </span>
        <span className="sm:hidden">
          new line
        </span>
      </span>
    </div>
  );
}

