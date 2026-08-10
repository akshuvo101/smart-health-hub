
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

        textarea.style.height = "auto";

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
        ) {
            return;
        }

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
        w-full

        border-t
        border-slate-200/70

        bg-white/85

        px-3
       pt-2.5
pb-2.5

sm:pt-3
sm:pb-3

        backdrop-blur-2xl

        dark:border-slate-800/80
        dark:bg-slate-950/85
      "
        >
            <div
                className="
          mx-auto
          w-full
          max-w-4xl
        "
            >
                {/* =================================================
            Input Box
        ================================================= */}

                <div
                    className="
            flex
            items-end
            gap-2

            rounded-[26px]

            border
            border-slate-200

            bg-white

            px-3
            py-2.5

            shadow-sm
            shadow-slate-200/60

            transition-all
            duration-200

            focus-within:border-indigo-400
            focus-within:shadow-lg
            focus-within:shadow-indigo-500/10
            focus-within:ring-4
            focus-within:ring-indigo-500/10

            sm:gap-3
            sm:px-4
            sm:py-3

            dark:border-slate-700
            dark:bg-slate-900
            dark:shadow-black/20

            dark:focus-within:border-indigo-500
            dark:focus-within:ring-indigo-500/10
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
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
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

                {/* =================================================
            Footer
        ================================================= */}

                <InputFooter />
            </div>
        </div>
    );
}

