import type { FC, FormEvent } from "react";

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void | Promise<void>;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatInput: FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Escribe tu mensaje...",
  disabled,
}) => {
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!disabled && value.trim()) {
      await onSend();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-pink-100 bg-white/90 px-4 py-3"
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="flex-1 rounded-full border border-pink-100 bg-pink-50/60 px-4 py-2 text-sm text-pink-900 placeholder-pink-300 shadow-inner outline-none focus:border-pink-300 focus:bg-white focus:ring-2 focus:ring-pink-200"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-pink-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-pink-200 transition hover:bg-pink-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:opacity-60"
          disabled={disabled || !value.trim()}
        >
          Send
        </button>
      </div>
    </form>
  );
};

