import type { FC, ReactNode } from "react";
import type { MessageRole } from "./MessageBubble";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

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
  const showEmptyState = messages.length === 0 && emptyState;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 via-rose-50 to-sky-50 px-4 py-8">
      <div className="flex h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white/90 shadow-lg shadow-pink-100 ring-1 ring-pink-100">
        <header className="border-b border-pink-100 bg-pink-50/80 px-6 py-4">
          <h1 className="text-center text-xl font-semibold text-pink-700">
            {title}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-pink-50/40 via-white to-sky-50/40 px-4 py-3 space-y-3">
          {showEmptyState ? (
            <div className="flex h-full items-center justify-center text-center text-sm text-pink-400">
              {emptyState}
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble
                key={message.id}
                role={message.role}
                content={message.content}
              />
            ))
          )}
        </main>

        <ChatInput
          value={inputValue}
          onChange={onInputChange}
          onSend={onSend}
          disabled={isSending}
        />
      </div>
    </div>
  );
};
