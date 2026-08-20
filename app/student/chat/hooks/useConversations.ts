"use client";

import { useCallback, useEffect, useState } from "react";

import {
  ConversationListItem,
  AIConversation,
} from "@/types/ai-chat";

interface ConversationsResponse {
  success: boolean;
  data: AIConversation[];
  message?: string;
}

interface UseConversationsReturn {
  conversations: ConversationListItem[];
  isLoading: boolean;
  error: string | null;

  fetchConversations: () => Promise<void>;

  addConversation: (
    conversation: AIConversation
  ) => void;

  removeConversation: (
    conversationId: string
  ) => void;

  updateConversation: (
    conversationId: string,
    updates: Partial<ConversationListItem>
  ) => void;
}

export function useConversations(): UseConversationsReturn {
  const [conversations, setConversations] =
    useState<ConversationListItem[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  // ==================================================
  // Fetch conversations
  // ==================================================

  const fetchConversations =
    useCallback(async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "/api/chat/conversations",
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const result =
          (await response.json()) as ConversationsResponse;

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Failed to fetch conversations."
          );
        }

        const items: ConversationListItem[] =
          result.data.map((conversation) => ({
            id: conversation.id,
            title: conversation.title,
            status: conversation.status,
            updated_at:
              conversation.updated_at,
            is_new: conversation.is_new,  
          }));

        setConversations(items);
      } catch (error) {
        console.error(
          "Failed to fetch conversations:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch conversations."
        );
      } finally {
        setIsLoading(false);
      }
    }, []);

  // ==================================================
  // Initial load
  // ==================================================

  useEffect(() => {
    void fetchConversations();
  }, [fetchConversations]);

  // ==================================================
  // Add conversation
  // ==================================================

  const addConversation = useCallback(
    (conversation: AIConversation) => {
      const item: ConversationListItem = {
        id: conversation.id,
        title: conversation.title,
        status: conversation.status,
        updated_at:
          conversation.updated_at,
        is_new: conversation.is_new,
      };

      setConversations((current) => [
        item,
        ...current,
      ]);
    },
    []
  );

  // ==================================================
  // Remove conversation
  // ==================================================

  const removeConversation = useCallback(
    (conversationId: string) => {
      setConversations((current) =>
        current.filter(
          (conversation) =>
            conversation.id !== conversationId
        )
      );
    },
    []
  );

  // ==================================================
  // Update conversation
  // ==================================================

  const updateConversation = useCallback(
    (
      conversationId: string,
      updates: Partial<ConversationListItem>
    ) => {
      setConversations((current) =>
        current.map((conversation) =>
          conversation.id === conversationId
            ? {
                ...conversation,
                ...updates,
              }
            : conversation
        )
      );
    },
    []
  );

  return {
    conversations,
    isLoading,
    error,
    fetchConversations,
    addConversation,
    removeConversation,
    updateConversation,
  };
}