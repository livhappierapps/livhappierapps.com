# LivHappierApps Workspace

## Overview

pnpm workspace monorepo using TypeScript. The project powers **LivHappierApps** — a central hub website for a suite of next-generation apps, backed by an Express API. Published and live at `livhappierapps.com`.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 19 + Vite 7.3.2 + Tailwind CSS 4 + Framer Motion
- **API framework**: Express 5 + express-rate-limit (20 req/min on `/api/chat`, `trust proxy: 1`)
- **Database**: PostgreSQL + Drizzle ORM 0.45.2 (retained in `lib/db` for future use; not wired to API currently)
- **Validation**: Zod (`zod/v4`)
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (API), Vite (frontend)

## Structure

```text
workspace/
├── artifacts/                    # Deployable applications
│   ├── livhappier-website/       # React + Vite frontend (livhappierapps.com)
│   └── api-server/               # Express API server (/api)
├── lib/                          # Shared libraries
│   ├── api-spec/                 # OpenAPI spec + Orval codegen config
│   ├── api-client-react/         # Generated React Query hooks
│   ├── api-zod/                  # Generated Zod schemas from OpenAPI
│   └── db/                       # Drizzle ORM schema + DB connection
├── scripts/                      # Utility scripts
├── pnpm-workspace.yaml           # pnpm workspace + catalog + overrides
├── tsconfig.base.json            # Shared TS options
├── tsconfig.json                 # Root TS project references
└── package.json                  # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/livhappier-website` (`@workspace/livhappier-website`)

React + Vite frontend for the LivHappierApps website. Deployed as a static site.

- Entry: `index.html` → `src/main.tsx` — includes `theme-color` meta for Android browser chrome, `mobile-web-app-capable`/`apple-mobile-web-app-capable` meta tags, a `<link rel="preload">` for `/logo.png`, and preconnect hints for Google Fonts. The Inter font import was removed — only Exo 2 + Nunito are used (loaded via CSS `@import`)
- Routing: `wouter` — pages live in `src/pages/`
- Styling: Tailwind CSS 4 + shadcn/ui components in `src/components/ui/`; **all custom CSS lives in `src/index.css`** (`src/app.css` exists but is **not imported** — never add styles there). Do **not** use `background-attachment: fixed` — it breaks Android Chrome entirely
- Fonts: **Pacifico** (display/headings — single weight, flowing cursive, very readable) + **Nunito** (body, 400/600/700) — both imported from Google Fonts. Do NOT revert to Exo 2/Orbitron/Rajdhani. Pacifico is intentional — user explicitly chose it over boxy display fonts. All h1-h6 use `font-display`. Do NOT use `uppercase` or `tracking-widest` on headings — looks wrong with cursive
- Animations: Framer Motion
- Logo assets: two images in use — (1) `public/logo-crystal.jpeg` (214 KB, 1400×788px) — cyberpunk cityscape art (pink/cyan neon) with "Liv Happier Apps" text, cyberpunk female character, dark neon city background, used as the header banner; (2) `public/logo.png` (816 KB, 1248×832px, transparent PNG) — cyberpunk "Liv Happier Apps" neon logo on transparent background (background removed), used in the hero section, inline in the developer bio, EdenMux footer, MiddleMAIn footer, and inline in Settings compliance text. Transparent background floats perfectly over the dark video background. Never type out "LivHappierApps" as plain text in visible UI — always use the logo image (exception: legal prose in Privacy/Terms docs, chat strings)
- Header logo: `logo-crystal.jpeg` fills 100% width of the logo bar with `object-fit: cover; object-position: center 38%` so the logo text stays centered regardless of bar height. Home page logo bar is 260px tall; other pages are 110px tall (tight crop, text only). Hover brightens/saturates slightly. No float animation on this image. Main content margins: home `margin-top: 360px`, other pages `margin-top: 210px`
- Hero logo: `logo.png` at `width: 96vw; max-width: 700px; height: auto` — fills nearly the full screen width on mobile for maximum impact. "Welcome to" sits directly below the nav bar with no extra top padding (`pt-2` on the page wrapper). Do NOT add `uppercase` or extra margin-top to the hero h1.
- Background: `src/components/VideoBackground.tsx` — fixed full-screen static image (`public/bg-static.jpeg`, 134 KB, 1280×720px — cyberpunk skulls with pink heart eyes and cyan neon glow on dark background). Uses `<img>` with `object-fit: cover` and `position: fixed`. A semi-transparent dark overlay (`rgba(5,2,15,0.62)`) sits on top. Body background is `#0a0614` (near-black cyberpunk) as fallback. `z-index: -2` so the image is behind all content. Do NOT use `background-attachment: fixed` — use `position: fixed` on the element instead (Android Chrome compat). The component is named `VideoBackground` but renders a static image — do not revert to video.
- Support/AI chat (`src/pages/Support.tsx`): Grok-powered AI support chat (no community chat, no PostgreSQL messages). Header displays mascot + "24/7 Support / From the Developer's favorite AI, Grok is here to help." + live LIVE indicator. Mascot appears in the header AND next to each Grok reply bubble. Conversation history (last 10 turns) is sent with each request for context. No "Join the Conversation" screen — chat opens immediately. Route: `/support`. Backend: `POST /api/chat` → xAI Grok API (`grok-3-mini`)
- **Neon text glow**: `.neon-text-cyan` and `.neon-text-pink` use a three-layer text-shadow tuned for Pacifico's cursive letterforms — `0 0 3px` (tight crisp edge) + `0 0 10px 65%` (mid glow) + `0 0 18px 25%` (subtle outer halo). Do NOT increase these values — Pacifico's connected strokes will bleed and make titles unreadable (as seen with the original 30px glow)
- **Image optimisation**: all public assets sized to 2× display size, metadata stripped. Never commit full-resolution originals — re-compress with ImageMagick first. Current sizes: `logo.png` 816 KB (1248×832px transparent PNG), `logo-crystal.jpeg` 214 KB, `bg-static.jpeg` 134 KB (1280×720px, cyberpunk skulls with pink heart eyes), `mascot.png` 117 KB, `cashapp-qr.png` 94 KB, `edenmux-poster.jpeg` 91 KB, `edenmux-screenshot.jpeg` 89 KB, `developer.jpeg` 24 KB
- **Android / Facebook in-app browser compatibility**: `background-attachment: fixed` is permanently removed. `backdrop-filter` is wrapped in `@supports (backdrop-filter: blur(1px))` with a solid opaque background fallback for browsers (like Facebook's IAB) that don't support it. Open Graph + Twitter card meta tags are in `index.html` — required for Facebook's in-app browser to render properly when a link is shared on the platform. No HTTP mixed content. No debug code leaks. Site passes full deep-scan diagnostic — HTTP 200, valid SSL with HSTS (2-year), both homepage and API healthy
- **DNS** (verified 2025-04-15): A record → `34.111.179.208`, no AAAA records, TXT `replit-verify=ae81ae43-23b0-4e98-9616-dca5b92ee471`, TTL 300 — all correct. Domain is Replit-managed (Core promotion) — DNS can only be changed via Replit Support
- Header (`src/components/Header.tsx`): fixed sticky header with logo bar → candy-cane bar → nav bar. On the home page (`/`) the logo renders large (`header-logo-home`, 190px, bar height 220px); on all other pages the logo is 80px (bar height 100px) — always clearly visible. The `AppShell` in `App.tsx` applies `main-content-home` (margin-top 320px) on home and `main-content` (margin-top 200px) elsewhere. Nav links: Home, Apps, Support, Settings
- Pages:
  - `src/pages/Home.tsx` — Hero "Welcome to" + logo image + tagline; app cards grid (2wai spans 2 of 3 cols as featured); **two mascot placements total, all visible on mobile**: (1) 2wai mascot: `scaleX(-1)` (faces left), `absolute`, mobile: `bottom-0 right-0 w-14`, desktop: `bottom-6 -right-11 w-20` — pink neon glow, pointing back at the 2wai card; (2) Cash App mascot: NO flip (faces right), `block w-10 md:w-16 shrink-0 self-end`, inline to the LEFT of the cashapp QR section inside a `flex items-end gap-3` row — she points right toward the QR code; **About the Developer** section at the bottom (developer photo `public/developer.jpeg`, bio with inline logo, Cash App QR code `public/cashapp-qr.png` linking to `https://cash.app/$Oblivionhappier58137`, cashtag `$Oblivionhappier58137`). Mascot image: `public/mascot.png`, 117 KB, 400px PNG source. Do NOT add scaleX(-1) to the cashapp mascot — she must face RIGHT. Do NOT add `hidden md:block` or `hidden lg:block` to any mascot — they must show on all screen sizes. **App grid order (2026-05-29)**: 2wai (featured, purple, coming_soon), EdenMux (cyan, coming_soon), The Memory Machine (cyan, coming_soon), GenMyOwn (pink, coming_soon), TimeAtlus (cyan), RealizeMe (purple), AIs&Ears (pink)
  - `src/pages/Support.tsx` — Grok AI support chat (route: `/support`); stateless, no DB, calls `POST /api/chat`
  - `src/pages/EdenMux.tsx` — EdenMux app landing page
  - `src/pages/Settings.tsx` — Settings page with: (1) app preferences placeholder, (2) full "Our Compliance Commitment" section with Stripe/Apple/Google platform cards (each with direct policy links) + per-app compliance notes for all 8 apps, (3) Contact section (`oblivionhappier@icloud.com`)
  - `src/pages/MiddleMain.tsx` — MiddleMAIn app landing page (`/apps/middlemain`); streaming terminal description, 8 skills grid, Vision AI, provider list, 8 themes, privacy-first callout, App Store + Google Play buttons (placeholder links until live), screenshot placeholders (4 portrait slots to fill)
  - `src/pages/MiddleMainPrivacy.tsx` — MiddleMAIn Privacy Policy (`/apps/middlemain/privacy`); full Apple-reviewer-ready text
  - `src/pages/MiddleMainTerms.tsx` — MiddleMAIn Terms & Conditions (`/apps/middlemain/terms`); full Apple-reviewer-ready text with pricing ($3.99/mo, $29.99/yr, $1.99 ad removal)
  - `src/pages/not-found.tsx` — 404 page
- Public assets: `public/logo.png`, `public/skull.png`, `public/developer.jpeg` (developer avatar), `public/cashapp-qr.png` (Cash App QR code for tips)
- Build output: `dist/public/` (served as static files in production)
- Build target: `chrome89, firefox89, safari14, edge89` (set in `vite.config.ts`) — ensures compatibility with modern Android and iOS devices
- `pnpm --filter @workspace/livhappier-website run dev` — dev server
- `pnpm --filter @workspace/livhappier-website run build` — production build

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/`. No longer uses PostgreSQL — the community chat was removed and replaced with a stateless Grok AI chat.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — sets `trust proxy: 1` (required for express-rate-limit behind Replit's proxy), mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` → `GET /api/healthz`; `src/routes/chat.ts` → `POST /api/chat`
- `POST /api/chat` — proxies user message + conversation history to xAI Grok API (`grok-3-mini`). Requires `GROK_API_KEY` secret. System prompt includes full knowledge of all LivHappierApps apps. Max 600 tokens per reply.
- Depends on: `zod` (input validation). Does NOT import `@workspace/db` — no DB calls at runtime.
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.mjs`)

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Currently unused by the API (community chat removed), but retained for future use.

- `src/index.ts` — creates a `Pool` + Drizzle instance (no schema passed, empty schema barrel)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- `src/schema/index.ts` — empty barrel; add `export * from "./tablename"` when adding new tables
- The old `messages` table still exists in the Postgres DB but is no longer used or exported

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec. Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec.

### `scripts` (`@workspace/scripts`)

Utility scripts package. Run via `pnpm --filter @workspace/scripts run <script>`.

## Deployment

- Both artifacts are published via Replit hosting
- Website (`livhappier-website`) is deployed as a **static** site
- API server is deployed as a **vm** (always-on) — no cold starts, site is always reachable instantly. Required for Stripe website verification and consistent visitor experience. Health check at `/api/healthz`
- Custom domain: `livhappierapps.com` (configured in Replit deployment settings)
- After any code change, re-publish via the Deploy panel to push updates live

## Dependency Management

Shared dependency versions are managed via the `catalog:` section in `pnpm-workspace.yaml`. Key pinned versions:

- `drizzle-orm`: `^0.45.2`
- `vite`: `^7.3.2`
- `lodash` override: `^4.18.0`
- `path-to-regexp` override: `^8.4.0`
- `brace-expansion` override: `>=5.0.6` (patches CVE-2026-33750 + GHSA-jxxr-4gwj-5jf2 — ReDoS and large numeric range DoS)
- `yaml` override: `>=2.8.3` (patches stack overflow via deeply nested YAML collections)
- `fast-uri` override: `>=3.1.2` (patches GHSA-q3j6-qgpj-74h6 + GHSA-v39h-62p7-jpjc — path traversal and host confusion)
- `postcss` override: `>=8.5.10` (patches GHSA-qx2v-qp2m-jg93 — XSS via unescaped `</style>`)
- `picomatch@^2` override: `>=2.3.2` (patches GHSA-c2c7-rcm5-vvqj + GHSA-3v7f-55p6-f55p — ReDoS and method injection)
- `picomatch@^4` override: `>=4.0.4` (same advisories for v4 branch)
- `micromatch>picomatch` override: `>=4.0.4` (targeted fix for micromatch's pinned picomatch@4.0.3)
- `qs` override: `>=6.15.2` (patches CVE-2026-8723 — TypeError DoS in `qs.stringify` with `arrayFormat: 'comma'` + `encodeValuesOnly: true`)

## Security Posture (last scanned 2026-06-27)

Full scan run: dependency audit + SAST + dataflow (HoundDog). Typecheck clean. No runtime errors in workflow logs.

**Zero dependency vulnerabilities. Zero deployed-code findings.**

| Scanner | Our Code | Notes |
|---|---|---|
| Dep audit | ✅ **0 findings** | All vulnerabilities patched via pnpm overrides |
| SAST | ✅ 0 in deployed code | 1 MEDIUM in `artifacts/mockup-sandbox/src/App.tsx` (dynamic module loader — dev-only, never deployed). 24 findings in `.agents/skills/` (third-party Replit scripts — not our code) |
| HoundDog | ✅ 0 findings | Clean |
| Typecheck | ✅ Pass | All 4 workspace packages typecheck clean from root |

**SAST mockup-sandbox finding:** Dynamic import in the component preview loader (`App.tsx`) — dev-only sandbox, never deployed to production. Not a real finding.

**SAST agent-skill findings are not our code:** `.agents/skills/` contains third-party Replit skill scripts. Never deployed, cannot be modified. Do not affect `livhappierapps.com`.

**All dependency CVEs resolved (2026-05-23):** brace-expansion, fast-uri (×2), postcss, picomatch@^2 (×2), picomatch@^4 (×2), micromatch>picomatch, qs (CVE-2026-8723). All patched via pnpm overrides.

**Stripe crawler visibility (2026-05-20):** Site returns HTTP 200 with full OG meta tags (`og:title`, `og:description`, `og:image`). Added `<noscript>` block to `index.html` with business name, app list, and contact — ensures non-JS crawlers (including Stripe's verifier) see meaningful content. If Stripe still shows "can't confirm website", re-enter/re-verify the URL in the Stripe dashboard — the site is confirmed live and accessible.

**PostgreSQL SSL warning in deployment logs**: `SSL modes 'prefer'/'require' are aliases for 'verify-full'` — informational only. SSL is being *upgraded* to stricter cert verification, which is correct and secure.

**Safari "not secure" warning (2026-04-17):** Replit-managed domain cert propagation delay on new deploys; resolves within minutes. Navigate to `https://livhappierapps.com` explicitly. If it persists, contact Replit Support.

**Mascots rule:** Never add `hidden md:block` or `hidden lg:block` to any mascot element — all three must show on all screen sizes.

**Project status:** Site is live at `livhappierapps.com`. App grid (as of 2026-06-15): 2wai (featured, coming_soon), MiddleMAIn (cyan, launching_soon — AI dev bridge, being submitted to App Store), EdenMux (cyan, coming_soon), The Memory Machine (cyan, coming_soon), GenMyOwn (pink, coming_soon), TimeAtlus (cyan), RealizeMe (purple), AIs&Ears (pink).

**Pre-publish audit (2026-05-20):** Live site verified — all 4 routes return HTTP 200, valid Let's Encrypt cert (exp Jul 8 2026, auto-renews), HSTS 2-year + includeSubDomains, OG/Twitter meta tags present, `/api/healthz` returns `{"status":"ok"}`. `dist/public/index.html` rebuilt with `<noscript>` block for Stripe's crawler. Full audit report in `.local/publication-audit-2026-05-20.md`. Reusable audit skill saved at `.agents/skills/assess-publication/SKILL.md`.

**EdenMux page (2026-05-20):** Removed external link to `workspace.livhappierapps.replit.app` (was exposing dev workspace URL). Replaced with in-page "Web App — Coming Soon" toggle (Framer Motion AnimatePresence) pointing visitors to App Store / Google Play buttons. App Store / Google Play buttons still use generic apple.com / play.google.com placeholders — replace with real links once apps are approved.

**API deployment (2026-05-21, revised):** Switched back to `vm` always-on. Autoscale caused the deployment panel to show "Suspended" when idle, which blocked Stripe's website verification crawler and confused visitors. Always-on ensures instant response on any browser/device with no cold starts.

**GitHub + survivability (2026-05-21):** Repo pushed to `https://github.com/livhappierapps/livhappierapps.com` (private). Weekly PostgreSQL backup workflow at `.github/workflows/db-backup.yml` — runs Sun 06:00 UTC, commits gzipped `pg_dump` to `backups/` in the repo, keeps 4 weeks of history. `DATABASE_URL` Actions secret added to GitHub repo. Migration playbook at `MIGRATION.md` — full RTO ~45-75 min if Replit account is lost. To restore: clone repo → restore DB dump → deploy static to Netlify → deploy API to Fly.io → repoint DNS.

**2026-06-27 greatest-hits polish pass (deep clean):**
- ✅ Dep audit: 0 · SAST: 0 in deployed code · HoundDog: 0 · Typecheck clean (all 4 packages)
- ✅ `app.set("trust proxy", 1)` — fixes express-rate-limit `ERR_ERL_UNEXPECTED_X_FORWARDED_FOR` behind Replit proxy
- ✅ Video background → static `bg-static.jpeg` (125 KB); `bg-video.mp4` (2.6 MB) removed
- ✅ `SkullBackground.tsx` + `skull.png` removed (truly gone this time)
- ✅ `use-mobile.tsx` hook removed (never imported anywhere)
- ✅ Double `index.css` import removed from `App.tsx` (kept in `main.tsx`)
- ✅ 26 unused `@radix-ui/*` packages removed from website — only `react-tooltip` remains
- ✅ 8 other unused packages removed: hookform, cmdk, date-fns, embla-carousel, input-otp, next-themes, react-day-picker, react-icons, react-resizable-panels, recharts, sonner, tw-animate-css, vaul, class-variance-authority, `@workspace/api-client-react`
- ✅ API server: `@workspace/db`, `drizzle-orm`, `cookie-parser` removed (no longer imported in any src file)
- ✅ `index.html` meta description + noscript updated: removed stale app names (HiveBanter, AppArchy)
- ✅ 8 packages pruned from pnpm lockfile
- ✅ All routes + Grok chat smoke-tested via Playwright — fully green
- ✅ `GROK_API_KEY` refreshed — Grok support chat live
- ⏳ Once apps approved in stores: replace placeholder App Store / Google Play links on EdenMux page

**2026-05-23 cleanup + security pass:**
- ✅ `qs` CVE-2026-8723 patched — added `qs: '>=6.15.2'` override; dep audit now 0 findings
- ✅ 44 unused shadcn/ui components removed (first pass) — CSS bundle 94 kB → 46 kB (−52%)
- ✅ Dead hooks, stale dist files, and messages schema removed
- ✅ Typecheck clean — all 4 packages pass

**2026-05-21 major update (reference):**
- ✅ Community chat removed; Grok AI chat live at `/support` (`grok-3-mini`, `GROK_API_KEY` set)
- ✅ API switched to `vm` always-on; OpenAPI spec updated + codegen re-run
- ✅ Repo on GitHub with automated weekly DB backup; `MIGRATION.md` written

**Public assets (current):** `logo.png`, `logo-crystal.jpeg`, `mascot.png`, `cashapp-qr.png`, `edenmux-poster.jpeg`, `edenmux-screenshot.jpeg`, `developer.jpeg`, `favicon.svg`, `bg-static.jpeg`, `robots.txt`. OG image uses `/logo.png`. (`bg-video.mp4`, `bg-video.webm`, `candy-cane.jpeg`, `skull.png`, `opengraph.jpg` removed.)

**Mobile nav (2026-05-20):** Reduced `.nav-bar` gap to 0.25rem, link padding to `px-2.5`. Wrapped labels in `<span className="hidden sm:inline">` so mobile (<640px) shows 4 icons only, desktop shows icon + text. Verified clean at 390px and 1280px.

**Compliance (2026-05-23):** "Our Compliance Commitment" section added to Settings page. Covers Stripe, Apple, and Google with direct policy links and per-app compliance notes for all 7 apps. Key compliance rules to remember when building each app:

- **2wai (user-generated content)**: Must ship with content moderation tools, user reporting/blocking features, and age-appropriate content ratings declared at submission. Apple (guideline 1.2) and Google both require this for any app where users communicate with each other or with AI.
- **All apps with camera/mic (2wai, AIs&Ears, RealizeMe)**: Must request permissions with clear purpose strings (NSCameraUsageDescription, NSMicrophoneUsageDescription on iOS). Apple will reject apps that don't explain why each permission is needed.
- **Privacy Policy required**: Every app submitted to Apple App Store or Google Play MUST include a linked Privacy Policy URL in the store listing. Add this before submitting any app.
- **Stripe prohibited content**: No LivHappierApps feature may facilitate gambling, adult content, peer-to-peer money transmission, or any Stripe-prohibited activity. The apps as designed are compliant.
- **Age ratings**: Any app where users can communicate freely (2wai) should be rated 17+ on iOS and "Mature" on Google Play, or implement robust age verification / content filtering to justify a lower rating.
- **Compliance page location**: `artifacts/livhappier-website/src/pages/Settings.tsx` — update the `COMPLIANCE_NOTES` array and `PLATFORM_LINKS` array there when adding new apps or when compliance requirements change.
