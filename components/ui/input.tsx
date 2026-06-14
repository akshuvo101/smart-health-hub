import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className,
  ...props
}: InputProps) {
  return (
    <input
      className={clsx(
        `
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        px-4
        py-3
        text-sm
        outline-none
        transition-all

        focus:border-emerald-500
        focus:ring-4
        focus:ring-emerald-500/10

        dark:border-slate-700
        dark:bg-slate-950
        dark:text-white
        `,
        className
      )}
      {...props}
    />
  );
}