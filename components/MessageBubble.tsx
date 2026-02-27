import type { FC } from "react";

export type MessageRole = "user" | "assistant";
export type MessageTheme = "light" | "dark";

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  theme: MessageTheme;
}

export const MessageBubble: FC<MessageBubbleProps> = ({
  role,
  content,
  theme,
}) => {
  const isUser = role === "user";
  const isLight = theme === "light";

  const bubbleClass =
    "max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm whitespace-pre-wrap break-words";

  const colorClass = isUser
    ? isLight
      ? "rounded-br-sm bg-[#E0F2FE] text-[#3F3F46]"
      : "rounded-br-sm bg-[#1F3A5F] text-[#EAEAF0]"
    : isLight
      ? "rounded-bl-sm bg-[#FCE7F3] text-[#3F3F46]"
      : "rounded-bl-sm bg-[#2A2A40] text-[#EAEAF0]";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`${bubbleClass} ${colorClass}`}>
        {content}
      </div>
    </div>
  );
};


