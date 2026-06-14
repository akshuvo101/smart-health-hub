import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-2xl",

        {
          // Variants
          "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 hover:-translate-y-1 hover:shadow-xl":
            variant === "default",

          "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800":
            variant === "outline",

          "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800":
            variant === "ghost",
        },

        {
          // Sizes
          "px-3 py-2 text-sm": size === "sm",
          "px-5 py-3 text-sm": size === "md",
          "px-6 py-4 text-base": size === "lg",
        },

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}