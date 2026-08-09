"use client";

import { useRef, useState } from "react";

import MessageInput from "./MessageInput";
import SendButton from "./SendButton";
import InputFooter from "./InputFooter";

/* ==========================================================
   Props
========================================================== */

interface ChatInputProps {
    onSend: (message: string) => void | Promise<void>;

    isLoading?: boolean;

    disabled?: boolean;

    placeholder?: string;
}

/* ==========================================================
   Component
========================================================== */

export default function ChatInput({
    onSend,
    isLoading = false,
    disabled = false,
    placeholder = "Message WellMind AI...",
}: ChatInputProps) {
    /* ========================================================
       State
    ======================================================== */

    const [message, setMessage] = useState("");

    const textareaRef =
        useRef<HTMLTextAreaElement>(null);

    /* ========================================================
       Auto Resize
    ======================================================== */

    const resizeTextarea = () => {
        const textarea =
            textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "0px";

        textarea.style.height = `${Math.min(
            textarea.scrollHeight,
            180
        )}px`;
    };

    /* ========================================================
       Reset Height
    ======================================================== */

    const resetTextarea = () => {
        const textarea =
            textareaRef.current;

        if (!textarea) return;

        textarea.style.height = "24px";
    };

    /* ========================================================
       Send
    ======================================================== */

    const handleSend = async () => {
        const value = message.trim();

        if (
            !value ||
            disabled ||
            isLoading
        )
            return;

        await onSend(value);

        setMessage("");

        resetTextarea();
    };

    /* ========================================================
       Enter
    ======================================================== */

    const handleKeyDown = async (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            await handleSend();
        }
    };

    /* ========================================================
       Change
    ======================================================== */

    const handleChange = (
        value: string
    ) => {
        setMessage(value);

        requestAnimationFrame(() => {
            resizeTextarea();
        });
    };

    /* ========================================================
       Render
    ======================================================== */

    return (
        <div
            className="
        border-t
        border-slate-200/70

        bg-white/80

        px-4
        py-4

        backdrop-blur-2xl

        dark:border-slate-800
        dark:bg-slate-950/80
      "
        >
            <div
                className="
          mx-auto
          w-full
          max-w-4xl
        "
            >
                <div
                    className="
            flex
            items-end
            gap-3

            rounded-[28px]

            border
            border-slate-200

            bg-white

            px-4
            py-3

            shadow-lg
            shadow-slate-200/40

            transition-all
            duration-200

            focus-within:border-indigo-500
            focus-within:shadow-indigo-100
            focus-within:ring-4
            focus-within:ring-indigo-100

            dark:border-slate-700
            dark:bg-slate-900
            dark:shadow-black/20
            dark:focus-within:ring-indigo-900/30
          "
                >
                    <MessageInput
                        ref={textareaRef}
                        value={message}
                        placeholder={placeholder}
                        disabled={
                            disabled ||
                            isLoading
                        }
                        onChange={
                            handleChange
                        }
                        onKeyDown={
                            handleKeyDown
                        }
                    />

                    <SendButton
                        onClick={handleSend}
                        isLoading={isLoading}
                        disabled={
                            disabled ||
                            message.trim().length === 0
                        }
                    />
                </div>

                <InputFooter />
            </div>
        </div>
    );
}