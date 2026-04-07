import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function EdenMux() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">

      {/* Hero Poster */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative rounded-2xl overflow-hidden mb-8 shadow-[0_0_40px_rgba(220,38,38,0.4)]"
      >
        <img
          src="/edenmux-poster.jpeg"
          alt="EdenMux"
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center mb-6"
      >
        <h1 className="text-5xl font-display font-black uppercase tracking-widest mb-2"
          style={{ color: "#ff4444", textShadow: "0 0 20px rgba(220,38,38,0.8), 0 0 40px rgba(220,38,38,0.4)" }}>
          EdenMux
        </h1>
        <p className="text-lg text-muted-foreground font-body">
          A powerful terminal multiplexer with an AI guide built in. Your garden, your rules.
        </p>
      </motion.div>

      {/* App Screenshot */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35 }}
        className="rounded-2xl overflow-hidden mb-8 border border-red-900/50 shadow-[0_0_25px_rgba(220,38,38,0.2)]"
      >
        <img
          src="/edenmux-screenshot.jpeg"
          alt="EdenMux App Screenshot"
          className="w-full h-auto object-cover"
        />
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {[
          { icon: "🌿", label: "Terminal Multiplexer" },
          { icon: "🤖", label: "AI Assistant Eden" },
          { icon: "⚡", label: "Built for Mobile" },
          { icon: "🔧", label: "Full CLI Toolkit" },
        ].map((feat) => (
          <div
            key={feat.label}
            className="flex items-center gap-2 rounded-xl px-4 py-3 font-body text-sm font-medium"
            style={{
              background: "rgba(220,38,38,0.1)",
              border: "1px solid rgba(220,38,38,0.3)",
              color: "#fca5a5",
            }}
          >
            <span className="text-xl">{feat.icon}</span>
            {feat.label}
          </div>
        ))}
      </motion.div>

      {/* App Store Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.65 }}
        className="flex flex-col gap-4 mb-8"
      >
        <a
          href="https://apps.apple.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-2xl py-4 px-6 font-display font-bold text-lg uppercase tracking-wider transition-all duration-300 active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.3), rgba(180,0,0,0.5))",
            border: "2px solid rgba(220,38,38,0.7)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(220,38,38,0.3)",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Download on App Store
          <ExternalLink className="w-4 h-4 opacity-70" />
        </a>

        <a
          href="https://play.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-2xl py-4 px-6 font-display font-bold text-lg uppercase tracking-wider transition-all duration-300 active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.15), rgba(180,0,0,0.3))",
            border: "2px solid rgba(220,38,38,0.4)",
            color: "#fca5a5",
            boxShadow: "0 0 15px rgba(220,38,38,0.15)",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l15 8.5c.6.34.6 1.26 0 1.6l-15 8.5c-.66.5-1.6.03-1.6-.8z"/>
          </svg>
          Get it on Google Play
          <ExternalLink className="w-4 h-4 opacity-70" />
        </a>

        {/* EdenMux Web App Link */}
        <a
          href="https://workspace.livhappierapps.replit.app"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-2xl py-4 px-6 font-display font-bold text-lg uppercase tracking-wider transition-all duration-300 active:scale-95"
          style={{
            background: "linear-gradient(135deg, rgba(220,38,38,0.2), rgba(180,0,0,0.35))",
            border: "2px solid rgba(220,38,38,0.5)",
            color: "#fca5a5",
            boxShadow: "0 0 15px rgba(220,38,38,0.2)",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
          Open Web App
          <ExternalLink className="w-4 h-4 opacity-70" />
        </a>
      </motion.div>

      {/* About Eden */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="rounded-2xl p-6 font-body"
        style={{
          background: "rgba(220,38,38,0.08)",
          border: "1px solid rgba(220,38,38,0.25)",
        }}
      >
        <h3 className="font-display font-bold text-xl mb-2" style={{ color: "#ff6666" }}>
          Meet Eden
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Eden is your AI guide built right into the terminal. Ask her anything — she knows the app inside and out and will help you find your way through the garden.
        </p>
      </motion.div>

      {/* Privacy Policy & Legal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="mt-8 flex flex-col items-center gap-3 pb-8"
      >
        <a
          href="PRIVACY_POLICY_URL_HERE"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-sm underline underline-offset-4 transition-colors duration-200"
          style={{ color: "rgba(252,165,165,0.6)" }}
        >
          Privacy Policy
        </a>
        <p className="font-body text-xs text-center" style={{ color: "rgba(255,255,255,0.3)" }}>
          © {new Date().getFullYear()} LivHappier Apps. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
}
