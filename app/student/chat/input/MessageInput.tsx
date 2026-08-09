

"use client";

import {
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

/* ==========================================================
   Props
========================================================== */

interface MessageInputProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "onChange"
  > {
  value: string;

  onChange: (value: string) => void;
}

/* ==========================================================
   Component
========================================================== */

const MessageInput = forwardRef<
  HTMLTextAreaElement,
  MessageInputProps
>(
  (
    {
      value,
      onChange,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className={`
          min-h-[24px]
          max-h-[180px]

          flex-1

          resize-none
          overflow-y-auto

          bg-transparent

          text-[15px]
          leading-7

          text-slate-800
          placeholder:text-slate-400

          outline-none

          dark:text-slate-100
          dark:placeholder:text-slate-500

          ${className}
        `}
        {...props}
      />
    );
  }
);

MessageInput.displayName =
  "MessageInput";

export default MessageInput;