
"use client";
import MessageList from "./components/message/MessageList";
import { useChat } from "./hooks/useChat";
import ChatInput from "./input/ChatInput";


export default function ChatPage() {
  const {
    messages,
    sendMessage,
    isLoading,
  } = useChat();

  return (
    <div
      className="
        flex
        h-full
        min-h-0
        flex-col
      "
    >
      <div
        className="
          flex-1
          min-h-0
          overflow-y-auto
        "
      >
        <MessageList
          messages={messages}
          isLoading={isLoading}
        />
      </div>

      <div className="shrink-0">
        <ChatInput
          onSend={sendMessage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}