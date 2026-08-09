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
        mt-3

        flex
        items-center
        justify-center
        gap-2

        text-center
        text-xs

        text-slate-400

        dark:text-slate-500

        ${className}
      `}
    >
      <span>
        Press{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          Enter
        </span>{" "}
        to send
      </span>

      <span>•</span>

      <span>
        <span className="font-medium text-slate-600 dark:text-slate-300">
          Shift + Enter
        </span>{" "}
        for a new line
      </span>
    </div>
  );
}