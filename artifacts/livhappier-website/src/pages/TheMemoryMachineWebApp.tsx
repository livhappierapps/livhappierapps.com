import { motion } from "framer-motion";
import { ArrowLeft, Archive, Clock3 } from "lucide-react";
import { Link } from "wouter";
import { RouteMeta } from "@/components/RouteMeta";

const BASE = "https://livhappierapps.com";

export default function TheMemoryMachineWebApp() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
      <RouteMeta
        title="The Memory Machine Web App — Coming Soon"
        description="The Memory Machine web app is being prepared. Visit the product portal for current availability and official app store listings."
        canonical={`${BASE}/apps/thememorymachine/webapp`}
      />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-panel rounded-[2rem] border border-primary/25 px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <Link
          href="/apps/thememorymachine"
          className="mb-10 inline-flex items-center gap-2 font-body text-sm text-white/55 transition hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          The Memory Machine
        </Link>

        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/35 bg-primary/10 text-primary shadow-[0_0_32px_rgba(0,220,255,0.12)]">
          <Archive aria-hidden="true" size={30} />
        </div>
        <p className="mb-3 font-body text-xs font-bold uppercase tracking-[0.18em] text-primary">
          Web app
        </p>
        <h1 className="mb-4 font-display text-3xl font-bold text-white neon-text-cyan sm:text-5xl">
          Access is coming soon
        </h1>
        <p className="mx-auto max-w-2xl font-body text-base leading-relaxed text-white/65 sm:text-lg">
          This is the planned home for The Memory Machine web app. The working
          web app has not been connected here yet, so there is nothing to sign
          into or use on this page today.
        </p>

        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-body text-sm text-white/55">
          <Clock3 aria-hidden="true" size={16} />
          Launch details will be posted here
        </div>

        <div className="mt-10">
          <Link
            href="/apps/thememorymachine"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 font-body text-sm font-bold text-white transition hover:border-primary/40 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            Back to the product portal
          </Link>
        </div>
      </motion.section>

      <div className="mt-8 flex flex-col justify-center gap-3 text-center text-sm font-body sm:flex-row sm:gap-6">
        <Link
          href="/apps/thememorymachine/privacy"
          className="text-white/45 transition hover:text-primary"
        >
          Privacy Policy
        </Link>
        <Link
          href="/apps/thememorymachine/terms"
          className="text-white/45 transition hover:text-primary"
        >
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
}
