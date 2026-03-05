import type { FC } from "react";

export type MessageRole = "user" | "assistant";
export type MessageTheme = "light" | "dark";

export interface MessageBubbleProps {
  role: MessageRole;
  content: string;
  theme: MessageTheme;
  translation?: string;
  onTranslateClick?: () => void | Promise<void>;
  isTranslating?: boolean;
}

export const MessageBubble: FC<MessageBubbleProps> = ({
  role,
  content,
  theme,
  translation,
  onTranslateClick,
  isTranslating,
}) => {
  const isUser = role === "user";
  const isLight = theme === "light";

  const bubbleClass =
    "inline-block max-w-full rounded-2xl px-4 py-2 text-sm shadow-sm whitespace-pre-wrap break-words";

  const colorClass = isUser
    ? isLight
      ? "rounded-br-sm bg-[#E0F2FE] text-[#3F3F46]"
      : "rounded-br-sm bg-[#1F3A5F] text-[#EAEAF0]"
    : isLight
      ? "rounded-bl-sm bg-[#FCE7F3] text-[#3F3F46]"
      : "rounded-bl-sm bg-[#2A2A40] text-[#EAEAF0]";

  const translationColor = isLight ? "text-sky-700" : "text-sky-200";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex max-w-[80%] flex-col gap-1 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <div className={`${bubbleClass} ${colorClass}`}>{content}</div>

        {!isUser && (
          <>
            {translation ? (
              <div
                className={`self-start rounded-xl bg-transparent px-2 text-xs ${translationColor}`}
              >
                {translation}
              </div>
            ) : onTranslateClick ? (
              <button
                type="button"
                onClick={() => onTranslateClick()}
                disabled={isTranslating}
                className="self-start rounded-full bg-transparent px-2 py-1 text-[11px] font-medium text-sky-600 underline-offset-2 hover:underline disabled:opacity-60 dark:text-sky-300"
              >
                {isTranslating ? "Translating..." : "Show English"}
              </button>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};



