"use client";

import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";
import EmptyState from "../chat/EmptyState";
import TypingIndicator from "./TypingIndicator";

import { ChatMessage } from "../../types/message";
import { formatTime } from "../utils/format-time";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export default function MessageList({
  messages,
  isLoading,
}: MessageListProps) {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  /**
   * Auto Scroll
   */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  /**
   * Empty
   */
  if (
    messages.length === 0 &&
    !isLoading
  ) {
    return <EmptyState />;
  }

  return (
    <div
      ref={containerRef}
      className="
        h-full
        overflow-y-auto
        scroll-smooth

        px-4
        py-8

        md:px-6
        lg:px-8
      "
    >
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-4xl
          flex-col
          gap-6
          pb-8
        "
      >
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

        {isLoading && (
          <TypingIndicator />
        )}

        <div
          ref={bottomRef}
          className="h-2"
        />
      </div>
    </div>
  );
}