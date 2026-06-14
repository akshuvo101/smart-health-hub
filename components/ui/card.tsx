import { HTMLAttributes } from "react";
import clsx from "clsx";

interface CardProps
  extends HTMLAttributes<HTMLDivElement> {}

export default function Card({
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        `
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        duration-300

        dark:border-slate-800
        dark:bg-slate-900
        `,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}