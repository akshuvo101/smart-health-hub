"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ConversationListItem,
  AIMessage,
} from "@/types/ai-chat";

import { ChatMessage } from "../types/message";

// ==========================================================
// Constants
// ==========================================================

const INITIAL_AI_MESSAGE =
  "Hi! 👋 I'm WellMind AI. I'm here to support your mental wellbeing, help you reflect on your thoughts and emotions, and guide you toward healthier daily habits. How are you feeling today?";

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
  // --------------------------------------------------------
  // Conversations
  // --------------------------------------------------------

  conversations: ConversationListItem[];

  // --------------------------------------------------------
  // Current conversation messages
  // --------------------------------------------------------

  messages: ChatMessage[];

  // --------------------------------------------------------
  // Active conversation
  // --------------------------------------------------------

  activeConversationId: string | null;

  // --------------------------------------------------------
  // Loading states
  // --------------------------------------------------------

  isLoadingConversations: boolean;
  isLoadingMessages: boolean;
  isSendingMessage: boolean;
  isInitializingConversation: boolean;

  // --------------------------------------------------------
  // Error
  // --------------------------------------------------------

  error: string | null;

  // --------------------------------------------------------
  // Actions
  // --------------------------------------------------------

  loadConversations: () => Promise<void>;

  selectConversation: (
    conversationId: string
  ) => void;

  createConversation: (
    assessmentId?: string
  ) => Promise<string>;

  initializeConversation: (
    conversationId: string
  ) => Promise<void>;

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

  const [
    isInitializingConversation,
    setIsInitializingConversation,
  ] = useState(false);

  // ========================================================
  // Error
  // ========================================================

  const [error, setError] =
    useState<string | null>(null);

  // ========================================================
  // Message request tracking
  // ========================================================

  const messageRequestIdRef = useRef(0);

  // ========================================================
  // Initialization tracking
  // ========================================================

  /*
   * Prevents the same conversation from being
   * initialized more than once during the current
   * provider lifecycle.
   */
  const initializedConversationIdsRef =
    useRef<Set<string>>(new Set());

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

        // ----------------------------------------------------
        // Sort by latest update
        // ----------------------------------------------------

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

        // ----------------------------------------------------
        // Preserve current conversation
        // ----------------------------------------------------

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
      const requestId =
        ++messageRequestIdRef.current;

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

        // ----------------------------------------------------
        // Ignore stale response
        // ----------------------------------------------------

        if (
          requestId !==
          messageRequestIdRef.current
        ) {
          return;
        }

        const loadedMessages: ChatMessage[] =
          (result.data ?? []).map(
            mapAIMessageToChatMessage
          );

        setMessages(
          loadedMessages
        );
      } catch (error) {
        console.error(
          "Failed to load messages:",
          error
        );

        if (
          requestId !==
          messageRequestIdRef.current
        ) {
          return;
        }

        setMessages([]);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load messages."
        );
      } finally {
        if (
          requestId ===
          messageRequestIdRef.current
        ) {
          setIsLoadingMessages(false);
        }
      }
    },
    []
  );

  // ========================================================
  // Load Messages When Active Conversation Changes
  // ========================================================

  useEffect(() => {
    if (!activeConversationId) {
      ++messageRequestIdRef.current;

      setMessages([]);
      setIsLoadingMessages(false);

      return;
    }

    void fetch(
      `/api/chat/conversations/${activeConversationId}`,
      {
        method: "PATCH",
        cache: "no-store",
      }
    ).then((response) => {
      if (!response.ok) {
        return;
      }

      setConversations((prev) =>
        prev.map((conversation) =>
          conversation.id === activeConversationId
            ? { ...conversation, is_new: false }
            : conversation
        )
      );
    }).catch((error) => {
      console.error(
        "Failed to mark conversation as read:",
        error
      );
    });

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

        setError(null);

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
    useCallback(
      async (assessmentId?: string) => {
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

                assessment_id:
                  assessmentId ?? null,
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

          // --------------------------------------------------
          // Add conversation to sidebar
          // --------------------------------------------------

          setConversations((prev) => [
            newConversation,

            ...prev.filter(
              (conversation) =>
                conversation.id !==
                newConversation.id
            ),
          ]);

          // --------------------------------------------------
          // Make it active
          // --------------------------------------------------

          setActiveConversationId(
            newConversation.id
          );

          // --------------------------------------------------
          // Start empty
          // --------------------------------------------------

          setMessages([]);

          // --------------------------------------------------
          // Remove initialization lock if somehow reused
          // --------------------------------------------------

          initializedConversationIdsRef.current.delete(
            newConversation.id
          );

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
      },
      []
    );

  // ========================================================
  // Initialize Conversation
  // ========================================================

  const initializeConversation =
    useCallback(
      async (conversationId: string) => {
        /*
         * Prevent duplicate initialization.
         */
        if (
          initializedConversationIdsRef.current.has(
            conversationId
          )
        ) {
          return;
        }

        /*
         * Mark immediately.
         *
         * This prevents React Strict Mode or
         * multiple renders from triggering
         * the same initialization twice.
         */
        initializedConversationIdsRef.current.add(
          conversationId
        );

        try {
          setIsInitializingConversation(
            true
          );

          setError(null);

          /*
           * IMPORTANT:
           *
           * We intentionally use the existing
           * message API here.
           *
           * The backend will process this as the
           * initial AI conversation request.
           */
          const response = await fetch(
            `/api/chat/conversations/${conversationId}/messages`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                content:
                  INITIAL_AI_MESSAGE,
                initialize: true,
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
                "Failed to initialize conversation."
            );
          }

          /*
           * The current backend response is expected
           * to return userMessage + assistantMessage.
           *
           * For a dedicated initialization endpoint,
           * we can change this section later.
           */
          const {
            assistantMessage,
          } = result.data;

          if (!assistantMessage) {
            throw new Error(
              "AI welcome message was not returned."
            );
          }

          const mappedAssistantMessage =
            mapAIMessageToChatMessage(
              assistantMessage
            );

          /*
           * Only update visible messages if this
           * conversation is currently active.
           */
          if (
            activeConversationId ===
            conversationId
          ) {
            setMessages((prev) => {
              /*
               * Prevent duplicate assistant messages.
               */
              const alreadyExists =
                prev.some(
                  (message) =>
                    message.id ===
                    mappedAssistantMessage.id
                );

              if (alreadyExists) {
                return prev;
              }

              return [
                ...prev,
                {
                  ...mappedAssistantMessage,
                  isTyping: false,
                  status: "completed",
                },
              ];
            });
          }

          /*
           * Update conversation timestamp.
           */
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
          /*
           * Allow retry if initialization failed.
           */
          initializedConversationIdsRef.current.delete(
            conversationId
          );

          console.error(
            "Failed to initialize conversation:",
            error
          );

          setError(
            error instanceof Error
              ? error.message
              : "Failed to initialize conversation."
          );

          throw error;
        } finally {
          setIsInitializingConversation(
            false
          );
        }
      },
      [activeConversationId]
    );

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
        conversationId ??
        activeConversationId;

      // ------------------------------------------------------
      // Validation
      // ------------------------------------------------------

      if (
        !content ||
        isSendingMessage ||
        !targetConversationId
      ) {
        return;
      }

      const currentConversationId =
        targetConversationId;

      // ------------------------------------------------------
      // Temporary message ID
      // ------------------------------------------------------

      const temporaryMessageId =
        `temp-${crypto.randomUUID()}`;

      try {
        setIsSendingMessage(true);
        setError(null);

        // ==================================================
        // Optimistic User Message
        // ==================================================

        const temporaryUserMessage: ChatMessage =
          {
            id: temporaryMessageId,

            conversationId:
              currentConversationId,

            role: "user",

            content,

            createdAt:
              new Date().toISOString(),

            status: "sent",

            isTyping: false,
          };

        if (
          activeConversationId ===
          currentConversationId
        ) {
          setMessages((prev) => [
            ...prev,
            temporaryUserMessage,
          ]);
        }

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

        if (
          activeConversationId ===
          currentConversationId
        ) {
          setMessages((prev) => [
            ...prev.filter(
              (message) =>
                message.id !==
                temporaryMessageId
            ),

            mappedUserMessage,

            {
              ...mappedAssistantMessage,

              isTyping: false,

              status: "completed",
            },
          ]);
        }

        // ==================================================
        // Update Conversation Sidebar
        // ==================================================

        setConversations((prev) => {
          const exists =
            prev.some(
              (conversation) =>
                conversation.id ===
                currentConversationId
            );

          if (!exists) {
            return prev;
          }

          const updated =
            prev.map(
              (conversation) =>
                conversation.id ===
                currentConversationId
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

        // ----------------------------------------------------
        // Remove ONLY this temporary message
        // ----------------------------------------------------

        setMessages((prev) =>
          prev.filter(
            (message) =>
              message.id !==
              temporaryMessageId
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

          // --------------------------------------------------
          // Remove initialization lock
          // --------------------------------------------------

          initializedConversationIdsRef.current.delete(
            conversationId
          );

          // --------------------------------------------------
          // Remove from sidebar
          // --------------------------------------------------

          setConversations((prev) => {
            const remaining =
              prev.filter(
                (conversation) =>
                  conversation.id !==
                  conversationId
              );

            // ----------------------------------------------
            // If deleted conversation was active
            // ----------------------------------------------

            if (
              conversationId ===
              activeConversationId
            ) {
              const nextConversation =
                remaining[0]?.id ??
                null;

              setActiveConversationId(
                nextConversation
              );

              if (!nextConversation) {
                setMessages([]);
              }
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

      isInitializingConversation,

      error,

      loadConversations,

      selectConversation,

      createConversation,

      initializeConversation,

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
      isInitializingConversation,
      error,
      loadConversations,
      selectConversation,
      createConversation,
      initializeConversation,
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