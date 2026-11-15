import { motion } from "framer-motion";
import {
  Apple,
  ArrowRight,
  Camera,
  Mic,
  Smartphone,
} from "lucide-react";
import { Link } from "wouter";
import { RouteMeta } from "@/components/RouteMeta";

const BASE = "https://livhappierapps.com";

const features = [
  {
    icon: Camera,
    title: "Optional visual input",
    description:
      "Connect camera or screen features when you choose to share visual context with your AI companion.",
  },
  {
    icon: Mic,
    title: "Audio when enabled",
    description:
      "Microphone audio is shared only when the relevant feature is enabled and permission is granted.",
  },
];

export default function AisAndEars() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
      <RouteMeta
        title="AIs&Ears — Optional Audio and Visual Bridge"
        description="Give your AI companion optional eyes and ears with AIs&Ears. Web app and app store access are coming soon from LivHappier Apps."
        canonical={`${BASE}/apps/aisandears`}
      />

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-[2rem] border border-secondary/25 bg-gradient-to-br from-secondary/10 via-black/35 to-primary/10 px-6 py-12 text-center shadow-[0_0_60px_rgba(255,0,200,0.08)] sm:px-12 sm:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-36 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-3xl">
          <p className="mb-3 font-body text-sm font-bold uppercase tracking-[0.2em] text-white/70">
            AIs&amp;Ears
          </p>
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 font-body text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Optional audio & visual bridge
          </p>
          <h1 className="mb-5 font-display text-4xl font-bold leading-tight text-white neon-text-pink sm:text-6xl">
            Give your AI companion eyes and ears.
          </h1>
          <p className="mx-auto mb-8 max-w-2xl font-body text-base leading-relaxed text-white/70 sm:text-xl">
            AIs&amp;Ears connects optional camera, microphone, and screen
            features to your configured bridge service. You control which
            sharing features are enabled.
          </p>

          <Link
            href="/apps/aisandears/webapp"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-secondary/60 bg-secondary px-6 py-3 font-body font-bold text-white shadow-[0_0_24px_rgba(255,0,200,0.18)] transition hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            View web app status
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <p className="mt-3 font-body text-xs text-white/45">
            Web app access is coming soon
          </p>
        </div>
      </motion.section>

      <section
        aria-labelledby="aisandears-features"
        className="mx-auto mt-14 max-w-4xl"
      >
        <div className="mb-6 text-center">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            Share on your terms
          </p>
          <h2
            id="aisandears-features"
            className="font-display text-2xl font-bold text-white sm:text-3xl"
          >
            Choose what your AI can hear or see
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="glass-panel rounded-2xl border border-white/10 p-5 sm:p-6"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-secondary/25 bg-secondary/10 text-secondary">
                <Icon aria-hidden="true" size={21} />
              </div>
              <h3 className="mb-2 font-display text-lg font-bold text-white">
                {title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-white/60">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="aisandears-apps"
        className="mx-auto mt-14 max-w-4xl"
      >
        <div className="mb-6 text-center">
          <p className="mb-2 font-body text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Choose how to connect
          </p>
          <h2
            id="aisandears-apps"
            className="font-display text-2xl font-bold text-white sm:text-3xl"
          >
            Get AIs&amp;Ears
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Link
            href="/apps/aisandears/webapp"
            className="group flex min-h-32 items-center gap-4 rounded-2xl border border-secondary/35 bg-secondary/5 p-5 transition hover:border-secondary/70 hover:bg-secondary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary">
              <Camera aria-hidden="true" size={23} />
            </div>
            <div className="min-w-0">
              <p className="font-body text-xs uppercase tracking-wide text-secondary">
                Browser
              </p>
              <p className="mt-1 font-display font-bold text-white">Web app</p>
              <p className="mt-1 font-body text-xs text-white/45">
                Coming soon
              </p>
            </div>
            <ArrowRight
              aria-hidden="true"
              size={17}
              className="ml-auto shrink-0 text-white/35 transition group-hover:translate-x-1 group-hover:text-secondary"
            />
          </Link>

          <div
            aria-label="Apple App Store listing coming soon"
            className="flex min-h-32 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/55">
              <Apple aria-hidden="true" size={23} />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-white/45">
                iPhone & iPad
              </p>
              <p className="mt-1 font-display font-bold text-white/80">
                App Store
              </p>
              <p className="mt-1 font-body text-xs text-white/45">
                Listing coming soon
              </p>
            </div>
          </div>

          <div
            aria-label="Google Play listing coming soon"
            className="flex min-h-32 items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/55">
              <Smartphone aria-hidden="true" size={23} />
            </div>
            <div>
              <p className="font-body text-xs uppercase tracking-wide text-white/45">
                Android
              </p>
              <p className="mt-1 font-display font-bold text-white/80">
                Google Play
              </p>
              <p className="mt-1 font-body text-xs text-white/45">
                Listing coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <nav
        aria-label="AIs and Ears links"
        className="mt-14 flex flex-col items-center justify-center gap-4 border-t border-white/10 pt-6 text-sm font-body text-white/45 sm:flex-row sm:gap-6"
      >
        <Link
          href="/apps/aisandears/privacy"
          className="transition hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          Privacy Policy
        </Link>
        <span aria-hidden="true" className="hidden text-white/20 sm:inline">
          ·
        </span>
        <Link
          href="/apps/aisandears/terms"
          className="transition hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          Terms of Service
        </Link>
        <span aria-hidden="true" className="hidden text-white/20 sm:inline">
          ·
        </span>
        <Link
          href="/"
          className="transition hover:text-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          ← Back to Apps
        </Link>
      </nav>
    </div>
  );
}
