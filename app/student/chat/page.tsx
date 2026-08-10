"use client";

import MessageList from "./components/message/MessageList";
import ChatInput from "./input/ChatInput";
import { useChatContext } from "./context/ChatContext";

export default function ChatPage() {
  const {
    activeConversationId,
    messages,
    sendMessage,
    isLoadingMessages,
    isSendingMessage,
  } = useChatContext();

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
        bg-slate-50
        dark:bg-slate-950
      "
    >
      {/* ==================================================
          Message Area
      ================================================== */}

      <div
        className="
          min-h-0
          flex-1
          overflow-hidden
        "
      >
        <MessageList
          messages={messages}
          isLoading={
            isLoadingMessages ||
            isSendingMessage
          }
        />
      </div>

      {/* ==================================================
          Input Area
      ================================================== */}

      <div
        className="
          w-full
          shrink-0
        "
      >
        <ChatInput
          onSend={sendMessage}
          isLoading={
            isLoadingMessages ||
            isSendingMessage ||
            !activeConversationId
          }
        />
      </div>
    </div>
  );
}