import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { RouteMeta } from "@/components/RouteMeta";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hey there! I'm Grok — your 24/7 support for all things LivHappierApps. Ask me anything about the apps, what's coming, pricing, or anything else. I'm here to help!",
};

export default function Support() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    const history = nextMessages
      .slice(1)
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      const reply = data.reply ?? data.error ?? "Sorry, something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection lost. Please check your internet and try again." },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col w-full max-w-3xl mx-auto px-3 md:px-4 py-3" style={{ height: "calc(100vh - 215px)" }}>
      <RouteMeta
        title="Support — LivHappier Apps"
        description="Get 24/7 AI-powered support from Grok for all LivHappierApps questions. Ask about apps, pricing, features, or anything else."
        canonical="https://livhappierapps.com/support"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-t-2xl px-5 py-4 border-b border-primary/20 flex items-center gap-4 shrink-0"
      >
        <img
          src="/mascot.png"
          alt=""
          aria-hidden="true"
          className="w-10 md:w-12 shrink-0 drop-shadow-[0_0_14px_rgba(255,0,200,0.6)]"
        />
        <div className="min-w-0">
          <h1 className="font-display font-bold text-lg text-white neon-text-cyan leading-tight">
            LivHappier Apps Support
          </h1>
          <p className="text-white/60 font-body text-sm leading-snug">
            From the Developer's favorite AI, Grok is here to help.
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#00e5ff]" />
          <span className="text-primary text-xs font-body font-bold tracking-wider">LIVE</span>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="glass-panel flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-5 border-x border-primary/10 bg-black/20 min-h-0">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn("flex gap-3", msg.role === "user" ? "justify-end" : "justify-start")}
            >
              {msg.role === "assistant" && (
                <img
                  src="/mascot.png"
                  alt=""
                  aria-hidden="true"
                  className="w-8 h-8 md:w-9 md:h-9 shrink-0 self-end mb-1 drop-shadow-[0_0_10px_rgba(255,0,200,0.5)]"
                />
              )}
              <div
                className={cn(
                  "max-w-[80%] md:max-w-[72%] rounded-2xl px-4 py-3 font-body text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words",
                  msg.role === "user"
                    ? "bg-secondary/15 border border-secondary/30 rounded-tr-sm text-white"
                    : "bg-primary/10 border border-primary/25 rounded-tl-sm text-white"
                )}
              >
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3 justify-start"
          >
            <img
              src="/mascot.png"
              alt=""
              aria-hidden="true"
              className="w-8 h-8 md:w-9 md:h-9 shrink-0 self-end mb-1 drop-shadow-[0_0_10px_rgba(255,0,200,0.5)]"
            />
            <div className="bg-primary/10 border border-primary/25 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
              <span className="text-primary/70 text-sm font-body">Thinking...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="glass-panel rounded-b-2xl px-4 py-3 border-t border-primary/20 shrink-0">
        <form onSubmit={sendMessage} className="flex gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Grok anything about the apps..."
            maxLength={1000}
            disabled={isLoading}
            className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-body text-sm md:text-base disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-primary text-black hover:bg-white px-5 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_#00e5ff] disabled:hover:shadow-none shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
