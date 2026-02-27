import type { FC } from "react";

export type MessageRole = "user" | "assistant";

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
}

export const MessageBubble: FC<MessageBubbleProps> = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm",
          isUser
            ? "rounded-br-sm bg-pink-500 text-white shadow-pink-200"
            : "rounded-bl-sm bg-pink-50 text-pink-900 ring-1 ring-pink-100",
        ].join(" ")}
      >
        <p className="whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  );
};

