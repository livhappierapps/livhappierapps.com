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
          By downloading, installing, or using EdenMux ("the App"), you agree to be bound by these Terms
          of Service ("Terms"). If you do not agree, do not use the App.
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
    title: "Content Coming Soon",
    content: (
      <div className="space-y-3 text-white/60 font-body text-sm leading-relaxed">
        <p>
          The full Terms of Service for EdenMux are being finalized and will be published here
          before the app launches on the App Store and Google Play.
        </p>
        <p>
          In the meantime, if you have any questions, please reach out to us directly at{" "}
          <a href="mailto:oblivionhappier@icloud.com" className="text-primary hover:underline">
            oblivionhappier@icloud.com
          </a>.
        </p>
      </div>
    ),
  },
];

export default function EdenMuxTerms() {
  return (
    <div className="max-w-2xl mx-auto px-4 pb-16">
      <RouteMeta
        title="EdenMux Terms of Service — LivHappier Apps"
        description="Terms of Service for EdenMux by LivHappier Apps."
        canonical={`${BASE}/edenmux/terms`}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-8"
      >
        <ScrollText className="w-7 h-7 text-primary shrink-0" />
        <div>
          <h1 className="font-display text-2xl neon-text-pink">EdenMux — Terms of Service</h1>
          <p className="text-white/40 font-body text-xs mt-0.5">Coming soon · Last updated when published</p>
        </div>
      </motion.div>

      <div className="space-y-4">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.num}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="rounded-xl border border-white/10 bg-white/5 p-5"
          >
            <h2 className="font-display text-base text-white/90 mb-3">
              {section.num}. {section.title}
            </h2>
            {section.content}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Link href="/edenmux" className="text-primary hover:text-primary/80 font-body text-sm transition-colors">
          ← EdenMux
        </Link>
      </motion.div>
    </div>
  );
}
