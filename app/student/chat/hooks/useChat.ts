"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { ChatMessage } from "../types/message";

const TYPING_SPEED = 18;

interface DatabaseMessage {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  token_count?: number | null;
  created_at: string;
}

interface UseChatOptions {
  conversationId: string | null;
}

export function useChat({
  conversationId,
}: UseChatOptions) {
  const [messages, setMessages] = useState<
    ChatMessage[]
  >([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isLoadingMessages, setIsLoadingMessages] =
    useState(false);

  const abortControllerRef =
    useRef<AbortController | null>(null);

  // ==========================================================
  // Convert Database Message -> UI Message
  // ==========================================================

  const mapDatabaseMessage = useCallback(
    (message: DatabaseMessage): ChatMessage => {
      return {
        id: message.id,

        conversationId:
          message.conversation_id,

        role: message.role,

        content: message.content,

        createdAt: message.created_at,

        status: "completed",

        isTyping: false,
      };
    },
    []
  );

  // ==========================================================
  // Load Conversation Messages
  // ==========================================================

  const loadMessages = useCallback(
    async (id: string) => {
      try {
        setIsLoadingMessages(true);

        // Cancel previous request
        abortControllerRef.current?.abort();

        const controller =
          new AbortController();

        abortControllerRef.current =
          controller;

        const response = await fetch(
          `/api/chat/conversations/${id}/messages`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Failed to load messages."
          );
        }

        const databaseMessages: DatabaseMessage[] =
          result.data ?? [];

        const mappedMessages =
          databaseMessages.map(
            mapDatabaseMessage
          );

        setMessages(mappedMessages);
      } catch (error) {
        // Ignore aborted requests
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Failed to load conversation messages:",
          error
        );

        setMessages([]);
      } finally {
        setIsLoadingMessages(false);
      }
    },
    [mapDatabaseMessage]
  );

  // ==========================================================
  // Load messages whenever conversation changes
  // ==========================================================

  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      setIsLoadingMessages(false);

      return;
    }

    loadMessages(conversationId);

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [
    conversationId,
    loadMessages,
  ]);

  // ==========================================================
  // Animate Assistant Message
  // ==========================================================

  const animateAssistantMessage = useCallback(
    async (
      id: string,
      text: string
    ) => {
      for (
        let i = 0;
        i <= text.length;
        i++
      ) {
        await new Promise((resolve) =>
          setTimeout(
            resolve,
            TYPING_SPEED
          )
        );

        setMessages((prev) =>
          prev.map((message) =>
            message.id === id
              ? {
                  ...message,

                  content:
                    text.slice(0, i),

                  isTyping:
                    i !== text.length,

                  status:
                    i === text.length
                      ? "completed"
                      : "typing",
                }
              : message
          )
        );
      }
    },
    []
  );

  // ==========================================================
  // Send Message
  // ==========================================================

  const sendMessage = useCallback(
    async (text: string) => {
      const value = text.trim();

      if (
        !value ||
        isLoading ||
        !conversationId
      ) {
        return;
      }

      // ------------------------------------------------------
      // Temporary user message
      // ------------------------------------------------------

      const temporaryUserMessage: ChatMessage =
        {
          id: `temp-${crypto.randomUUID()}`,

          conversationId,

          role: "user",

          content: value,

          createdAt:
            new Date().toISOString(),

          status: "sent",

          isTyping: false,
        };

      // Show immediately
      setMessages((prev) => [
        ...prev,
        temporaryUserMessage,
      ]);

      setIsLoading(true);

      try {
        // ----------------------------------------------------
        // Send to Conversation API
        // ----------------------------------------------------

        const response = await fetch(
          `/api/chat/conversations/${conversationId}/messages`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              content: value,
            }),
          }
        );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
              "Failed to send message."
          );
        }

        // ----------------------------------------------------
        // Backend response
        //
        // {
        //   userMessage,
        //   assistantMessage
        // }
        // ----------------------------------------------------

        const userMessage: DatabaseMessage =
          result.data?.userMessage;

        const assistantMessage: DatabaseMessage =
          result.data?.assistantMessage;

        if (!userMessage) {
          throw new Error(
            "User message was not returned."
          );
        }

        if (!assistantMessage) {
          throw new Error(
            "Assistant message was not returned."
          );
        }

        // ----------------------------------------------------
        // Convert database messages
        // ----------------------------------------------------

        const mappedUserMessage =
          mapDatabaseMessage(
            userMessage
          );

        const mappedAssistantMessage =
          mapDatabaseMessage(
            assistantMessage
          );

        // ----------------------------------------------------
        // Replace temporary user message
        // with real DB user message
        // and add assistant message
        // ----------------------------------------------------

        setMessages((prev) => {
          const withoutTemporary =
            prev.filter(
              (message) =>
                message.id !==
                temporaryUserMessage.id
            );

          return [
            ...withoutTemporary,

            mappedUserMessage,

            {
              ...mappedAssistantMessage,

              content: "",

              isTyping: true,

              status: "typing",
            },
          ];
        });

        // ----------------------------------------------------
        // Animate assistant response
        // ----------------------------------------------------

        await animateAssistantMessage(
          mappedAssistantMessage.id,
          mappedAssistantMessage.content
        );
      } catch (error) {
        console.error(
          "Failed to send chat message:",
          error
        );

        // ----------------------------------------------------
        // Remove temporary message and
        // show error assistant message
        // ----------------------------------------------------

        setMessages((prev) => [
          ...prev.filter(
            (message) =>
              message.id !==
              temporaryUserMessage.id
          ),

          {
            id: `error-${crypto.randomUUID()}`,

            conversationId,

            role: "assistant",

            content:
              "Sorry, something went wrong. Please try again.",

            createdAt:
              new Date().toISOString(),

            status: "error",

            isTyping: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [
      conversationId,
      isLoading,
      mapDatabaseMessage,
      animateAssistantMessage,
    ]
  );

  // ==========================================================
  // Clear Conversation
  // ==========================================================

  const clearConversation =
    useCallback(() => {
      setMessages([]);
    }, []);

  // ==========================================================
  // Reload Messages
  // ==========================================================

  const reloadMessages =
    useCallback(async () => {
      if (!conversationId) {
        setMessages([]);
        return;
      }

      await loadMessages(
        conversationId
      );
    }, [
      conversationId,
      loadMessages,
    ]);

  // ==========================================================
  // Cleanup
  // ==========================================================

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  // ==========================================================
  // Return
  // ==========================================================

  return {
    messages,

    isLoading,

    isLoadingMessages,

    sendMessage,

    clearConversation,

    reloadMessages,
  };
}