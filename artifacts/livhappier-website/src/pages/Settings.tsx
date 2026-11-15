import { motion } from "framer-motion";
import { Mail, ShieldCheck, ExternalLink, AlertCircle } from "lucide-react";
import { RouteMeta } from "@/components/RouteMeta";

const PLATFORM_LINKS = [
  {
    name: "Stripe",
    subtitle: "Payments & Financial Services",
    color: "cyan",
    url: "https://stripe.com/legal/restricted-businesses",
    policyUrl: "https://stripe.com/legal/ssa",
    policyLabel: "Stripe Services Agreement",
    description:
      "All payment processing within LivHappierApps is conducted in full compliance with Stripe's Prohibited and Restricted Businesses policy. No LivHappierApps product facilitates illegal goods, adult content, gambling, or any other Stripe-prohibited activity.",
  },
  {
    name: "Apple",
    subtitle: "App Store Review Guidelines",
    color: "pink",
    url: "https://developer.apple.com/app-store/review/guidelines/",
    policyUrl: "https://developer.apple.com/app-store/review/guidelines/",
    policyLabel: "App Store Review Guidelines",
    description:
      "All iOS apps published under LivHappierApps are built to meet Apple's App Store Review Guidelines — including safety, privacy, content moderation for user-generated content, use of Apple's In-App Purchase system where required, and Human Interface Guidelines.",
  },
  {
    name: "Google",
    subtitle: "Google Play Developer Policy",
    color: "cyan",
    url: "https://play.google.com/about/developer-content-policy/",
    policyUrl: "https://play.google.com/about/developer-content-policy/",
    policyLabel: "Google Play Developer Policy",
    description:
      "All Android apps published under LivHappierApps comply with Google Play's Developer Content Policy — including content restrictions, privacy requirements, use of Google Play's billing system for in-app purchases, and user data handling standards.",
  },
];

const COMPLIANCE_NOTES = [
  {
    app: "2wai",
    color: "purple",
    notes: [
      "Live video content moderation and reporting tools",
      "No adult or sexually explicit content of any kind",
      "Age-appropriate content ratings declared on submission",
      "User privacy protected — no video stored without consent",
    ],
  },
  {
    app: "MiddleMAIn",
    color: "cyan",
    notes: [
      "No account required — no personal data collected or stored by LivHappier Apps",
      "API keys stored on-device only, never transmitted to LivHappier Apps servers",
      "Subscriptions and one-time purchases processed through Apple IAP / Google Play Billing",
      "AI output clearly disclaimed — not professional advice; user responsible for reviewing generated code",
      "Camera/microphone access requested only for Vision features with clear user consent",
    ],
  },
  {
    app: "EdenMux",
    color: "cyan",
    notes: [
      "No facilitation of illegal data transmission or unauthorized access",
      "User connections governed by clear Terms of Service",
    ],
  },
  {
    app: "The Memory Machine",
    color: "cyan",
    notes: [
      "All stored AI conversation data is private to the account holder",
      "Privacy Policy clearly discloses data retention and deletion rights",
    ],
  },
  {
    app: "GenMyOwn",
    color: "pink",
    notes: [
      "Apps built using GenMyOwn must comply with applicable store policies",
      "No tools provided to create prohibited or restricted content",
    ],
  },
  {
    app: "RealizeMe",
    color: "purple",
    notes: [
      "User photos are never stored or shared without explicit consent",
      "Full compliance with platform privacy frameworks (ATT on iOS, etc.)",
    ],
  },
  {
    app: "AIs&Ears",
    color: "pink",
    notes: [
      "Camera and microphone access requested only with clear user consent",
      "No audio or visual data transmitted without disclosure",
    ],
  },
  {
    app: "TimeAtlus",
    color: "cyan",
    notes: [
      "No personally identifiable data collected beyond what is disclosed",
    ],
  },
];

function NeonDot({ color }: { color: string }) {
  const styles: Record<string, string> = {
    cyan: "bg-primary shadow-[0_0_6px_#00e5ff]",
    pink: "bg-secondary shadow-[0_0_6px_#ff00c8]",
    purple: "bg-accent shadow-[0_0_6px_#7b2fff]",
  };
  return <span className={`inline-block w-2 h-2 rounded-full shrink-0 mt-1.5 ${styles[color]}`} />;
}

export default function Settings() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <RouteMeta
        title="Settings & Compliance — LivHappier Apps"
        description="App preferences, compliance commitment with Stripe, Apple, and Google, and contact information for LivHappier Apps."
        canonical="https://livhappierapps.com/settings"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white neon-text-cyan whitespace-nowrap">
            Compliance & Contact
          </h1>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
        </div>

        {/* App preferences placeholder */}
        <div className="settings-placeholder-card mb-4">
          <p className="text-muted-foreground font-body text-center">
            App preferences and account settings coming soon.
          </p>
        </div>
      </motion.div>

      {/* ── Compliance Section ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <ShieldCheck className="w-7 h-7 text-primary shrink-0 drop-shadow-[0_0_8px_#00e5ff]" />
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white neon-text-cyan whitespace-nowrap">
            Our Compliance Commitment
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-primary to-transparent opacity-50" />
        </div>

        {/* Commitment statement */}
        <div className="glass-panel rounded-2xl p-6 mb-6 border border-primary/20">
          <p className="text-white/85 font-body leading-relaxed text-base">
            Every app under the <img src="/logo.png" alt="LivHappierApps" className="inline h-6 w-auto object-contain align-middle mx-1" /> umbrella
            is designed, built, and published in full compliance with the terms, policies, and review
            guidelines of <span className="text-secondary font-bold">Stripe</span>,{" "}
            <span className="text-primary font-bold">Apple</span>, and{" "}
            <span className="text-primary font-bold">Google</span>. This is our promise to our users,
            our platform partners, and the developer community. As each app launches, its compliance
            status is reviewed and documented before submission.
          </p>
        </div>

        {/* Platform cards */}
        <div className="space-y-4 mb-8">
          {PLATFORM_LINKS.map((platform, i) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`glass-panel rounded-2xl p-5 border ${
                platform.color === "cyan"
                  ? "border-primary/25 hover:border-primary/50"
                  : "border-secondary/25 hover:border-secondary/50"
              } transition-all duration-300`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3
                    className={`font-display font-bold text-lg text-white ${
                      platform.color === "cyan" ? "neon-text-cyan" : "neon-text-pink"
                    }`}
                  >
                    {platform.name}
                  </h3>
                  <p className="text-white/50 font-body text-xs tracking-wider mt-0.5">
                    {platform.subtitle}
                  </p>
                </div>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 text-xs font-body font-bold tracking-wider shrink-0 transition-colors ${
                    platform.color === "cyan"
                      ? "text-primary hover:text-white"
                      : "text-secondary hover:text-white"
                  }`}
                >
                  View Policy <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <p className="text-white/70 font-body text-sm leading-relaxed">
                {platform.description}
              </p>
              <div className="mt-3 pt-3 border-t border-white/5">
                <a
                  href={platform.policyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/35 hover:text-white/70 font-body transition-colors flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  {platform.policyLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Per-app compliance notes */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle className="w-5 h-5 text-secondary shrink-0 drop-shadow-[0_0_6px_#ff00c8]" />
            <h3 className="font-display font-bold text-lg text-white neon-text-pink">
              Per-App Compliance Notes
            </h3>
          </div>
          <p className="text-white/50 font-body text-sm mb-5 leading-relaxed">
            Each app is reviewed against platform-specific requirements before launch. Below are the
            key compliance commitments for each LivHappierApps title.
          </p>
          <div className="space-y-5">
            {COMPLIANCE_NOTES.map((item, i) => (
              <motion.div
                key={item.app}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <p
                  className={`font-display font-bold text-base mb-2 ${
                    item.color === "cyan"
                      ? "text-primary neon-text-cyan"
                      : item.color === "pink"
                      ? "text-secondary neon-text-pink"
                      : "text-accent"
                  }`}
                >
                  {item.app}
                </p>
                <ul className="space-y-1.5">
                  {item.notes.map((note, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <NeonDot color={item.color} />
                      <span className="text-white/65 font-body text-sm leading-snug">{note}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="settings-contact-card"
      >
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-display font-bold text-white neon-text-pink whitespace-nowrap">
            Contact
          </h2>
          <div className="h-[2px] flex-1 bg-gradient-to-r from-secondary to-transparent opacity-50" />
        </div>

        <p className="settings-contact-prompt">
          Need extra support or need to contact the developer?
        </p>

        <a
          href="mailto:oblivionhappier@icloud.com"
          className="settings-contact-email"
        >
          <Mail className="w-5 h-5 flex-shrink-0" />
          oblivionhappier@icloud.com
        </a>
      </motion.div>
    </div>
  );
}
