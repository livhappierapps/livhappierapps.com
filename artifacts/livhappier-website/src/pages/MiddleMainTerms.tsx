import { motion } from "framer-motion";
import { Link } from "wouter";
import { FileText } from "lucide-react";
import { RouteMeta } from "@/components/RouteMeta";

const SECTIONS = [
  {
    num: "1",
    title: "Acceptance of Terms",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        By downloading, installing, or using Middlemain ("the App"), you agree to be bound by these
        Terms and Conditions ("Terms"). If you do not agree, do not use the App. These Terms form a
        legal agreement between you and LivHappier Apps ("we," "our," "us"). The App is available on
        the Apple App Store and Google Play Store.
      </p>
    ),
  },
  {
    num: "2",
    title: "Description of Service",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-3">
          Middlemain is a professional developer tool that acts as an interface bridge between you and
          third-party AI providers (including but not limited to xAI/Grok, OpenAI, and Anthropic). The
          App provides a terminal interface, skill-based prompting, vision/image analysis features, and
          multi-provider AI connection management.
        </p>
        <p className="text-white/60 font-body text-sm leading-relaxed">
          <span className="text-white font-bold">Middlemain is a tool, not an AI provider.</span> We
          do not operate, control, or take responsibility for the AI models you connect to.
        </p>
      </>
    ),
  },
  {
    num: "3",
    title: "Eligibility",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        You must be at least <span className="text-white font-bold">17 years of age</span> to use
        Middlemain. By using the App, you represent that you meet this requirement.
      </p>
    ),
  },
  {
    num: "4",
    title: "API Keys and Third-Party Services",
    content: (
      <div className="space-y-4">
        <div>
          <p className="text-white/80 font-body text-sm font-bold mb-2">4.1 Your Responsibility</p>
          <p className="text-white/60 font-body text-sm leading-relaxed mb-2">
            When you connect an AI provider using your own API key, you are solely responsible for:
          </p>
          <ul className="space-y-1.5 text-white/60 font-body text-sm">
            {[
              "The security and confidentiality of your API keys",
              "All usage charges incurred on your API account",
              "Compliance with the third-party provider's terms of service",
              "Any content you send to or receive from the AI provider",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-primary mt-0.5 shrink-0">•</span>{item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white/80 font-body text-sm font-bold mb-1">4.2 No Endorsement</p>
          <p className="text-white/60 font-body text-sm">LivHappier Apps does not endorse, guarantee, or warrant any third-party AI provider accessible through the App.</p>
        </div>
        <div>
          <p className="text-white/80 font-body text-sm font-bold mb-1">4.3 Provider Terms</p>
          <p className="text-white/60 font-body text-sm">Your use of connected AI providers is also governed by those providers' own terms of service and privacy policies. It is your responsibility to comply with those terms.</p>
        </div>
        <div>
          <p className="text-white/80 font-body text-sm font-bold mb-1">4.4 API Key Storage</p>
          <p className="text-white/60 font-body text-sm">Your API keys are stored locally on your device only. LivHappier Apps does not have access to your API keys. You assume full responsibility for securing your device and your keys.</p>
        </div>
      </div>
    ),
  },
  {
    num: "5",
    title: "AI Output Disclaimer",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-3">
          AI-generated output (code, analysis, suggestions, explanations) produced by any AI provider
          you connect to through Middlemain:
        </p>
        <ul className="space-y-2 text-white/60 font-body text-sm mb-3">
          {[
            "May be inaccurate, incomplete, or incorrect",
            "Should be reviewed before use in production environments",
            "Does not constitute professional legal, medical, financial, or security advice",
            "Is the output of the third-party AI provider, not LivHappier Apps",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>{item}
            </li>
          ))}
        </ul>
        <p className="text-white/60 font-body text-sm">
          You are solely responsible for reviewing, testing, and taking responsibility for any code or
          content generated by AI through the App.
        </p>
      </>
    ),
  },
  {
    num: "6",
    title: "Subscriptions and Billing",
    content: (
      <div className="space-y-4">
        {[
          { sub: "6.1 Free Tier", text: "Middlemain is available as a free download with core functionality. Ads may be displayed in the free tier." },
          { sub: "6.2 Premium Subscriptions", text: "Premium subscriptions are available on a monthly ($3.99/month) or annual ($29.99/year) basis. Premium features include ad-free experience, additional customization options, and priority feature access." },
          { sub: "6.3 Ad Removal", text: "A one-time $1.99 purchase permanently removes all in-app advertisements." },
          { sub: "6.4 Billing and Renewals", text: "All purchases are processed through Apple App Store or Google Play. Subscriptions auto-renew unless cancelled at least 24 hours before the end of the billing period. You may manage or cancel subscriptions in your App Store or Google Play account settings." },
          { sub: "6.5 Refunds", text: "All refund requests are handled by Apple or Google under their respective refund policies. LivHappier Apps does not directly process refunds." },
          { sub: "6.6 Price Changes", text: "We reserve the right to change subscription prices. Any price changes will be communicated through the App and/or at livhappierapps.com before taking effect." },
        ].map((item) => (
          <div key={item.sub}>
            <p className="text-white/80 font-body text-sm font-bold mb-1">{item.sub}</p>
            <p className="text-white/60 font-body text-sm leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    num: "7",
    title: "Acceptable Use",
    content: (
      <>
        <p className="text-white/60 font-body text-sm mb-3">You agree not to use Middlemain to:</p>
        <ul className="space-y-2 text-white/60 font-body text-sm">
          {[
            "Violate any applicable laws or regulations",
            "Attempt to circumvent AI provider rate limits or terms of service",
            "Reverse engineer, decompile, or modify the App",
            "Use the App for any illegal, harmful, or malicious purpose",
            "Transmit malware, viruses, or any harmful code",
            "Harass, abuse, or harm any individual through AI-generated content",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">✗</span>{item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "8",
    title: "Intellectual Property",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-3">
          The Middlemain app, its design, branding, name, logo, and code are the intellectual property
          of LivHappier Apps. You are granted a limited, non-exclusive, non-transferable license to use
          the App for its intended purpose on your personal device.
        </p>
        <p className="text-white/60 font-body text-sm leading-relaxed">
          You retain ownership of any code, content, or data you input into the App. LivHappier Apps
          claims no rights over your content.
        </p>
      </>
    ),
  },
  {
    num: "9",
    title: "Disclaimer of Warranties",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-3 uppercase text-xs tracking-wide">
          The app is provided "as is" and "as available" without warranties of any kind, express or
          implied, including warranties of merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>
        <p className="text-white/60 font-body text-sm mb-2">We do not warrant that:</p>
        <ul className="space-y-1.5 text-white/60 font-body text-sm">
          {[
            "The App will be uninterrupted or error-free",
            "Any AI provider will remain available or accurate",
            "The App will meet your specific requirements",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>{item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "10",
    title: "Limitation of Liability",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed uppercase text-xs tracking-wide">
        To the maximum extent permitted by law, LivHappier Apps shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising from your use of the App or
        any AI output generated through it, including but not limited to loss of data, loss of profits,
        or damage to systems from implemented AI-generated code. Our total liability shall not exceed
        the amount you paid for the App in the twelve months preceding the claim.
      </p>
    ),
  },
  {
    num: "11",
    title: "Termination",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        We reserve the right to terminate or suspend access to the App for violations of these Terms.
        You may stop using the App at any time by uninstalling it. Uninstalling removes all locally
        stored data from your device.
      </p>
    ),
  },
  {
    num: "12",
    title: "Governing Law",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        These Terms are governed by the laws of the United States. Any disputes shall be resolved
        under applicable federal and state law. Nothing in these Terms limits your statutory rights
        under the laws of your country of residence.
      </p>
    ),
  },
  {
    num: "13",
    title: "Changes to These Terms",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        We may update these Terms from time to time. Updated Terms will be posted at{" "}
        <span className="text-primary">livhappierapps.com/apps/middlemain/terms</span> and within the
        App. Continued use after changes constitutes acceptance of the updated Terms.
      </p>
    ),
  },
];

export default function MiddleMainTerms() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RouteMeta
        title="MiddleMAIn Terms & Conditions — LivHappier Apps"
        description="Terms and Conditions for MiddleMAIn, available on iOS and Android. Subscription: $3.99/month or $29.99/year."
        canonical="https://livhappierapps.com/apps/middlemain/terms"
      />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <Link href="/apps/middlemain" className="text-white/40 hover:text-primary font-body text-sm transition-colors flex items-center gap-1.5 mb-6">
          ← Back to MiddleMAIn
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-7 h-7 text-primary shrink-0 drop-shadow-[0_0_8px_#00e5ff]" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white neon-text-cyan">
            Terms & Conditions
          </h1>
        </div>
        <p className="text-white/40 font-body text-sm mt-2">
          MiddleMAIn · Last Updated: June 14, 2026 · Effective: June 14, 2026
        </p>
        <p className="text-white/40 font-body text-sm">
          Published by LivHappier Apps · livhappierapps.com
        </p>
      </motion.div>

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.03 }}
            className="glass-panel rounded-2xl p-6 border border-white/10"
          >
            <h2 className="font-display font-bold text-white text-base mb-4">
              <span className="text-primary neon-text-cyan">{section.num}.</span> {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}
      </div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-2xl p-6 border border-secondary/25 mt-8"
      >
        <h2 className="font-display font-bold text-white neon-text-pink text-lg mb-3">14. Contact Us</h2>
        <p className="text-white/60 font-body text-sm mb-3">Questions about these Terms?</p>
        <p className="text-white/80 font-body text-sm font-bold">LivHappier Apps</p>
        <p className="text-white/50 font-body text-sm">livhappierapps.com</p>
        <a href="mailto:oblivionhappier@icloud.com" className="text-primary hover:text-white font-body text-sm transition-colors underline underline-offset-2">
          oblivionhappier@icloud.com
        </a>
      </motion.div>

      {/* Footer links */}
      <div className="flex justify-center gap-6 mt-10 text-sm font-body">
        <Link href="/apps/middlemain" className="text-white/40 hover:text-primary transition-colors">
          ← MiddleMAIn
        </Link>
        <Link href="/apps/middlemain/privacypolicy" className="text-white/40 hover:text-primary transition-colors">
          Privacy Policy →
        </Link>
      </div>
    </div>
  );
}
