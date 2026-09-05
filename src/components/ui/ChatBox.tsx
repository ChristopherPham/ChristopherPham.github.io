import { useState } from "react";
import type { FormEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const welcomeMessage: Message = {
  role: "assistant",
  content: "Ask me about Christopher's work, skills, or experience.",
};

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = input.trim();

    if (!content || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const responseText = await response.text();
      let data: { message?: string; error?: string } = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText) as { message?: string; error?: string };
        } catch {
          throw new Error(`The chat server returned an invalid response (HTTP ${response.status}).`);
        }
      }

      if (!response.ok || !data.message) {
        throw new Error(
          data.error ||
            `The chat server could not respond (HTTP ${response.status}). Make sure npm run server is running.`,
        );
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        { role: "assistant", content: data.message as string },
      ]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <button
        aria-label="Open portfolio assistant"
        className="fixed bottom-6 right-6 z-50 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-zinc-950 shadow-2xl shadow-black/30 transition hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Ask me about Christopher's work
      </button>
    );
  }

  return (
    <section className="fixed bottom-6 right-6 z-50 flex w-[calc(100vw-3rem)] max-w-2xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/95 shadow-2xl shadow-black/40 backdrop-blur-sm">
      <div className="flex items-start justify-between border-b border-zinc-800 px-5 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Portfolio assistant</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Curious about my work?</h2>
        </div>
        <button
          aria-label="Close portfolio assistant"
          className="rounded-lg px-2 py-1 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-2 focus-visible:outline-cyan-300"
          onClick={() => setIsOpen(false)}
          type="button"
        >
          Close
        </button>
      </div>

      <div className="flex max-h-80 min-h-48 flex-col gap-3 overflow-y-auto px-5 py-5" aria-live="polite">
        {messages.map((message, index) => (
          <div
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === "user"
                ? "self-end rounded-br-md bg-cyan-400 text-zinc-950"
                : "self-start rounded-bl-md bg-zinc-800 text-zinc-200"
            }`}
            key={`${message.role}-${index}`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && <div className="self-start rounded-2xl rounded-bl-md bg-zinc-800 px-4 py-3 text-sm text-zinc-400">Thinking...</div>}
        {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
      </div>

      <form className="flex gap-3 border-t border-zinc-800 p-4" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="chat-message">Message</label>
        <input
          className="min-w-0 flex-1 rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400"
          id="chat-message"
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask a question..."
          value={input}
        />
        <button
          className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!input.trim() || isLoading}
          type="submit"
        >
          Send
        </button>
      </form>
    </section>
  );
}