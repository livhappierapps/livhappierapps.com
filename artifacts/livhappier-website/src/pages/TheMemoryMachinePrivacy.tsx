import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { RouteMeta } from "@/components/RouteMeta";

const BASE = "https://livhappierapps.com";

const THIRD_PARTY = [
  { name: "Clerk", purpose: "User authentication and identity", url: "https://clerk.com/privacy" },
  { name: "xAI (Grok)", purpose: "AI responses (when you use the default model)", url: "https://x.ai/privacy" },
  { name: "OpenAI", purpose: "AI responses (if you select the OpenAI provider)", url: "https://openai.com/privacy" },
  { name: "Anthropic", purpose: "AI responses (if you select the Anthropic provider)", url: "https://anthropic.com/privacy" },
  { name: "Google", purpose: "AI responses (if you select the Gemini provider)", url: "https://policies.google.com/privacy" },
  { name: "Replit", purpose: "Hosting and infrastructure", url: "https://replit.com/privacy" },
  { name: "Resend", purpose: "Transactional email (verification codes, deletion links)", url: "https://resend.com/privacy" },
];

const RETENTION = [
  { data: "Conversations and messages", retention: "Until you delete them or your account" },
  { data: "Snapshots", retention: "90 days from creation, then automatically purged" },
  { data: "Server logs", retention: "Up to 30 days" },
  { data: "Deleted threads (soft-deleted)", retention: "Purged within 6 hours of deletion" },
  { data: "Trusted device records", retention: "90 days from verification" },
];

const SECTIONS = [
  {
    num: "1",
    title: "Who We Are",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        The Memory Machine is developed and operated by <span className="text-white/80">Livhappier Apps</span>.
        If you have any questions about this policy, contact us at{" "}
        <a href="mailto:oblivionhappier@icloud.com" className="text-primary hover:underline">
          oblivionhappier@icloud.com
        </a>.
      </p>
    ),
  },
  {
    num: "2",
    title: "What This App Does",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        The Memory Machine is a personal AI conversation vault. You can chat with AI models (such as Grok by xAI),
        and every conversation is saved and encrypted so only you can read it. Think of it as a private journal
        that can talk back.
      </p>
    ),
  },
  {
    num: "3",
    title: "What Information We Collect",
    content: (
      <div className="space-y-4">
        <div>
          <p className="text-white/80 font-body text-sm font-semibold mb-2">Information You Provide</p>
          <ul className="space-y-1.5 text-white/60 font-body text-sm">
            {[
              "Account information — your name and email address, collected and managed through Clerk (our authentication provider). We never see or store your password.",
              "Conversations — the messages you send and receive in the app, including any content you import from other AI services.",
              "Settings and preferences — your chosen AI model, context window size, profile settings, and optional keyphrase (stored as a one-way hash we cannot reverse).",
              "API keys — if you provide your own AI provider keys (xAI, OpenAI, Anthropic, Google), these are encrypted at rest and never transmitted to us in plaintext.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white/80 font-body text-sm font-semibold mb-2">Information Collected Automatically</p>
          <ul className="space-y-1.5 text-white/60 font-body text-sm">
            {[
              "Device identifiers — a hashed device token stored in a cookie when you verify a trusted device. This is used only to authorize sensitive actions like account deletion.",
              "Basic usage logs — server logs recording which API endpoints were called and whether they succeeded, without logging message content. These logs are retained for up to 30 days.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white/80 font-body text-sm font-semibold mb-2">Information We Do NOT Collect</p>
          <ul className="space-y-1.5 text-white/60 font-body text-sm">
            {[
              "We do not collect advertising identifiers.",
              "We do not track you across other websites or apps.",
              "We do not use cookies for advertising purposes.",
              "We do not sell, rent, or share your personal data with third parties for marketing.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">✗</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  {
    num: "4",
    title: "How We Protect Your Data",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>
          All conversation content, API keys, and other sensitive fields are encrypted at rest using{" "}
          <span className="text-white/80">AES-256-GCM</span> with per-user keys derived via HKDF. This means:
        </p>
        <ul className="space-y-1.5">
          {[
            "Even if our database were compromised, your message content would be unreadable without your encryption root secret.",
            "Your API keys are stored encrypted and decrypted only in memory at the moment they are needed to make an AI request.",
            "Snapshots (periodic backups of your conversations) are encrypted with the same per-user key before being stored.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p>
          Data is stored in a PostgreSQL database hosted on Replit infrastructure in the United States.
        </p>
      </div>
    ),
  },
  {
    num: "5",
    title: "Third-Party Services",
    content: (
      <div className="space-y-3">
        <p className="text-white/60 font-body text-sm leading-relaxed">
          We use the following third-party services to operate the app:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-white/50 font-semibold py-2 pr-4">Service</th>
                <th className="text-left text-white/50 font-semibold py-2 pr-4">Purpose</th>
                <th className="text-left text-white/50 font-semibold py-2">Privacy Policy</th>
              </tr>
            </thead>
            <tbody>
              {THIRD_PARTY.map((row) => (
                <tr key={row.name} className="border-b border-white/5">
                  <td className="text-white/80 py-2 pr-4 whitespace-nowrap">{row.name}</td>
                  <td className="text-white/60 py-2 pr-4">{row.purpose}</td>
                  <td className="py-2">
                    <a href={row.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {row.url.replace("https://", "")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-white/50 font-body text-sm">
          When you send a message, your conversation context is sent to the AI provider you have selected.
          Please review their privacy policies to understand how they handle that data.
        </p>
      </div>
    ),
  },
  {
    num: "6",
    title: "How We Use Your Information",
    content: (
      <ul className="space-y-1.5 text-white/60 font-body text-sm">
        {[
          "Authenticate you and keep your account secure.",
          "Store, encrypt, and retrieve your conversations on your behalf.",
          "Send transactional emails (verification codes, deletion confirmation links). We do not send marketing emails.",
          "Generate automatic snapshots and provide restore functionality.",
          "Improve reliability and diagnose technical issues using anonymized logs.",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-primary mt-0.5 shrink-0">{i + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: "7",
    title: "Your Rights and Controls",
    content: (
      <div className="space-y-3">
        <p className="text-white/60 font-body text-sm">You have full control over your data:</p>
        <ul className="space-y-1.5 text-white/60 font-body text-sm">
          {[
            "Export — download any conversation as JSON or Markdown at any time.",
            "Delete conversations — delete individual threads immediately, or initiate a protected bulk-deletion flow (with a 24-hour or 2-week cooling-off period for large deletions to protect against accidental or coerced deletion).",
            "Delete your account — initiates a full account deletion with a 2-week waiting period and a signed email confirmation link.",
            "Snapshots — manually create a full encrypted backup of your vault at any time, or restore from any saved snapshot.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-white/50 font-body text-sm">
          If you are located in the European Economic Area (EEA), United Kingdom, or California, you may have
          additional rights under GDPR, UK GDPR, or CCPA respectively, including the right to access, rectify,
          or erase your data. Contact us at{" "}
          <a href="mailto:oblivionhappier@icloud.com" className="text-primary hover:underline">
            oblivionhappier@icloud.com
          </a>{" "}
          to exercise these rights.
        </p>
      </div>
    ),
  },
  {
    num: "8",
    title: "Data Retention",
    content: (
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-white/50 font-semibold py-2 pr-6">Data</th>
              <th className="text-left text-white/50 font-semibold py-2">Retention</th>
            </tr>
          </thead>
          <tbody>
            {RETENTION.map((row) => (
              <tr key={row.data} className="border-b border-white/5">
                <td className="text-white/80 py-2 pr-6">{row.data}</td>
                <td className="text-white/60 py-2">{row.retention}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    num: "9",
    title: "Children's Privacy",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        The Memory Machine is not directed at children under the age of 13. We do not knowingly collect
        personal information from children under 13. If you believe we have inadvertently collected such
        information, please contact us immediately.
      </p>
    ),
  },
  {
    num: "10",
    title: "Changes to This Policy",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        We may update this policy from time to time. We will notify you of material changes by updating
        the "Last updated" date above. Continued use of the app after changes constitutes acceptance of
        the updated policy.
      </p>
    ),
  },
];

export default function TheMemoryMachinePrivacy() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
      <RouteMeta
        title="The Memory Machine Privacy Policy — LivHappier Apps"
        description="Privacy Policy for The Memory Machine. Your conversations are encrypted at rest with AES-256-GCM. We never sell your data."
        canonical={`${BASE}/apps/thememorymachine/privacy`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <ShieldCheck className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white neon-text-cyan mb-3">
          Privacy Policy
        </h1>
        <p className="text-white/50 font-body text-sm">The Memory Machine · LivHappier Apps</p>
        <p className="text-white/30 font-body text-xs mt-1">Effective date: July 1, 2026 · Last updated: July 1, 2026</p>
      </motion.div>

      <div className="space-y-4">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
          >
            <h2 className="text-base font-display font-bold text-white mb-3">
              {section.num}. {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
        >
          <p className="text-white/80 font-display font-bold text-base mb-1">Contact</p>
          <p className="text-white/50 font-body text-sm">Livhappier Apps</p>
          <a href="mailto:oblivionhappier@icloud.com" className="text-primary hover:underline font-body text-sm">
            oblivionhappier@icloud.com
          </a>
          <p className="text-white/40 font-body text-sm mt-1">livhappierapps.com</p>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 text-sm font-body text-white/40">
        <Link href="/apps/thememorymachine/terms" className="hover:text-primary transition-colors">
          Terms & Conditions
        </Link>
        <span className="hidden sm:inline text-white/20">·</span>
        <Link href="/apps/thememorymachine" className="hover:text-white/60 transition-colors">
          ← The Memory Machine
        </Link>
      </div>
    </div>
  );
}
