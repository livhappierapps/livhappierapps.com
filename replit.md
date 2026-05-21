# LivHappierApps Workspace

## Overview

pnpm workspace monorepo using TypeScript. The project powers **LivHappierApps** — a central hub website for a suite of next-generation apps, backed by an Express API. Published and live at `livhappierapps.com`.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 19 + Vite 7.3.2 + Tailwind CSS 4 + Framer Motion
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM 0.45.2
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
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
- Logo assets: two images in use — (1) `public/logo-crystal.jpeg` (157 KB) — full-bleed swirl paint art (pink/cyan/black) with neon LivHappierApps text, used as the header banner; (2) `public/logo.png` (507 KB, 768×583px) — sparkle neon logo with cyan "LivHappier" + pink "Apps" on black background, used in the hero section and inline in the developer bio. Black background blends naturally with the dark site (#4a4a4a). Never type out "LivHappierApps" as plain text in the UI — always use an image
- Header logo: `logo-crystal.jpeg` fills 100% width of the logo bar with `object-fit: cover; object-position: center 44%` so the text stays centered regardless of bar height. Home page logo bar is 260px tall (shows lots of crystals); other pages are 110px tall (tight crop, text only). Hover brightens/saturates slightly. No float animation on this image. Main content margins: home `margin-top: 360px`, other pages `margin-top: 210px`
- Hero logo: `logo.png` at `width: 96vw; max-width: 700px; height: auto` — fills nearly the full screen width on mobile for maximum impact. "Welcome to" sits directly below the nav bar with no extra top padding (`pt-2` on the page wrapper). Do NOT add `uppercase` or extra margin-top to the hero h1.
- Background: `src/components/SkullBackground.tsx` — fixed full-screen layer of skull images (`public/skull.png`) in a **structured diamond grid** (8 cols × 11 rows, every odd row offset by half a column width). Skull size is 72px. No random jitter — pure structured diamond pattern. `mix-blend-mode: screen` makes the black background of the PNG transparent, showing only the neon skull and star sparkles. Opacity fixed at 0.25. Page body background is `#4a4a4a` (medium charcoal grey). New skull image: neon ring + cyan/pink stars (`public/skull.png`, 8 KB, 140px source)
- Community chat (`src/pages/Community.tsx`): hardcoded pinned message always renders first on the left side (username: LivHappier, content: "Welcome to the LivHappierApps website..."). The pinned message is filtered out of the live messages list to avoid duplicates. Mascot (`public/mascot.png`, no flip so she points RIGHT toward the pinned message) sits in a slim column (`w-12 md:w-16`) to the left of the chat panel — visible on ALL screen sizes (`flex`, not `hidden md:flex`), image size `w-10 md:w-14`. Messages are stored permanently in PostgreSQL — no expiration — but the API only returns the last 50. The pinned message is frontend-hardcoded so it always appears regardless of message count
- **Neon text glow**: `.neon-text-cyan` and `.neon-text-pink` use a three-layer text-shadow tuned for Pacifico's cursive letterforms — `0 0 3px` (tight crisp edge) + `0 0 10px 65%` (mid glow) + `0 0 18px 25%` (subtle outer halo). Do NOT increase these values — Pacifico's connected strokes will bleed and make titles unreadable (as seen with the original 30px glow)
- **Image optimisation**: all public assets are sized to 2× their display size and stripped of metadata. Never commit full-resolution originals — re-compress with ImageMagick before adding to `public/`. Current sizes: `logo.png` 507 KB (768×583px PNG, lossless), `logo-crystal.jpeg` 157 KB, `skull.png` 8 KB, `developer.jpeg` 24 KB, `cashapp-qr.png` 94 KB, `edenmux-poster.jpeg` 91 KB, `edenmux-screenshot.jpeg` 89 KB. `bg.jpeg` and `logo.jpeg` were unused and removed
- **Android / Facebook in-app browser compatibility**: `background-attachment: fixed` is permanently removed. `backdrop-filter` is wrapped in `@supports (backdrop-filter: blur(1px))` with a solid opaque background fallback for browsers (like Facebook's IAB) that don't support it. Open Graph + Twitter card meta tags are in `index.html` — required for Facebook's in-app browser to render properly when a link is shared on the platform. No HTTP mixed content. No debug code leaks. Site passes full deep-scan diagnostic — HTTP 200, valid SSL with HSTS (2-year), both homepage and API healthy
- **DNS** (verified 2025-04-15): A record → `34.111.179.208`, no AAAA records, TXT `replit-verify=ae81ae43-23b0-4e98-9616-dca5b92ee471`, TTL 300 — all correct. Domain is Replit-managed (Core promotion) — DNS can only be changed via Replit Support
- Header (`src/components/Header.tsx`): fixed sticky header with logo bar → candy-cane bar → nav bar. On the home page (`/`) the logo renders large (`header-logo-home`, 190px, bar height 220px); on all other pages the logo is 80px (bar height 100px) — always clearly visible. The `AppShell` in `App.tsx` applies `main-content-home` (margin-top 320px) on home and `main-content` (margin-top 200px) elsewhere. Nav links: Home, Apps, Support, Settings
- Pages:
  - `src/pages/Home.tsx` — Hero "Welcome to" + logo image + tagline; app cards grid (2wai spans 2 of 3 cols as featured); **three mascot placements total, all visible on mobile**: (1) 2wai mascot: `scaleX(-1)` (faces left), `absolute`, mobile: `bottom-0 right-0 w-14`, desktop: `bottom-6 -right-11 w-20` — pink neon glow, pointing back at the 2wai card; (2) Cash App mascot: NO flip (faces right), `block w-10 md:w-16 shrink-0 self-end`, inline to the LEFT of the cashapp QR section inside a `flex items-end gap-3` row — she points right toward the QR code; **About the Developer** section at the bottom (developer photo `public/developer.jpeg`, bio with inline logo, Cash App QR code `public/cashapp-qr.png` linking to `https://cash.app/$Oblivionhappier58137`, cashtag `$Oblivionhappier58137`). Mascot image: `public/mascot.png`, 117 KB, 400px PNG source. Do NOT add scaleX(-1) to the cashapp mascot — she must face RIGHT. Do NOT add `hidden md:block` or `hidden lg:block` to any mascot — they must show on all screen sizes. **App grid order (2026-05-20)**: 2wai (featured, purple, coming_soon), HiveBanter (pink, launching_soon — $0.50/user or $2.99 business, first month free), EdenMux (cyan, coming_soon), The Memory Machine (cyan, coming_soon), AppArchy (pink), TimeAtlus (cyan), RealizeMe (purple), AIs&Ears (pink)
  - `src/pages/Support.tsx` — Live chat with "Join the Conversation" entry screen (route: `/support`); uses PostgreSQL via the API server for message persistence
  - `src/pages/EdenMux.tsx` — EdenMux app landing page
  - `src/pages/Settings.tsx` — Settings page with placeholder for future preferences + Contact section at the bottom ("Need extra support or need to contact the developer?" + `oblivionhappier@icloud.com` mailto link)
  - `src/pages/not-found.tsx` — 404 page
- Public assets: `public/logo.png`, `public/skull.png`, `public/developer.jpeg` (developer avatar), `public/cashapp-qr.png` (Cash App QR code for tips)
- Build output: `dist/public/` (served as static files in production)
- Build target: `chrome89, firefox89, safari14, edge89` (set in `vite.config.ts`) — ensures compatibility with modern Android and iOS devices
- `pnpm --filter @workspace/livhappier-website run dev` — dev server
- `pnpm --filter @workspace/livhappier-website run build` — production build

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.mjs`)

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)
- Migrations: `pnpm --filter @workspace/db run push` (dev), `push-force` as fallback

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
- API server is deployed as a **vm (always on)** process — runs 24/7 so the community chat is available at any time without cold starts; health check at `/api/healthz`
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

## Security Posture (last scanned 2026-05-20, re-scanned 2026-05-20 pre-publish)

Full scan run: dependency audit + SAST + dataflow (HoundDog). Typecheck clean. No runtime errors in workflow logs.

**Zero dependency vulnerabilities. Zero deployed-code findings.**

| Scanner | Our Code | Notes |
|---|---|---|
| Dep audit | ✅ **0 findings** | All vulnerabilities patched via pnpm overrides |
| SAST | ✅ 0 in deployed code | 14 HIGH / 11 MEDIUM flagged in `.agents/skills/` (third-party Replit skill scripts — not our code). 1 MEDIUM in `artifacts/mockup-sandbox/src/App.tsx` (`_resolveComponent` dynamic dispatch) — mockup-sandbox is `kind = "design"`, dev-only, **NOT deployed** to livhappierapps.com |
| HoundDog | ✅ 0 findings | Clean |
| Typecheck | ✅ Pass | All 4 workspace packages typecheck clean from root |

**SAST agent-skill findings are not our code:** `.agents/skills/` contains third-party Replit skill scripts (pptx XML parsing, brainstorming WebSocket helper, skill-creator subprocess). These are never deployed to production and cannot be modified. They do not affect `livhappierapps.com`.

**All 8 dependency CVEs fully resolved (2026-05-20):** brace-expansion, fast-uri (×2), postcss, picomatch@^2 (×2), picomatch@^4 (×2). micromatch's direct pin to picomatch@4.0.3 required an additional parent→child override (`micromatch>picomatch: '>=4.0.4'`).

**Stripe crawler visibility (2026-05-20):** Site returns HTTP 200 with full OG meta tags (`og:title`, `og:description`, `og:image`). Added `<noscript>` block to `index.html` with business name, app list, and contact — ensures non-JS crawlers (including Stripe's verifier) see meaningful content. If Stripe still shows "can't confirm website", re-enter/re-verify the URL in the Stripe dashboard — the site is confirmed live and accessible.

**PostgreSQL SSL warning in deployment logs**: `SSL modes 'prefer'/'require' are aliases for 'verify-full'` — informational only. SSL is being *upgraded* to stricter cert verification, which is correct and secure.

**Safari "not secure" warning (2026-04-17):** Replit-managed domain cert propagation delay on new deploys; resolves within minutes. Navigate to `https://livhappierapps.com` explicitly. If it persists, contact Replit Support.

**Mascots rule:** Never add `hidden md:block` or `hidden lg:block` to any mascot element — all three must show on all screen sizes.

**Project status:** Site is live at `livhappierapps.com`. App grid (as of 2026-05-20): 2wai (featured, coming_soon), HiveBanter (launching_soon — $0.50/user or $2.99 business, first month free), EdenMux (coming_soon), The Memory Machine (coming_soon), GenMyOwn (formerly AppArchy — AI companion "Gen" for building/maintaining apps, coming_soon), TimeAtlus, RealizeMe, AIs&Ears.

**Pre-publish audit (2026-05-20):** Live site verified — all 4 routes return HTTP 200, valid Let's Encrypt cert (exp Jul 8 2026, auto-renews), HSTS 2-year + includeSubDomains, OG/Twitter meta tags present, `/api/healthz` returns `{"status":"ok"}` from the VM deployment. **Critical bug found & fixed:** `dist/public/index.html` was stale (built before the `<noscript>` block was added for Stripe's crawler) — site rebuilt in this session, **republish required** to push the noscript fix live. Full audit report in `.local/publication-audit-2026-05-20.md`. Reusable audit skill saved at `.agents/skills/assess-publication/SKILL.md` so future audits cost nothing to plan.

**EdenMux page (2026-05-20):** Removed external link to `workspace.livhappierapps.replit.app` (was exposing dev workspace URL). Replaced with in-page "Web App — Coming Soon" toggle that animates a notice pointing visitors to the App Store / Google Play buttons. App Store / Google Play buttons still point at generic apple.com / play.google.com placeholders — needs real links once apps are approved (Task #8 was cancelled but the work remains).

**Pending pre-store-submission work:**
- Task #5 (in progress): switch API from `vm` always-on to `autoscale` to cut hosting cost (~70-90% savings for low-traffic chat). Trade-off: ~1-2s cold start on first request.
- Task #6 (pending): push repo to GitHub + weekly `pg_dump` backup + migration playbook for survivability if Replit account is lost.
- Task #9 (proposed): keep chat snappy by pinging API every few minutes (only relevant if Task #5 ships).
- Once apps are approved in stores: replace placeholder App Store / Google Play links on EdenMux page (and add equivalent links for 2wai, HiveBanter, etc as each launches).

**Public assets cleanup (2026-05-20):** Removed unused `public/opengraph.jpg` (123 KB). Active public images: `logo.png`, `logo-crystal.jpeg`, `mascot.png`, `cashapp-qr.png`, `edenmux-poster.jpeg`, `edenmux-screenshot.jpeg`, `candy-cane.jpeg`, `developer.jpeg`, `skull.png`, `favicon.svg`. OG image meta tag uses `/logo.png` (not opengraph.jpg).

**Mobile nav (2026-05-20):** Reduced `.nav-bar` gap to 0.25rem, link padding to `px-2.5`. Wrapped labels in `<span className="hidden sm:inline">` so mobile (<640px) shows 4 icons only, desktop shows icon + text. Verified clean at 390px and 1280px.
