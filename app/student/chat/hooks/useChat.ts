"use client";

import { useState } from "react";

import { ChatMessage } from "../types/message";
import { mockMessages } from "../data/mock-messages";

const TYPING_SPEED = 18;

export function useChat() {
  const [messages, setMessages] =
    useState<ChatMessage[]>(mockMessages);

  const [isLoading, setIsLoading] =
    useState(false);

  /**
   * Character by character animation
   */

  const animateAssistantMessage = async (
    id: string,
    text: string
  ) => {
    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, TYPING_SPEED)
      );

      setMessages((prev) =>
        prev.map((message) =>
          message.id === id
            ? {
                ...message,
                content: text.slice(0, i),
                isTyping: i !== text.length,
                status:
                  i === text.length
                    ? "completed"
                    : "typing",
              }
            : message
        )
      );
    }
  };

  /**
   * Send message
   */

  const sendMessage = async (
    text: string
  ) => {
    const value = text.trim();

    if (!value || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),

      role: "user",

      content: value,

      createdAt: new Date().toISOString(),

      status: "sent",
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      const response = await fetch(
        "/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            messages: updatedMessages.map(
              (message) => ({
                role: message.role,
                content: message.content,
              })
            ),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to generate AI response."
        );
      }

      const data =
        await response.json();

      /**
       * Empty assistant message
       */

      const assistantId =
        crypto.randomUUID();

      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,

          role: "assistant",

          content: "",

          createdAt:
            new Date().toISOString(),

          isTyping: true,

          status: "typing",
        },
      ]);

      /**
       * Animate response
       */

      await animateAssistantMessage(
        assistantId,
        data.message
      );
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),

          role: "assistant",

          content:
            "Sorry, something went wrong. Please try again.",

          createdAt:
            new Date().toISOString(),

          status: "error",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Clear conversation
   */

  const clearConversation = () => {
    setMessages([]);
  };

  return {
    messages,

    isLoading,

    sendMessage,

    clearConversation,
  };
}