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

- Entry: `index.html` → `src/main.tsx`
- Routing: `wouter` — pages live in `src/pages/`
- Styling: Tailwind CSS 4 + shadcn/ui components in `src/components/ui/`; all custom CSS lives in `src/index.css` (`src/app.css` exists but is **not imported** — do not add styles there). Do **not** use `background-attachment: fixed` — it breaks Android Chrome entirely
- Animations: Framer Motion
- Logo: `public/logo.png` — neon LivHappierApps script logo with transparent background
- Header (`src/components/Header.tsx`): fixed sticky header with logo bar → candy-cane bar → nav bar. On the home page (`/`) the logo renders large (`header-logo-home`, 160px); on all other pages it renders at the standard size (55px). The `AppShell` in `App.tsx` applies `main-content-home` class on the home route to adjust the top margin to match the taller header
- Home page (`src/pages/Home.tsx`): "Welcome to LivHappierApps" heading + app cards grid; logo lives in the header, not duplicated in page content
- Community page (`src/pages/Community.tsx`): live chat with "Join the Conversation" entry screen; uses PostgreSQL via the API server for message persistence
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
