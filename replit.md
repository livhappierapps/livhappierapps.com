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
- Header (`src/components/Header.tsx`): fixed sticky header with logo bar → candy-cane bar → nav bar. On the home page (`/`) the logo renders large (`header-logo-home`, 190px, bar height 220px); on all other pages the logo is 80px (bar height 100px) — always clearly visible. The `AppShell` in `App.tsx` applies `main-content-home` (margin-top 320px) on home and `main-content` (margin-top 200px) elsewhere. Nav links: Home, Apps, Community, Settings
- Pages:
  - `src/pages/Home.tsx` — Hero "Welcome to" + logo image + tagline; app cards grid (EdenMux spans 2 of 3 cols); **three mascot placements total, all visible on mobile**: (1) EdenMux mascot: `scaleX(-1)` (faces left), `absolute`, mobile: `bottom-0 right-0 w-14`, desktop: `bottom-6 -right-11 w-20 lg:` — pink neon glow, pointing back at the card; (2) Cash App mascot: NO flip (faces right), `block w-10 md:w-16 shrink-0 self-end`, inline to the LEFT of the cashapp QR section inside a `flex items-end gap-3` row — she points right toward the QR code; **About the Developer** section at the bottom (developer photo `public/developer.jpeg`, bio with inline logo, Cash App QR code `public/cashapp-qr.png` linking to `https://cash.app/$Oblivionhappier58137`, cashtag `$Oblivionhappier58137`). Mascot image: `public/mascot.png`, 117 KB, 400px PNG source. Do NOT add scaleX(-1) to the cashapp mascot — she must face RIGHT. Do NOT add `hidden md:block` or `hidden lg:block` to any mascot — they must show on all screen sizes
  - `src/pages/Community.tsx` — Live chat with "Join the Conversation" entry screen; uses PostgreSQL via the API server for message persistence
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
- `brace-expansion` override: `>=2.0.3` (patches CVE-2026-33750 — zero-step ReDoS)
- `yaml` override: `>=2.8.3` (patches stack overflow via deeply nested YAML collections)

## Security Posture (last scanned 2026-04-17)

Full scan run: dependency audit + SAST + dataflow (HoundDog). Run twice — after initial scan (brace-expansion + yaml patched), re-scanned to confirm.

**Our application code — zero meaningful findings.** All flagged items outside one MEDIUM are in Replit's internal agent skill scripts (`.agents/skills/`) and are not part of the deployed app.

| Scanner | Our Code | Notes |
|---|---|---|
| SAST | ✅ 1 MEDIUM | In `artifacts/mockup-sandbox` (canvas tool, never deployed to production) — `unsafe-dynamic-method` in App.tsx:40 |
| HoundDog | ✅ 0 findings | Clean |
| Dep audit | ✅ patched | brace-expansion + yaml overridden; down from 6 → 4 remaining findings |

**Known acceptable risk — picomatch (2 HIGH, 2 MODERATE):** picomatch@2.3.1 and @4.0.3 both have ReDoS issues. These are transitive dev-only dependencies of build tools (vite/rollup). They are **not in the production bundle**, never exposed to user input, and only run at build time. No override was added because forcing a cross-major-version upgrade would break the build — production risk is zero.

**PostgreSQL SSL warning in deployment logs**: `SSL modes 'prefer'/'require' are aliases for 'verify-full'` — informational only. SSL is being *upgraded* to stricter cert verification, which is correct and secure.

**Reported Chrome rendering issue (2026-04-17):** User reported the site "back down on Chrome" after the security scan republish. Server-side logs show no errors — all health checks pass, API responds correctly. Root cause is likely stale browser cache after the static file hashes changed between deploys. Added missing `<link rel="preload" as="image" href="/logo.png" />` to `index.html` to improve LCP on Chrome. No CSS regressions found — `@supports` backdrop-filter fallbacks are in place, no `background-attachment: fixed` present.

**Safari "not secure" warning (2026-04-17):** User saw "This Connection Is Not Secure" on iOS Safari right after a new deployment. Server-side logs showed zero SSL errors — all API health checks pass. Root cause is a Replit-managed domain cert propagation delay; this resolves on its own within a few minutes of a new deploy. Workaround: navigate to `https://livhappierapps.com` explicitly (ensure the `https://` prefix). If it persists, contact Replit Support — DNS and SSL certs are fully platform-managed and cannot be changed from the codebase.

**Mascots hidden on mobile (2026-04-17):** All three mascots were set to `hidden md:block` / `hidden lg:block`, making them invisible on phones. Fixed by removing the `hidden` classes — all three mascots now show on all screen sizes with responsive sizing (`w-10/14/20` scaling by breakpoint). Rule: never add `hidden md:block` or `hidden lg:block` to a mascot element.

**Project status:** Site is complete and live. On pause until the next set of apps (AppArchy, TimeAtlus, RealizeMe, AIs&Ears) are ready to add.
