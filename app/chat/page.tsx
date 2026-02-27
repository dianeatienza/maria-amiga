"use client";

import { useState } from "react";
import { ChatWindow, type ChatMessage } from "../../components/ChatWindow";

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isSending) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: text,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: { reply?: string; error?: string } = await response.json();
      const reply =
        data.reply ??
        data.error ??
        "Lo siento, algo salió mal al hablar con Amiga.";

      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: reply,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      console.error("[ChatPage] Error sending message:", error);

      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          content:
            "Lo siento, algo salió mal al hablar con Amiga. Inténtalo de nuevo en un momento.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <ChatWindow
      messages={messages}
      inputValue={input}
      onInputChange={setInput}
      onSend={handleSend}
      isSending={isSending}
      emptyState={<p>Empieza a chatear para practicar tu español ✨</p>}
    />
  );
}

