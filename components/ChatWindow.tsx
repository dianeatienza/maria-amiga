import type { FC, ReactNode } from "react";
import { useState } from "react";
import type { MessageRole, MessageTheme } from "./MessageBubble";
import { MessageBubble } from "./MessageBubble";
import { ChatInput, type ChatTheme } from "./ChatInput";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export interface ChatWindowProps {
  title?: string;
  messages: ChatMessage[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void | Promise<void>;
  isSending?: boolean;
  emptyState?: ReactNode;
}

export const ChatWindow: FC<ChatWindowProps> = ({
  title = "Maria",
  messages,
  inputValue,
  onInputChange,
  onSend,
  isSending,
  emptyState,
}) => {
  const [theme, setTheme] = useState<ChatTheme>("light");
  const isLight = theme === "light";
  const messageTheme: MessageTheme = theme;

  const showEmptyState = messages.length === 0 && emptyState;

  const pageBg = isLight ? "bg-[#FFF6F9]" : "bg-[#1E1E2E]";
  const cardBg = isLight ? "bg-white/95" : "bg-[#2A2A40]";
  const borderColor = isLight ? "ring-pink-100 shadow-pink-100/80" : "ring-[#111827] shadow-black/40";
  const textColor = isLight ? "text-[#3F3F46]" : "text-[#EAEAF0]";
  const headerBg = isLight ? "bg-[#FCE7F3]" : "bg-[#2A2A40]";
  const headerText = isLight ? "text-[#3F3F46]" : "text-[#EAEAF0]";
  const emptyText = isLight ? "text-pink-400" : "text-[#9CA3AF]";

  const toggleLabel = isLight ? "Modo noche" : "Modo día";
  const toggleIcon = isLight ? "🌙" : "🌞";
  const toggleBg = isLight ? "bg-[#E0F2FE]" : "bg-[#1F3A5F]";
  const toggleText = isLight ? "text-[#3F3F46]" : "text-[#EAEAF0]";

  return (
    <div className={`flex min-h-screen items-center justify-center px-4 py-8 ${pageBg}`}>
      <div
        className={`flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl ${cardBg} ${borderColor}`}
      >
        <header className={`border-b border-white/10 px-6 py-4 ${headerBg}`}>
          <div className="flex items-center justify-between gap-3">
            <h1 className={`text-xl font-semibold ${headerText}`}>
              {title} <span className="align-middle">🌸</span>
            </h1>
            <button
              type="button"
              onClick={() => setTheme(isLight ? "dark" : "light")}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium shadow-sm transition ${toggleBg} ${toggleText}`}
            >
              <span>{toggleIcon}</span>
              <span>{toggleLabel}</span>
            </button>
          </div>
        </header>

        <main
          className={`flex-1 overflow-y-auto px-4 py-3 space-y-3 ${textColor}`}
        >
          {showEmptyState ? (
            <div
              className={`flex h-full items-center justify-center text-center text-sm ${emptyText}`}
            >
              {emptyState}
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
                theme={messageTheme}
              />
            ))
          )}
        </main>

        <ChatInput
          value={inputValue}
          onChange={onInputChange}
          onSend={onSend}
          disabled={isSending}
          theme={theme}
        />
      </div>
    </div>
  );
};

