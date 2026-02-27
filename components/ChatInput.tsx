import type { FC, FormEvent } from "react";

export type ChatTheme = "light" | "dark";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
  theme: ChatTheme;
}

export const ChatInput: FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Escribe tu mensaje...",
  disabled,
  theme,
}) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!disabled && value.trim()) {
      await onSend();
    }
  };

  const isLight = theme === "light";

  const containerClass = isLight
    ? "border-t border-pink-100 bg-[#FFF6F9]/90"
    : "border-t border-[#2A2A40] bg-[#1E1E2E]/90";

  const inputClass = isLight
    ? "border-pink-100 bg-white/80 text-[#3F3F46] placeholder-pink-300 focus:border-[#F9A8D4] focus:bg-white focus:ring-[#F9A8D4]/40"
    : "border-[#2A2A40] bg-[#2A2A40] text-[#EAEAF0] placeholder-[#9CA3AF] focus:border-[#F472B6] focus:bg-[#1E1E2E] focus:ring-[#F472B6]/40";

  const buttonClass = isLight
    ? "bg-[#F9A8D4] hover:bg-[#F472B6] text-[#3F3F46] shadow-pink-200"
    : "bg-[#F472B6] hover:bg-[#F9A8D4] text-[#1E1E2E] shadow-pink-400/40";

  return (
    <form
      onSubmit={handleSubmit}
      className={`${containerClass} px-4 py-3`}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`flex-1 rounded-full border px-4 py-2 text-sm shadow-inner outline-none focus:ring-2 ${inputClass}`}
        />
        <button
          type="submit"
          className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium shadow-md transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-60 ${buttonClass}`}
          disabled={disabled || !value.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};


