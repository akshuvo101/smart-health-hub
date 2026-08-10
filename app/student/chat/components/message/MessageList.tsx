
"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import EmptyState from "../chat/EmptyState";
import TypingIndicator from "./TypingIndicator";

import { ChatMessage } from "../../types/message";
import { formatTime } from "../utils/format-time";

/* ==========================================================
   Props
========================================================== */

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

/* ==========================================================
   Component
========================================================== */

export default function MessageList({
  messages,
  isLoading,
}: MessageListProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  /* ========================================================
     Auto Scroll
  ======================================================== */

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  /* ========================================================
     Empty State
  ======================================================== */

  if (
    messages.length === 0 &&
    !isLoading
  ) {
    return (
      <div
        className="
          flex
          h-full
          items-center
          justify-center

          px-4
          py-8
        "
      >
        <EmptyState />
      </div>
    );
  }

  /* ========================================================
     Render
  ======================================================== */

  return (
    <div
      ref={containerRef}
      className="
        h-full
        min-h-0
        overflow-y-auto
        overscroll-contain

        scroll-smooth

        px-3
        py-6

        sm:px-4
        sm:py-8

        md:px-6

        lg:px-8

        [scrollbar-width:thin]
        [scrollbar-color:rgb(203_213_225)_transparent]

        dark:[scrollbar-color:rgb(51_65_85)_transparent]
      "
    >
      <div
        className="
          mx-auto

          flex
          w-full
          max-w-4xl
          flex-col

          gap-5

          sm:gap-6

          pb-4
          sm:pb-6
        "
      >
        {/* ==================================================
            Messages
        ================================================== */}

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            time={formatTime(
              message.createdAt
            )}
          />
        ))}

        {/* ==================================================
            Typing Indicator
        ================================================== */}

        {isLoading && (
          <TypingIndicator />
        )}

        {/* ==================================================
            Scroll Anchor
        ================================================== */}

        <div
          ref={bottomRef}
          className="h-px w-full"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

