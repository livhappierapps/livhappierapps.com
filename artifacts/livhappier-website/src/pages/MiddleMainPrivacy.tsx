import { motion } from "framer-motion";
import { Link } from "wouter";
import { ShieldCheck } from "lucide-react";
import { RouteMeta } from "@/components/RouteMeta";

const SECTIONS = [
  {
    num: "1",
    title: "How MiddleMAIn Handles Information",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        MiddleMAIn handles information differently depending on the features you use. Some
        information is stored in the app on your device; selected AI, sharing, bridge, GitHub,
        memory, and server features send information to the services needed to provide them. The
        sections below describe those flows.
      </p>
    ),
  },
  {
    num: "2",
    title: "Information Stored on Your Device",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-4">
          On iOS and Android, provider API keys are stored with Expo SecureStore; keys in legacy
          storage are migrated to SecureStore. In the browser preview, provider keys stay in session
          memory. Other app data listed below is stored in app storage. The Memory Machine MCP
          bearer token is stored in ordinary app storage, not SecureStore. Information may also be
          transmitted when you use the features described below.
        </p>
        <ul className="space-y-2 text-white/60 font-body text-sm">
          {[
            "AI connection configurations (provider name, model, endpoint)",
            "Memory Machine MCP endpoint settings and bearer token",
            "Custom skill definitions and other skills you use",
            "App preferences and settings",
            "Chat history",
            "Purchase and subscription status (for unlocking features)",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="text-white/50 font-body text-sm mt-4">
          Uninstalling the App removes local data managed by the app, but does not delete information
          already sent to AI providers, configured services, or stored by backend features described
          below.
        </p>
      </>
    ),
  },
  {
    num: "3",
    title: "AI Conversations and Code Analysis — Your Selected Provider",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-4">
          When you use AI conversations or code analysis, your prompts, code, and attached images
          are sent to the AI provider you selected. For direct connections, the selected provider
          also receives the credential needed to authorize the request. Server-proxy mode sends
          content through the LivHappier Apps backend before forwarding it to xAI's Grok API, as
          described below.
        </p>
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-4">
          <p className="text-white/80 font-body text-sm leading-relaxed">
            <span className="text-primary font-bold">Explicit Consent:</span> By configuring an AI
            connection and sending a request, you direct the prompts, code, and any attached images
            you submit to be transmitted to the third-party AI provider you selected.
          </p>
        </div>
        <p className="text-white/60 font-body text-sm mb-3">Each AI provider operates under their own privacy policy:</p>
        <ul className="space-y-2 text-white/60 font-body text-sm">
          {[
            { name: "xAI (Grok)", url: "https://x.ai/legal/privacy-policy" },
            { name: "OpenAI", url: "https://openai.com/policies/privacy-policy" },
            { name: "Anthropic", url: "https://www.anthropic.com/privacy" },
          ].map((p) => (
            <li key={p.name} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              <span>{p.name}: <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 hover:text-white transition-colors">{p.url}</a></span>
            </li>
          ))}
          <li className="flex items-start gap-2">
            <span className="text-primary mt-0.5 shrink-0">•</span>
            Custom providers: refer to that provider's privacy policy
          </li>
        </ul>
      </>
    ),
  },
  {
    num: "4",
    title: 'Server Proxy Mode ("Dev\'s Grok")',
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-4">
          In "Dev's Grok" server-proxy mode, your prompts, code, and attached images pass through a
          LivHappier Apps backend before being forwarded to xAI's Grok API. The backend receives this
          content as part of the request. This policy does not promise that proxy content is never
          logged, stored, or retained. Hosting services may also process information associated with
          network requests.
        </p>
        <ul className="space-y-2 text-white/60 font-body text-sm">
          {[
            "Prompts, code, and attached images pass through our backend",
            'You can identify this mode by the "Dev\'s Grok" label',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-primary mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "5",
    title: "Live Council Rooms",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        When you use Live Council rooms, the backend stores room names, participant display names,
        timestamps, and messages. Visitors who can access a shared room can see its discussion,
        including messages and participant display names.
      </p>
    ),
  },
  {
    num: "6",
    title: "Optional Camera, Microphone, and Screen Bridge",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        AIs &amp; Ears is a separate service with its own URL and bridge key; these are separate from
        your AI-provider credentials. MiddleMAIn requests a bridge session at
        <span className="text-white"> /api/bridge/session</span> and then uses the returned WebSocket
        session. Camera preview stays on your device until you explicitly send a frame to an AI
        feature or start camera sharing. A frame submitted for AI analysis goes to that feature's
        selected provider. While camera sharing is on, front-camera frames are sent to the configured
        AIs &amp; Ears vision endpoint about every three seconds. Microphone audio is sent only while Hearing is
        enabled and microphone permission is granted. Screen sharing requires you to turn it on;
        while active, terminal-view captures are sent about every three seconds. These features send
        content only while the relevant control is active and stop when switched off. AIs &amp; Ears'
        own terms and privacy policy govern its handling after receipt.
      </p>
    ),
  },
  {
    num: "7",
    title: "GitHub and Memory Connections",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        GitHub exchanges authorization information and repository data you select. For Memory
        Machine, you configure an MCP endpoint and Bearer token in Settings → Memory Bridge.
        MiddleMAIn sends JSON-RPC tool-discovery (<span className="text-white">tools/list</span>) and
        tool-call (<span className="text-white">tools/call</span>) requests, which can include content
        you select for the tool. The Memory Machine token is stored in ordinary app storage, not
        SecureStore. Each connected service's own privacy terms apply to information it receives.
      </p>
    ),
  },
  {
    num: "8",
    title: "Optional Bug Reports",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-3">
          If you choose to submit a bug report through the in-app reporting tool, the report can
          include the text you write and app/version details. Submission is voluntary.
        </p>
        <p className="text-white/60 font-body text-sm">
          Bug reports do <span className="text-white font-bold">not automatically attach</span> your AI
          conversations, keys, configurations, device identifiers, or location data. Because you write
          the report text, avoid including personal or sensitive information unless needed. Hosting and
          network services may also process information associated with requests to provide and secure
          the service.
        </p>
      </>
    ),
  },
  {
    num: "9",
    title: "Purchases and Subscriptions",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        Premium subscriptions and one-time purchases, when offered, are processed through Apple's App
        Store (iOS) or Google Play (Android). Those stores handle payment information under their
        respective terms and privacy policies. The app may process purchase or subscription status to
        provide paid features.
      </p>
    ),
  },
  {
    num: "10",
    title: "Children's Privacy",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        MiddleMAIn is a professional developer tool intended for users aged 17 and older. If you have
        questions about information relating to a child, contact us using the details below.
      </p>
    ),
  },
  {
    num: "11",
    title: "Data Security",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        Information is sent to providers, bridge services, backend services, and hosting services as
        described in this policy. The security and retention practices vary by service and configured
        endpoint. This policy does not guarantee that every service uses the same protections or
        deletes information after receiving it.
      </p>
    ),
  },
  {
    num: "12",
    title: "Your Rights (GDPR / CCPA)",
    content: (
      <>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-3">
          Information stored locally can be managed in the App or removed with local app data.
          Information sent to an AI, bridge, GitHub, or memory provider is handled under that
          provider's terms and privacy policy. Live Council room information is stored by the backend.
          For questions or requests about information handled by LivHappier Apps, contact us using the
          details below.
        </p>
        <p className="text-white/60 font-body text-sm leading-relaxed mb-2">
          <span className="text-white font-bold">EU/EEA residents:</span> Some features process
          information that may be personal data, such as participant display names and messages in
          Live Council rooms. Contact us with questions or requests about data handled by LivHappier Apps.
        </p>
        <p className="text-white/60 font-body text-sm leading-relaxed">
          <span className="text-white font-bold">California residents:</span> MiddleMAIn does not sell
          personal information and does not share personal information with third parties for
          cross-context behavioral advertising.
        </p>
      </>
    ),
  },
  {
    num: "13",
    title: "Changes to This Policy",
    content: (
      <p className="text-white/60 font-body text-sm leading-relaxed">
        We may update this Privacy Policy from time to time. Changes will be posted at{" "}
        <span className="text-primary">livhappierapps.com/apps/middlemain/privacypolicy</span> and reflected
        with an updated "Last Updated" date. Continued use of the App after changes constitutes
        acceptance of the updated policy.
      </p>
    ),
  },
];

export default function MiddleMainPrivacy() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RouteMeta
        title="MiddleMAIn Privacy Policy — LivHappier Apps"
        description="MiddleMAIn Privacy Policy: how local storage, AI providers, Live Council, optional integrations, and hosting services handle information."
        canonical="https://livhappierapps.com/apps/middlemain/privacypolicy"
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
          <ShieldCheck className="w-7 h-7 text-primary shrink-0 drop-shadow-[0_0_8px_#00e5ff]" />
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white neon-text-cyan">
            Privacy Policy
          </h1>
        </div>
        <p className="text-white/40 font-body text-sm mt-2">
          MiddleMAIn · Last Updated: October 21, 2026 · Effective: October 21, 2026
        </p>
        <p className="text-white/40 font-body text-sm">
          Published by LivHappier Apps · livhappierapps.com
        </p>
      </motion.div>

      {/* Key Promise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-2xl p-6 border border-primary/30 mb-10"
      >
        <h2 className="text-lg font-display font-bold text-white neon-text-cyan mb-3">Our Key Promise</h2>
        <p className="text-white/75 font-body text-sm leading-relaxed">
          MiddleMAIn explains how information is handled across local app storage and the services
          used by its features. Provider keys, connection settings, preferences, skills, and chat
          history are stored locally; information is also sent to selected providers and backend
          services when you use features described below.
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
        <p className="text-white/60 font-body text-sm mb-3">Questions about this Privacy Policy?</p>
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
        <Link href="/apps/middlemain/terms" className="text-white/40 hover:text-primary transition-colors">
          Terms & Conditions →
        </Link>
      </div>
    </div>
  );
}
