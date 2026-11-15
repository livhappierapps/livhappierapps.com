import { motion } from "framer-motion";
import { Link } from "wouter";
import { ScrollText } from "lucide-react";
import { RouteMeta } from "@/components/RouteMeta";

const BASE = "https://livhappierapps.com";

const SECTIONS = [
  {
    num: "1",
    title: "Agreement to Terms",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>
          By downloading, installing, or using The Memory Machine ("the App"), you agree to be bound
          by these Terms of Service ("Terms"). If you do not agree, do not use the App.
        </p>
        <p>
          The App is developed and operated by <span className="text-white/80">Livhappier Apps</span>{" "}
          ("we," "us," or "our"). Questions? Contact us at{" "}
          <a href="mailto:oblivionhappier@icloud.com" className="text-primary hover:underline">
            oblivionhappier@icloud.com
          </a>.
        </p>
      </div>
    ),
  },
  {
    num: "2",
    title: "Eligibility",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>
          You must be at least <span className="text-white/80">13 years old</span> to use the App.
          If you are under 18, you represent that your parent or guardian has reviewed and agreed to
          these Terms on your behalf.
        </p>
        <p>By using the App, you represent that:</p>
        <ul className="space-y-1.5">
          {[
            "All registration information you submit is accurate and truthful.",
            "You will maintain the accuracy of that information.",
            "Your use of the App does not violate any applicable law or regulation.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    num: "3",
    title: "Your Account",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>You are responsible for:</p>
        <ul className="space-y-1.5">
          {[
            "Maintaining the confidentiality of your login credentials.",
            "All activity that occurs under your account.",
            "Immediately notifying us if you suspect unauthorized access.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p>We reserve the right to terminate or suspend accounts that violate these Terms.</p>
      </div>
    ),
  },
  {
    num: "4",
    title: "What the App Does",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>
          The Memory Machine lets you conduct conversations with AI language models and stores those
          conversations in an encrypted personal vault. Key features include:
        </p>
        <ul className="space-y-2">
          {[
            ["Conversation storage", "messages are encrypted at rest with per-user AES-256-GCM encryption."],
            ["AI responses", "the App routes your messages to an AI provider (xAI Grok by default, or others you configure). Response quality, accuracy, and availability depend on those third-party providers."],
            ["Snapshots", "periodic encrypted backups of your vault for disaster recovery."],
            ["Trusted devices", "device verification for sensitive account actions."],
            ["Import/export", "import conversations from other AI services; export in JSON or Markdown."],
          ].map(([label, desc]) => (
            <li key={label} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              <span><span className="text-white/80">{label}</span> — {desc}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    num: "5",
    title: "AI Disclaimer",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>
          The App is a <span className="text-white/80">tool for interacting with third-party AI services</span>.
          We do not operate the AI models themselves. Please be aware that:
        </p>
        <ul className="space-y-1.5">
          {[
            "AI responses may be inaccurate, incomplete, or outdated. Do not rely on AI outputs for medical, legal, financial, or safety-critical decisions.",
            "AI conversations are sent to the AI provider you have selected (xAI, OpenAI, Anthropic, or Google). Their terms and privacy policies apply to that data.",
            "We are not responsible for the content of AI-generated responses.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    num: "6",
    title: "API Keys",
    content: (
      <ul className="space-y-1.5 text-white/60 font-body text-sm leading-relaxed">
        {[
          "Your keys are encrypted at rest and used only to make requests on your behalf.",
          "You are responsible for any costs or usage incurred through your API keys.",
          "We are not responsible for unauthorized use of your keys if you share your account credentials with others.",
        ].map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="text-primary mt-0.5 shrink-0">•</span>
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    num: "7",
    title: "Acceptable Use",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>You agree not to use the App to:</p>
        <ul className="space-y-1.5">
          {[
            "Violate any applicable law or regulation.",
            "Harass, threaten, or harm any person.",
            "Attempt to circumvent security measures or gain unauthorized access to our systems or other users' data.",
            "Use automated tools to scrape, crawl, or extract data from the App without our written permission.",
            "Reverse engineer, decompile, or disassemble the App.",
            "Use the App in any way that could damage, disable, or impair our infrastructure.",
            "Attempt to use another user's account or impersonate any person or entity.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">✗</span>
              {item}
            </li>
          ))}
        </ul>
        <p>
          We reserve the right to suspend or terminate your account immediately if we believe you are
          violating these rules.
        </p>
      </div>
    ),
  },
  {
    num: "8",
    title: "Data Ownership",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>
          <span className="text-white/80">You own your conversations.</span> We claim no ownership
          over the content you store in the App. You grant us a limited, non-exclusive license to
          store, encrypt, and retrieve your content solely for the purpose of providing the App's
          functionality to you.
        </p>
        <p>
          You can export or delete your data at any time. See the{" "}
          <Link href="/apps/thememorymachine/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          for details on data retention.
        </p>
      </div>
    ),
  },
  {
    num: "9",
    title: "Deletion and Account Termination",
    content: (
      <div className="space-y-4 text-white/60 font-body text-sm leading-relaxed">
        <div>
          <p className="text-white/80 font-semibold mb-1">You May Delete Your Account</p>
          <p>
            You can request account deletion through the App's Settings. Bulk deletions and full
            account deletions are subject to a waiting period (24 hours for single threads, 2 weeks
            for full history or account deletion) as a protection against accidental or coerced
            deletion. A warning banner will appear in the App during the waiting period with an
            option to cancel.
          </p>
        </div>
        <div>
          <p className="text-white/80 font-semibold mb-1">We May Terminate Your Account</p>
          <p>
            We may suspend or terminate your access if you violate these Terms, or if we discontinue
            the App. In the event of discontinuation, we will provide reasonable advance notice and
            an opportunity to export your data.
          </p>
        </div>
      </div>
    ),
  },
  {
    num: "10",
    title: "Intellectual Property",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        The App, including its design, code, and branding, is owned by Livhappier Apps and protected
        by copyright and other intellectual property laws. You may not copy, modify, or distribute
        the App without our written permission.
      </p>
    ),
  },
  {
    num: "11",
    title: "Disclaimers",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p className="text-white/50 text-xs uppercase tracking-wide">
          THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        </p>
        <p>We do not warrant that:</p>
        <ul className="space-y-1.5">
          {[
            "The App will be uninterrupted, error-free, or secure.",
            "Any AI responses will be accurate or complete.",
            "The App will meet your specific requirements.",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    num: "12",
    title: "Limitation of Liability",
    content: (
      <p className="text-white/50 font-body text-xs leading-relaxed uppercase tracking-wide">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, LIVHAPPIER APPS SHALL NOT BE LIABLE FOR
        ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF
        DATA, LOSS OF PROFITS, OR BUSINESS INTERRUPTION, ARISING FROM YOUR USE OF OR INABILITY TO
        USE THE APP, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL
        LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR YOUR USE OF THE APP SHALL NOT EXCEED THE
        AMOUNT YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR $50 USD IF YOU HAVE NOT
        MADE ANY PAYMENTS.
      </p>
    ),
  },
  {
    num: "13",
    title: "Indemnification",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        You agree to indemnify and hold harmless Livhappier Apps and its officers, employees, and
        agents from any claims, damages, or expenses (including reasonable legal fees) arising from
        your use of the App or violation of these Terms.
      </p>
    ),
  },
  {
    num: "14",
    title: "Governing Law",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        These Terms are governed by the laws of Oklahoma, without regard to conflict of law
        principles. Any disputes shall be resolved in the courts of Tulsa County.
      </p>
    ),
  },
  {
    num: "15",
    title: "Changes to These Terms",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        We may update these Terms from time to time. We will notify you by updating the "Last
        updated" date above. If we make material changes, we may also provide in-app notice. Your
        continued use of the App after changes constitutes acceptance of the updated Terms.
      </p>
    ),
  },
];

export default function TheMemoryMachineTerms() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16">
      <RouteMeta
        title="The Memory Machine Terms & Conditions — LivHappier Apps"
        description="Terms and Conditions for The Memory Machine by LivHappier Apps. Governing law: Oklahoma."
        canonical={`${BASE}/apps/thememorymachine/terms`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border border-primary/30 mb-4">
          <ScrollText className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white neon-text-cyan mb-3">
          Terms & Conditions
        </h1>
        <p className="text-white/50 font-body text-sm">The Memory Machine · LivHappier Apps</p>
        <p className="text-white/30 font-body text-xs mt-1">
          Effective date: July 1, 2026 · Last updated: July 1, 2026
        </p>
      </motion.div>

      <div className="space-y-4">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i, duration: 0.4 }}
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
          transition={{ delay: 0.6, duration: 0.4 }}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6 text-center"
        >
          <p className="text-white/80 font-display font-bold text-base mb-1">Contact</p>
          <p className="text-white/50 font-body text-sm">Livhappier Apps</p>
          <a
            href="mailto:oblivionhappier@icloud.com"
            className="text-primary hover:underline font-body text-sm"
          >
            oblivionhappier@icloud.com
          </a>
          <p className="text-white/40 font-body text-sm mt-1">livhappierapps.com</p>
        </motion.div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 text-sm font-body text-white/40">
        <Link href="/apps/thememorymachine/privacy" className="hover:text-primary transition-colors">
          Privacy Policy
        </Link>
        <span className="hidden sm:inline text-white/20">·</span>
        <Link href="/apps/thememorymachine" className="hover:text-white/60 transition-colors">
          ← The Memory Machine
        </Link>
      </div>
    </div>
  );
}
