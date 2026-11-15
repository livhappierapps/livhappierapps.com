import { motion } from "framer-motion";
import { Link } from "wouter";
import { RouteMeta } from "@/components/RouteMeta";

const SKILLS = [
  { icon: "🐛", name: "Debug", desc: "Root cause analysis and precise, actionable fixes" },
  { icon: "🔍", name: "Analyze", desc: "Code quality, security vulnerabilities, and performance review" },
  { icon: "💡", name: "Explain", desc: "Plain-language breakdowns of any code or concept" },
  { icon: "✨", name: "Refactor", desc: "Clean up structure, improve readability, and boost quality" },
  { icon: "🧪", name: "Tests", desc: "Comprehensive test suites with full edge case coverage" },
  { icon: "💬", name: "Chat", desc: "Open-ended AI conversation for anything dev-related" },
  { icon: "🖼️", name: "UI Review", desc: "Attach any screenshot and get real UX feedback — Vision AI" },
  { icon: "📸", name: "Visual Debug", desc: "Photo your error screen and get a fix — Vision AI" },
];

const PROVIDERS = [
  { name: "Grok / xAI", models: "grok-3 + grok-2-vision", color: "cyan" },
  { name: "OpenAI", models: "GPT-4o and all compatible models", color: "pink" },
  { name: "Anthropic", models: "Claude 3.5 Sonnet and beyond", color: "cyan" },
  { name: "Custom APIs", models: "Any OpenAI-compatible endpoint", color: "pink" },
];

const THEMES = ["Cyberpunk", "Cyber Rainbow", "Rose Neon", "Sunshine", "Matrix", "and more"];

const BASE = "https://livhappierapps.com";

const MIDDLEMAIN_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MiddleMAIn",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "iOS, Android",
  description:
    "A professional AI development bridge with terminal, vision AI, debugging, refactoring, and multi-provider AI support.",
  featureList: [
    "AI Debugging",
    "Code Analysis",
    "Vision AI",
    "Multi-Provider AI (Grok, GPT-4o, Claude)",
    "8 Themes",
    "Local-first storage with disclosures for selected providers and backend features",
  ],
  author: { "@type": "Organization", name: "LivHappier Apps", url: BASE },
  offers: [
    { "@type": "Offer", name: "Monthly", price: "3.99", priceCurrency: "USD", billingDuration: "P1M" },
    { "@type": "Offer", name: "Annual", price: "29.99", priceCurrency: "USD", billingDuration: "P1Y" },
  ],
};

export default function MiddleMain() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
      <RouteMeta
        title="MiddleMAIn — AI Dev Bridge | LivHappier Apps"
        description="MiddleMAIn is a professional AI development bridge for iOS and Android — terminal, vision AI, debugging, refactoring, and multi-provider support with Grok, GPT-4o, Claude, and more."
        canonical={`${BASE}/apps/middlemain`}
        jsonLd={MIDDLEMAIN_JSON_LD}
      />

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <p className="text-primary font-body text-sm tracking-wider uppercase mb-3 neon-text-cyan">
          AI Dev Bridge · Code · Debug · Vision
        </p>
        <h1 className="text-5xl md:text-6xl font-display font-bold text-white neon-text-cyan mb-4">
          MiddleMAIn
        </h1>
        <p className="text-xl text-white/70 font-body max-w-2xl mx-auto leading-relaxed mb-8">
          The full power of today's leading AI models — Grok, GPT-4o, Claude, and custom APIs —
          directly in your pocket. Built for developers. Not a chat app.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/50 text-white font-body font-bold px-6 py-3 rounded-xl transition-all duration-300 min-w-[180px] justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            App Store
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-secondary/50 text-white font-body font-bold px-6 py-3 rounded-xl transition-all duration-300 min-w-[180px] justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.64.24.99.2l.09-.06 10.59-10.59-2.87-2.87L3.18 23.76zm15.63-13.38L16.4 9l-2.92 2.92 2.92 2.91 2.43-1.37c.69-.39.69-1.59-.02-1.98zM2.1.49C1.8.82 1.62 1.33 1.62 2v20c0 .67.18 1.18.49 1.51l.07.07 11.2-11.2v-.27L2.17.42 2.1.49zm10.17 10.45L2.1.49l.07-.07 10.17 10.52z"/></svg>
            Google Play
          </a>
        </div>
        <p className="text-white/30 font-body text-xs">Coming to App Store and Google Play</p>
      </motion.section>

      {/* Screenshot Placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-[9/19.5] rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center"
            >
              <span className="text-white/20 font-body text-xs">Screenshot</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Bridge Terminal */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-primary/25">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚡</span>
            <h2 className="text-2xl font-display font-bold text-white neon-text-cyan">Bridge Terminal</h2>
          </div>
          <p className="text-white/70 font-body leading-relaxed">
            A full streaming AI terminal that mirrors the command-line feel developers already know.
            Paste code, describe a bug, or attach a screenshot — and watch your AI think in real time.
            Every token streams to your screen the moment it's generated. <span className="text-primary font-bold">No waiting. No lag.</span>
          </p>
        </div>
      </motion.section>

      {/* 8 Skills */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-display font-bold text-white neon-text-pink whitespace-nowrap">
            8 Built-In Skills
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-secondary to-transparent opacity-50" />
        </div>
        <p className="text-white/60 font-body mb-8">
          Purpose-built AI modes that respond like specialists, not generalists.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass-panel rounded-xl p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 flex items-start gap-4"
            >
              <span className="text-2xl shrink-0">{skill.icon}</span>
              <div>
                <p className="font-display font-bold text-white neon-text-cyan text-base mb-1">{skill.name}</p>
                <p className="text-white/55 font-body text-sm leading-snug">{skill.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Vision AI */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-secondary/25">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">👁️</span>
            <h2 className="text-2xl font-display font-bold text-white neon-text-pink">Vision AI & Screen-Share</h2>
          </div>
          <p className="text-white/70 font-body leading-relaxed">
            The bridge between what you see and what AI understands. Attach any screenshot from
            your camera roll or take a live photo with your camera. MiddleMAIn routes it directly
            to <span className="text-secondary font-bold">Grok Vision</span> for full multimodal
            analysis — debugging UI errors, reviewing layouts, analyzing stack traces from your screen,
            or inspecting any visual output.
          </p>
        </div>
      </motion.section>

      {/* Connect Any AI */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-display font-bold text-white neon-text-cyan whitespace-nowrap">
            Connect Any AI
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
        </div>
        <p className="text-white/60 font-body mb-6">
          Works with any OpenAI-compatible API endpoint.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PROVIDERS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`glass-panel rounded-xl p-4 border ${
                p.color === "cyan" ? "border-primary/20" : "border-secondary/20"
              }`}
            >
              <p className={`font-display font-bold text-base mb-1 ${
                p.color === "cyan" ? "text-primary neon-text-cyan" : "text-secondary neon-text-pink"
              }`}>{p.name}</p>
              <p className="text-white/50 font-body text-sm">{p.models}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 glass-panel rounded-xl p-4 border border-white/10">
          <p className="text-white/60 font-body text-sm leading-relaxed">
            On iOS and Android, provider API keys use Expo SecureStore, with migration from legacy
            storage. In browser preview, keys stay in session memory. Direct AI requests send the
            provider credential to the selected provider; Dev's Grok requests pass through the
            backend. The separate Memory Machine MCP token is stored in ordinary app storage. See
            the Privacy Policy for details.
          </p>
        </div>
      </motion.section>

      {/* 8 Themes */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-primary/25">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎨</span>
            <h2 className="text-2xl font-display font-bold text-white neon-text-cyan">8 Cyberpunk Themes</h2>
          </div>
          <p className="text-white/70 font-body leading-relaxed mb-4">
            Full workspace personalization with 8 handcrafted themes. Every color, glow, and
            surface adapts to your aesthetic. Your terminal, your vibe.
          </p>
          <div className="flex flex-wrap gap-2">
            {THEMES.map((t) => (
              <span key={t} className="bg-white/10 border border-primary/20 text-primary font-body text-xs px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Privacy First */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <div className="glass-panel rounded-2xl p-6 md:p-8 border border-secondary/25 text-center">
          <span className="text-3xl block mb-4">🛡️</span>
          <h2 className="text-2xl font-display font-bold text-white neon-text-pink mb-4">Privacy & Data Flows</h2>
          <p className="text-white/70 font-body leading-relaxed max-w-2xl mx-auto">
            Provider keys use Expo SecureStore on iOS and Android, and session memory in browser
            preview. The separate Memory Machine token is stored in ordinary app storage. Direct AI
            requests go to the provider you select; "Dev's Grok" requests pass through the backend.
            Camera preview stays local until you explicitly send a frame or start sharing; microphone
            audio is sent only while Hearing is enabled and permission is granted; screen sharing
            starts only when you turn it on. See the Privacy Policy for the full details.
          </p>
        </div>
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/50 text-white font-body font-bold px-6 py-3 rounded-xl transition-all duration-300 min-w-[180px] justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            App Store
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-secondary/50 text-white font-body font-bold px-6 py-3 rounded-xl transition-all duration-300 min-w-[180px] justify-center"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.76c.3.17.64.24.99.2l.09-.06 10.59-10.59-2.87-2.87L3.18 23.76zm15.63-13.38L16.4 9l-2.92 2.92 2.92 2.91 2.43-1.37c.69-.39.69-1.59-.02-1.98zM2.1.49C1.8.82 1.62 1.33 1.62 2v20c0 .67.18 1.18.49 1.51l.07.07 11.2-11.2v-.27L2.17.42 2.1.49zm10.17 10.45L2.1.49l.07-.07 10.17 10.52z"/></svg>
            Google Play
          </a>
        </div>
        <div className="flex justify-center gap-6 text-sm font-body">
          <Link href="/apps/middlemain/privacypolicy" className="text-white/40 hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/apps/middlemain/terms" className="text-white/40 hover:text-primary transition-colors">
            Terms & Conditions
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2 mt-4 opacity-30">
          <span className="text-white/60 font-body text-xs">Version 1.0 ·</span>
          <img src="/logo.png" alt="LivHappierApps" className="h-5 w-auto object-contain" />
        </div>
      </motion.section>
    </div>
  );
}
