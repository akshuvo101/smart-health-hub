"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ConversationListItem,
  AIMessage,
} from "@/types/ai-chat";
import { ChatMessage } from "../types/message";

// ==========================================================
// Helper
// ==========================================================

const mapAIMessageToChatMessage = (
  message: AIMessage
): ChatMessage => ({
  id: message.id,
  conversationId: message.conversation_id,
  role: message.role,
  content: message.content,
  createdAt: message.created_at,
  status: "completed",
  isTyping: false,
});

// ==========================================================
// Types
// ==========================================================

interface ChatContextValue {
  // Conversations
  conversations: ConversationListItem[];

  // Current conversation messages
  messages: ChatMessage[];

  // Active conversation
  activeConversationId: string | null;

  // Loading states
  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;

  // Error
  error: string | null;

  // Actions
  loadConversations: () => Promise<void>;

  selectConversation: (
    conversationId: string
  ) => void;

  createConversation: () => Promise<string>;

  sendMessage: (
    text: string,
    conversationId?: string
  ) => Promise<void>;

  deleteConversation: (
    conversationId: string
  ) => Promise<void>;

  clearConversation: () => void;
}

// ==========================================================
// Context
// ==========================================================

const ChatContext =
  createContext<ChatContextValue | undefined>(
    undefined
  );

// ==========================================================
// Provider
// ==========================================================

export function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ========================================================
  // Conversations
  // ========================================================

  const [
    conversations,
    setConversations,
  ] = useState<ConversationListItem[]>([]);

  // ========================================================
  // Messages
  // ========================================================

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  // ========================================================
  // Active Conversation
  // ========================================================

  const [
    activeConversationId,
    setActiveConversationId,
  ] = useState<string | null>(null);

  // ========================================================
  // Loading States
  // ========================================================

  const [
    isLoadingConversations,
    setIsLoadingConversations,
  ] = useState(true);

  const [
    isLoadingMessages,
    setIsLoadingMessages,
  ] = useState(false);

  const [
    isSendingMessage,
    setIsSendingMessage,
  ] = useState(false);

  // ========================================================
  // Error
  // ========================================================

  const [error, setError] =
    useState<string | null>(null);

  // ========================================================
  // Load Conversations
  // ========================================================

  const loadConversations =
    useCallback(async () => {
      try {
        setIsLoadingConversations(true);
        setError(null);

        const response = await fetch(
          "/api/chat/conversations",
          {
            method: "GET",
            cache: "no-store",
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
              "Failed to fetch conversations."
          );
        }

        const data: ConversationListItem[] =
          result.data ?? [];

        /*
         * Keep conversations sorted by
         * most recently updated.
         */
        const sortedConversations =
          [...data].sort(
            (a, b) =>
              new Date(
                b.updated_at
              ).getTime() -
              new Date(
                a.updated_at
              ).getTime()
          );

        setConversations(
          sortedConversations
        );

        /*
         * Automatically select the latest
         * conversation if there is no active
         * conversation.
         *
         * If the current conversation still
         * exists, keep it active.
         */
        setActiveConversationId(
          (current) => {
            if (current) {
              const exists =
                sortedConversations.some(
                  (conversation) =>
                    conversation.id ===
                    current
                );

              if (exists) {
                return current;
              }
            }

            return (
              sortedConversations[0]?.id ??
              null
            );
          }
        );
      } catch (error) {
        console.error(
          "Failed to load conversations:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load conversations."
        );
      } finally {
        setIsLoadingConversations(false);
      }
    }, []);

  // ========================================================
  // Initial Conversation Load
  // ========================================================

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  // ========================================================
  // Load Messages
  // ========================================================

  const loadMessages = useCallback(
    async (conversationId: string) => {
      try {
        setIsLoadingMessages(true);
        setError(null);

        const response = await fetch(
          `/api/chat/conversations/${conversationId}/messages`,
          {
            method: "GET",
            cache: "no-store",
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
              "Failed to fetch messages."
          );
        }

        setMessages(
          (result.data ?? []).map(
            mapAIMessageToChatMessage
          )
        );
      } catch (error) {
        console.error(
          "Failed to load messages:",
          error
        );

        setMessages([]);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load messages."
        );
      } finally {
        setIsLoadingMessages(false);
      }
    },
    []
  );

  // ========================================================
  // Load Messages Whenever Active Conversation Changes
  // ========================================================

  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }

    loadMessages(
      activeConversationId
    );
  }, [
    activeConversationId,
    loadMessages,
  ]);

  // ========================================================
  // Select Conversation
  // ========================================================

  const selectConversation =
    useCallback(
      (conversationId: string) => {
        if (
          conversationId ===
          activeConversationId
        ) {
          return;
        }

        /*
         * We intentionally do NOT call
         * loadMessages() here.
         *
         * The activeConversationId change
         * triggers the useEffect above.
         *
         * This prevents duplicate API requests.
         */
        setActiveConversationId(
          conversationId
        );
      },
      [activeConversationId]
    );

  // ========================================================
  // Create Conversation
  // ========================================================

  const createConversation =
    useCallback(async () => {
      try {
        setError(null);

        const response = await fetch(
          "/api/chat/conversations",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              title:
                "New Conversation",
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
              "Failed to create conversation."
          );
        }

        const newConversation: ConversationListItem =
          result.data;

        /*
         * Put the new conversation
         * at the top of the sidebar.
         */
        setConversations((prev) => [
          newConversation,

          ...prev.filter(
            (conversation) =>
              conversation.id !==
              newConversation.id
          ),
        ]);

        /*
         * Make the new conversation active.
         *
         * The active conversation effect
         * will load its messages.
         */
        setActiveConversationId(
          newConversation.id
        );

        /*
         * New conversation starts empty.
         */
        setMessages([]);

        return newConversation.id;
      } catch (error) {
        console.error(
          "Failed to create conversation:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to create conversation."
        );

        throw error;
      }
    }, []);

  // ========================================================
  // Send Message
  // ========================================================

  const sendMessage = useCallback(
    async (
      text: string,
      conversationId?: string
    ) => {
      const content = text.trim();

      const targetConversationId =
        conversationId ?? activeConversationId;

      if (
        !content ||
        isSendingMessage ||
        !targetConversationId
      ) {
        return;
      }

      /*
       * Save the conversation ID locally.
       *
       * This prevents problems if the user
       * changes conversation while the request
       * is running.
       */
      const currentConversationId =
        targetConversationId;

      try {
        setIsSendingMessage(true);
        setError(null);

        // ==================================================
        // Optimistic User Message
        // ==================================================

        const temporaryUserMessage: ChatMessage =
          {
            id: `temp-${crypto.randomUUID()}`,

            conversationId:
              currentConversationId,

            role: "user",

            content,

            createdAt:
              new Date().toISOString(),

            status: "sent",
            isTyping: false,
          };

        setMessages((prev) => [
          ...prev,
          temporaryUserMessage,
        ]);

        // ==================================================
        // API Request
        // ==================================================

        const response = await fetch(
          `/api/chat/conversations/${currentConversationId}/messages`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              content,
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

        const {
          userMessage,
          assistantMessage,
        } = result.data;

        const mappedUserMessage =
          mapAIMessageToChatMessage(
            userMessage
          );

        const mappedAssistantMessage =
          mapAIMessageToChatMessage(
            assistantMessage
          );

        // ==================================================
        // Update Messages
        // ==================================================

        setMessages((prev) => [
          ...prev.filter(
            (message) =>
              message.id !==
              temporaryUserMessage.id
          ),

          mappedUserMessage,

          {
            ...mappedAssistantMessage,
            isTyping: false,
            status: "completed",
          },
        ]);

        // ==================================================
        // Update Conversation
        // ==================================================

        setConversations((prev) => {
          const updated =
            prev.map(
              (conversation) =>
                conversation.id ===
                conversationId
                  ? {
                      ...conversation,

                      updated_at:
                        assistantMessage.created_at,
                    }
                  : conversation
            );

          return [...updated].sort(
            (a, b) =>
              new Date(
                b.updated_at
              ).getTime() -
              new Date(
                a.updated_at
              ).getTime()
          );
        });
      } catch (error) {
        console.error(
          "Failed to send message:",
          error
        );

        setMessages((prev) =>
          prev.filter(
            (message) =>
              !message.id.startsWith(
                "temp-"
              )
          )
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to send message."
        );

        throw error;
      } finally {
        setIsSendingMessage(false);
      }
    },
    [
      activeConversationId,
      isSendingMessage,
    ]
  );

  // ========================================================
  // Delete Conversation
  // ========================================================

  const deleteConversation =
    useCallback(
      async (
        conversationId: string
      ) => {
        try {
          setError(null);

          const response = await fetch(
            `/api/chat/conversations/${conversationId}`,
            {
              method: "DELETE",
              cache: "no-store",
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
                "Failed to delete conversation."
            );
          }

          setConversations((prev) => {
            const remaining = prev.filter(
              (conversation) =>
                conversation.id !==
                conversationId
            );

            if (
              conversationId ===
              activeConversationId
            ) {
              setActiveConversationId(
                remaining[0]?.id ?? null
              );
            }

            return remaining;
          });
        } catch (error) {
          console.error(
            "Failed to delete conversation:",
            error
          );

          setError(
            error instanceof Error
              ? error.message
              : "Failed to delete conversation."
          );

          throw error;
        }
      },
      [activeConversationId]
    );

  // ========================================================
  // Clear Current Conversation Messages
  // ========================================================

  const clearConversation =
    useCallback(() => {
      setMessages([]);
    }, []);

  // ========================================================
  // Context Value
  // ========================================================

  const value = useMemo(
    () => ({
      conversations,

      messages,

      activeConversationId,

      isLoadingConversations,

      isLoadingMessages,

      isSendingMessage,

      error,

      loadConversations,

      selectConversation,

      createConversation,

      sendMessage,

      deleteConversation,

      clearConversation,
    }),
    [
      conversations,
      messages,
      activeConversationId,
      isLoadingConversations,
      isLoadingMessages,
      isSendingMessage,
      error,
      loadConversations,
      selectConversation,
      createConversation,
      sendMessage,
      deleteConversation,
      clearConversation,
    ]
  );

  // ========================================================
  // Provider
  // ========================================================

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

// ==========================================================
// Hook
// ==========================================================

export function useChatContext() {
  const context =
    useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used inside ChatProvider"
    );
  }

  return context;
}