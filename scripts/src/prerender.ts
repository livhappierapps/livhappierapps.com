import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_PUBLIC = join(
  __dirname,
  "../../artifacts/livhappier-website/dist/public"
);
const DIST_SERVER = join(
  __dirname,
  "../../artifacts/livhappier-website/dist/server"
);
const BASE = "https://livhappierapps.com";

interface RouteMeta {
  title: string;
  description: string;
  ogUrl: string;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd?: object | object[];
  noscript?: string;
}

const ROUTES: Record<string, RouteMeta> = {
  "/": {
    title: "LivHappier Apps — Next-Generation Mobile Apps",
    description:
      "Your central hub for next-generation applications. 2wai, MiddleMAIn, EdenMux, The Memory Machine, GenMyOwn, TimeAtlus, RealizeMe, AIs&Ears — edgy, fun, and built to make digital life a little more exciting.",
    ogUrl: `${BASE}/`,
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "LivHappier Apps",
        url: BASE,
        logo: `${BASE}/logo.png`,
        description:
          "LivHappier Apps creates next-generation mobile and AI applications.",
        contactPoint: {
          "@type": "ContactPoint",
          email: "oblivionhappier@icloud.com",
          contactType: "customer support",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "LivHappier Apps",
        url: BASE,
        description:
          "Central hub for the LivHappier Apps suite of next-generation mobile and AI applications.",
      },
    ],
    noscript: `<h1>LivHappier Apps</h1>
      <p>Your central hub for next-generation applications. Edgy, fun, and built to make digital life a little more exciting.</p>
      <p>Apps: 2wai, MiddleMAIn, EdenMux, The Memory Machine, GenMyOwn, TimeAtlus, RealizeMe, AIs&amp;Ears.</p>
      <p>Built and operated by LivHappierApps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/support": {
    title: "Support — LivHappier Apps",
    description:
      "Get 24/7 AI-powered support from Grok for all LivHappierApps questions. Ask about apps, pricing, features, or anything else.",
    ogUrl: `${BASE}/support`,
    noscript: `<h1>LivHappier Apps Support</h1>
      <p>24/7 AI-powered support from Grok. Visit livhappierapps.com to chat. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/edenmux": {
    title: "EdenMux — LivHappier Apps",
    description:
      "EdenMux is a bold new app from LivHappier Apps — coming soon to iOS and Android. A fresh experience built for the next generation.",
    ogUrl: `${BASE}/edenmux`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "EdenMux",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "iOS, Android",
      description:
        "EdenMux is a bold new app from LivHappier Apps — coming soon to iOS and Android.",
      author: {
        "@type": "Organization",
        name: "LivHappier Apps",
        url: BASE,
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "USD",
      },
    },
    noscript: `<h1>EdenMux</h1>
      <p>A bold new app from LivHappier Apps — coming soon to iOS and Android.</p>`,
  },

  "/settings": {
    title: "Settings & Compliance — LivHappier Apps",
    description:
      "App preferences, compliance commitment with Stripe, Apple, and Google, and contact information for LivHappier Apps.",
    ogUrl: `${BASE}/settings`,
    noscript: `<h1>LivHappier Apps Settings &amp; Compliance</h1>
      <p>Our compliance commitment with Stripe, Apple, and Google. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/middlemain": {
    title: "MiddleMAIn — AI Dev Bridge | LivHappier Apps",
    description:
      "MiddleMAIn is a professional AI development bridge for iOS and Android — terminal, vision AI, debugging, refactoring, and multi-provider support with Grok, GPT-4o, Claude, and more.",
    ogUrl: `${BASE}/apps/middlemain`,
    jsonLd: {
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
      author: {
        "@type": "Organization",
        name: "LivHappier Apps",
        url: BASE,
      },
      offers: [
        {
          "@type": "Offer",
          name: "Monthly",
          price: "3.99",
          priceCurrency: "USD",
          billingDuration: "P1M",
        },
        {
          "@type": "Offer",
          name: "Annual",
          price: "29.99",
          priceCurrency: "USD",
          billingDuration: "P1Y",
        },
      ],
    },
    noscript: `<h1>MiddleMAIn</h1>
      <p>A professional AI development bridge for iOS and Android. Features terminal, vision AI, debugging, refactoring, and multi-provider AI support with Grok, GPT-4o, Claude, and more.</p>
      <p>Available on iOS and Android. Subscription: $3.99/month or $29.99/year.</p>`,
  },

  "/apps/middlemain/privacy": {
    title: "MiddleMAIn Privacy Policy — LivHappier Apps",
    description:
      "MiddleMAIn Privacy Policy: how local storage, AI providers, Live Council, optional integrations, and hosting services handle information.",
    ogUrl: `${BASE}/apps/middlemain/privacypolicy`,
    noscript: `<h1>MiddleMAIn Privacy Policy</h1>
      <p>Explains local app storage, selected AI providers, Live Council room data stored by the backend, optional bridge and GitHub or memory connections, bug reports, and hosting/network request information. Contact: oblivionhappier@icloud.com</p>`,
  },
  "/apps/middlemain/privacypolicy": {
    title: "MiddleMAIn Privacy Policy — LivHappier Apps",
    description:
      "MiddleMAIn Privacy Policy: how local storage, AI providers, Live Council, optional integrations, and hosting services handle information.",
    ogUrl: `${BASE}/apps/middlemain/privacypolicy`,
    noscript: `<h1>MiddleMAIn Privacy Policy</h1>
      <p>Explains local app storage, selected AI providers, Live Council room data stored by the backend, optional bridge and GitHub or memory connections, bug reports, and hosting/network request information. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/middlemain/terms": {
    title: "MiddleMAIn Terms & Conditions — LivHappier Apps",
    description:
      "Terms and Conditions for MiddleMAIn, available on iOS and Android. Subscription: $3.99/month or $29.99/year.",
    ogUrl: `${BASE}/apps/middlemain/terms`,
    noscript: `<h1>MiddleMAIn Terms &amp; Conditions</h1>
      <p>Terms for MiddleMAIn on iOS and Android. Subscription: $3.99/month or $29.99/year. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/thememorymachine": {
    title: "The Memory Machine — LivHappier Apps",
    description:
      "Give your AI conversations a home. Explore The Memory Machine web app and mobile app availability from LivHappier Apps.",
    ogUrl: `${BASE}/apps/thememorymachine`,
    noscript: `<h1>Give your AI conversations a home.</h1>
      <p>The Memory Machine brings your AI conversation history together, so the ideas you want to keep are easier to return to.</p>
      <p>Web app, Apple App Store, and Google Play listings are coming soon. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/thememorymachine/webapp": {
    title: "The Memory Machine Web App — Coming Soon",
    description:
      "The Memory Machine web app is being prepared. Visit the product portal for current availability and official app store listings.",
    ogUrl: `${BASE}/apps/thememorymachine/webapp`,
    noscript: `<h1>The Memory Machine Web App</h1>
      <p>Access is coming soon. The working web app has not been connected here yet.</p>
      <p>Visit <a href="/apps/thememorymachine">The Memory Machine portal</a> for current availability. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/thememorymachine/privacy": {
    title: "The Memory Machine Privacy Policy — LivHappier Apps",
    description:
      "Privacy Policy for The Memory Machine. Your conversations are encrypted at rest with AES-256-GCM. We never sell your data.",
    ogUrl: `${BASE}/apps/thememorymachine/privacy`,
    noscript: `<h1>The Memory Machine Privacy Policy</h1>
      <p>Your conversations are encrypted at rest. We never sell your data. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/thememorymachine/terms": {
    title: "The Memory Machine Terms & Conditions — LivHappier Apps",
    description:
      "Terms and Conditions for The Memory Machine by LivHappier Apps.",
    ogUrl: `${BASE}/apps/thememorymachine/terms`,
    noscript: `<h1>The Memory Machine Terms &amp; Conditions</h1>
      <p>Terms for The Memory Machine by LivHappier Apps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/2wai/privacy": {
    title: "2wai Privacy Policy — LivHappier Apps",
    description:
      "Privacy Policy for 2wai by LivHappier Apps. Coming soon.",
    ogUrl: `${BASE}/apps/2wai/privacy`,
    noscript: `<h1>2wai Privacy Policy</h1>
      <p>Privacy Policy for 2wai by LivHappier Apps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/2wai/terms": {
    title: "2wai Terms of Service — LivHappier Apps",
    description:
      "Terms of Service for 2wai by LivHappier Apps. Coming soon.",
    ogUrl: `${BASE}/apps/2wai/terms`,
    noscript: `<h1>2wai Terms of Service</h1>
      <p>Terms of Service for 2wai by LivHappier Apps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/edenmux/privacy": {
    title: "EdenMux Privacy Policy — LivHappier Apps",
    description:
      "Privacy Policy for EdenMux by LivHappier Apps. Coming soon.",
    ogUrl: `${BASE}/edenmux/privacy`,
    noscript: `<h1>EdenMux Privacy Policy</h1>
      <p>Privacy Policy for EdenMux by LivHappier Apps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/edenmux/terms": {
    title: "EdenMux Terms of Service — LivHappier Apps",
    description:
      "Terms of Service for EdenMux by LivHappier Apps. Coming soon.",
    ogUrl: `${BASE}/edenmux/terms`,
    noscript: `<h1>EdenMux Terms of Service</h1>
      <p>Terms of Service for EdenMux by LivHappier Apps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/aisandears/privacy": {
    title: "AIs&Ears Privacy Policy — LivHappier Apps",
    description:
      "Privacy Policy for AIs&Ears by LivHappier Apps. Coming soon.",
    ogUrl: `${BASE}/apps/aisandears/privacy`,
    noscript: `<h1>AIs&amp;Ears Privacy Policy</h1>
      <p>Privacy Policy for AIs&amp;Ears by LivHappier Apps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/aisandears/terms": {
    title: "AIs&Ears Terms of Service — LivHappier Apps",
    description:
      "Terms of Service for AIs&Ears by LivHappier Apps. Coming soon.",
    ogUrl: `${BASE}/apps/aisandears/terms`,
    noscript: `<h1>AIs&amp;Ears Terms of Service</h1>
      <p>Terms of Service for AIs&amp;Ears by LivHappier Apps. Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/aisandears": {
    title: "AIs&Ears — Optional Audio and Visual Bridge",
    description:
      "Give your AI companion optional eyes and ears with AIs&Ears. Web app and app store access are coming soon from LivHappier Apps.",
    ogUrl: `${BASE}/apps/aisandears`,
    noscript: `<h1>AIs&amp;Ears</h1>
      <p>Optional camera, microphone, and screen features for your AI companion. Web app, Apple App Store, and Google Play access are coming soon.</p>
      <p>Contact: oblivionhappier@icloud.com</p>`,
  },

  "/apps/aisandears/webapp": {
    title: "AIs&Ears Web App — Coming Soon",
    description:
      "The AIs&Ears web app is being prepared. Visit the product portal for current availability and official app store listings.",
    ogUrl: `${BASE}/apps/aisandears/webapp`,
    noscript: `<h1>AIs&amp;Ears Web App</h1>
      <p>Access is coming soon. The working web app has not been connected here yet.</p>
      <p>Visit <a href="/apps/aisandears">the AIs&amp;Ears portal</a> for current availability. Contact: oblivionhappier@icloud.com</p>`,
  },
};

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function injectHeadMeta(template: string, meta: RouteMeta): string {
  let html = template;

  const ogTitle = escapeAttr(meta.ogTitle ?? meta.title);
  const ogDesc = escapeAttr(meta.ogDescription ?? meta.description);
  const desc = escapeAttr(meta.description);

  html = html.replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);

  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${desc}" />`
  );

  const canonical = `<link rel="canonical" href="${meta.ogUrl}" />`;
  if (/<link rel="canonical"/.test(html)) {
    html = html.replace(/<link rel="canonical"[^>]*\/>/, canonical);
  } else {
    html = html.replace("</head>", `  ${canonical}\n  </head>`);
  }

  html = html.replace(
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${ogTitle}$2`
  );
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${ogDesc}$2`
  );
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${escapeAttr(meta.ogUrl)}$2`
  );

  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${ogTitle}$2`
  );
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${ogDesc}$2`
  );

  if (meta.jsonLd) {
    const schemas = Array.isArray(meta.jsonLd) ? meta.jsonLd : [meta.jsonLd];
    const jsonLdBlocks = schemas
      .map(
        (s) =>
          `  <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n  </script>`
      )
      .join("\n");
    html = html.replace("</head>", `${jsonLdBlocks}\n  </head>`);
  }

  if (meta.noscript) {
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      `<noscript>\n      ${meta.noscript}\n    </noscript>`
    );
  }

  return html;
}

async function main() {
  let template: string;
  try {
    template = readFileSync(join(DIST_PUBLIC, "index.html"), "utf-8");
  } catch {
    console.error(
      `Could not read ${DIST_PUBLIC}/index.html — run vite build first`
    );
    process.exit(1);
  }

  // Load the SSR bundle to render actual page content into <div id="root">
  let renderFn:
    | ((url: string) => { html: string })
    | null = null;
  const ssrBundle = join(DIST_SERVER, "entry-server.js");
  try {
    const mod = await import(pathToFileURL(ssrBundle).href);
    renderFn = mod.render as (url: string) => { html: string };
    console.log("  SSR bundle loaded — rendering page content into <div id=\"root\">");
  } catch (err) {
    console.warn(
      `  Warning: SSR bundle not available at ${ssrBundle}. Body will be empty.`
    );
    console.warn(`  ${err}`);
  }

  for (const [route, meta] of Object.entries(ROUTES)) {
    // 1. Inject route-specific head tags (title, canonical, OG, JSON-LD, noscript)
    let html = injectHeadMeta(template, meta);

    // 2. SSR-render the actual page content and inject into <div id="root">
    if (renderFn) {
      try {
        const { html: appHtml } = renderFn(route);
        html = html.replace(
          '<div id="root"></div>',
          `<div id="root">${appHtml}</div>`
        );
      } catch (err) {
        console.error(`  SSR render failed for ${route}:`, err);
      }
    }

    // 3. Write the output HTML file
    if (route === "/") {
      writeFileSync(join(DIST_PUBLIC, "index.html"), html);
      console.log("  ✓ / → dist/public/index.html");
    } else {
      const routeDir = join(DIST_PUBLIC, route.replace(/^\//, ""));
      mkdirSync(routeDir, { recursive: true });
      writeFileSync(join(routeDir, "index.html"), html);
      console.log(`  ✓ ${route} → dist/public${route}/index.html`);
    }
  }

  console.log("\nPrerender complete — route-specific HTML with page content generated.");
}

main();
