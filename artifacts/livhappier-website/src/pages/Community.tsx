import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Send, User, MessageSquareWarning, RefreshCw } from "lucide-react";
import { useMessages, useCreateMessage } from "@/hooks/use-messages";
import { cn } from "@/lib/utils";

const PINNED_MESSAGE = {
  username: "LivHappier",
  content:
    "Welcome to the LivHappierApps website! Thanks for stopping by, feel free to leave us a comment, ask the community a question, or just say hi!",
};

export default function Community() {
  const [username, setUsername] = useState(() => localStorage.getItem("lh_username") || "");
  const [isJoined, setIsJoined] = useState(!!username);
  const [messageContent, setMessageContent] = useState("");

  const { data: messages = [], isLoading, isError } = useMessages();
  const { mutate: sendMessage, isPending: isSending } = useCreateMessage();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim().length > 0) {
      localStorage.setItem("lh_username", username.trim());
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageContent.trim().length > 0 && username) {
      sendMessage(
        { username, content: messageContent.trim() },
        { onSuccess: () => setMessageContent("") }
      );
    }
  };

  if (!isJoined) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 md:p-12 rounded-3xl max-w-md w-full neon-border-pink relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-primary" />

          <div className="text-center mb-8">
            <User className="w-16 h-16 mx-auto text-secondary mb-4 drop-shadow-[0_0_15px_rgba(255,0,200,0.8)]" />
            <h2 className="text-3xl font-display font-bold text-white neon-text-pink">
              Join the Conversation
            </h2>
            <p className="text-muted-foreground mt-2 font-body">
              Choose your handle to join the community chat.
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={30}
                placeholder="Alias / Handle"
                className="w-full bg-black/50 border border-secondary/30 rounded-xl px-4 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all font-body text-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-white text-white hover:text-black font-display font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_#ff00c8]"
            >
              Connect
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-row w-full max-w-5xl mx-auto px-2 md:px-4 py-2 gap-0 h-[calc(100vh-215px)]">

      {/* ── Mascot column — slim, points right at the pinned message ── */}
      <div className="flex flex-col items-end justify-start pt-10 pr-1 w-12 md:w-16 shrink-0">
        <img
          src="/mascot.png"
          alt=""
          aria-hidden="true"
          className="w-10 md:w-14 drop-shadow-[0_0_14px_rgba(255,0,200,0.5)]"
        />
      </div>

      {/* ── Chat panel ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="glass-panel rounded-t-2xl p-4 flex items-center justify-between border-b border-primary/20 z-10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#00e5ff]" />
            <h2 className="font-display font-bold text-lg text-white tracking-wider">
              Live Community Feed
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground font-body text-sm">
              Connected as <span className="text-primary font-bold">{username}</span>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("lh_username");
                setIsJoined(false);
              }}
              className="text-xs text-white/50 hover:text-secondary uppercase font-bold tracking-wider"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="glass-panel flex-1 overflow-y-auto p-4 md:p-6 space-y-6 border-x border-primary/10 rounded-none bg-black/20">

          {/* ── Pinned message (always first, always left) ── */}
          <div className="flex w-full justify-start">
            <div className="max-w-[85%] md:max-w-[70%] rounded-2xl rounded-tl-sm p-4 bg-primary/10 border border-primary/30 relative">
              {/* Pin badge */}
              <span className="absolute -top-3 left-3 bg-[#3a3a3a] border border-primary/40 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase">
                📌 Pinned
              </span>
              <div className="flex items-baseline justify-between gap-4 mb-1 mt-1">
                <span className="font-display font-bold text-sm text-secondary neon-text-pink">
                  {PINNED_MESSAGE.username}
                </span>
              </div>
              <p className="text-white font-body leading-relaxed break-words">
                {PINNED_MESSAGE.content}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 opacity-40">
            <div className="flex-1 h-px bg-primary/30" />
            <span className="text-[10px] text-primary font-body uppercase tracking-widest">community messages</span>
            <div className="flex-1 h-px bg-primary/30" />
          </div>

          {/* Live messages */}
          {isLoading ? (
            <div className="h-32 flex flex-col items-center justify-center text-primary/50 gap-4">
              <RefreshCw className="w-8 h-8 animate-spin" />
              <p className="font-display tracking-widest uppercase text-sm">Decrypting feed...</p>
            </div>
          ) : isError ? (
            <div className="h-32 flex flex-col items-center justify-center text-destructive gap-4">
              <MessageSquareWarning className="w-12 h-12" />
              <p className="font-body text-lg">Signal lost. Could not connect to chat server.</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="h-32 flex items-center justify-center">
              <p className="text-muted-foreground font-body text-lg italic">
                The void is quiet. Be the first to speak.
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {messages
                .filter(
                  (msg) =>
                    !(
                      msg.username === PINNED_MESSAGE.username &&
                      msg.content === PINNED_MESSAGE.content
                    )
                )
                .map((msg) => {
                  const isMe = msg.username === username;
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] md:max-w-[70%] rounded-2xl p-4 relative group",
                          isMe
                            ? "bg-secondary/10 border border-secondary/30 rounded-tr-sm"
                            : "bg-primary/10 border border-primary/30 rounded-tl-sm"
                        )}
                      >
                        <div className="flex items-baseline justify-between gap-4 mb-1">
                          <span
                            className={cn(
                              "font-display font-bold text-sm tracking-wide",
                              isMe ? "text-secondary" : "text-primary"
                            )}
                          >
                            {msg.username}
                          </span>
                          <span className="text-[10px] text-white/40 font-body">
                            {format(new Date(msg.createdAt), "HH:mm")}
                          </span>
                        </div>
                        <p className="text-white font-body leading-relaxed break-words">
                          {msg.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="glass-panel rounded-b-2xl p-4 border-t border-primary/20 z-10">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Transmit message..."
              maxLength={500}
              className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all font-body"
              disabled={isSending}
            />
            <button
              type="submit"
              disabled={!messageContent.trim() || isSending}
              className="bg-primary text-black hover:bg-white px-6 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_#00e5ff] disabled:hover:shadow-none"
            >
              <Send className={cn("w-5 h-5", isSending && "animate-pulse")} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
