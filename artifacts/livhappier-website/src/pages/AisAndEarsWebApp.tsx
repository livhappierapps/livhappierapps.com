import { motion } from "framer-motion";
import { ArrowLeft, Camera, Clock3 } from "lucide-react";
import { Link } from "wouter";
import { RouteMeta } from "@/components/RouteMeta";

const BASE = "https://livhappierapps.com";

export default function AisAndEarsWebApp() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
      <RouteMeta
        title="AIs&Ears Web App — Coming Soon"
        description="The AIs&Ears web app is being prepared. Visit the product portal for current availability and official app store listings."
        canonical={`${BASE}/apps/aisandears/webapp`}
      />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-panel rounded-[2rem] border border-secondary/25 px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <Link
          href="/apps/aisandears"
          className="mb-10 inline-flex items-center gap-2 font-body text-sm text-white/55 transition hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          AIs&amp;Ears
        </Link>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-secondary/35 bg-secondary/10 text-secondary shadow-[0_0_32px_rgba(255,0,200,0.12)]">
          <Camera aria-hidden="true" size={30} />
        </div>
        <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.18em] text-secondary">
          Web app
        </p>
        <h1 className="mb-4 font-display text-3xl font-bold text-white neon-text-pink sm:text-5xl">
          Access is coming soon
        </h1>
        <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-white/65 sm:text-lg">
          This is the planned home for the AIs&amp;Ears web app. The working
          web app has not been connected here yet, so there is nothing to sign
          into or use on this page today.
        </p>

        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-body text-sm text-white/55">
          <Clock3 aria-hidden="true" size={16} />
          Launch details will be posted here
        </div>

        <div className="mt-10">
          <Link
            href="/apps/aisandears"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 font-body text-sm font-bold text-white transition hover:border-secondary/40 hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            Back to the product portal
          </Link>
        </div>
      </motion.section>

      <div className="mt-8 flex flex-col justify-center gap-3 text-center text-sm font-body sm:flex-row sm:gap-6">
        <Link
          href="/apps/aisandears/privacy"
          className="text-white/45 transition hover:text-secondary"
        >
          Privacy Policy
        </Link>
        <Link
          href="/apps/aisandears/terms"
          className="text-white/45 transition hover:text-secondary"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
