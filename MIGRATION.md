# Migration Playbook

If the Replit account hosting `livhappierapps.com` is ever suspended,
hacked, or deleted, this document explains how to rebuild the site
elsewhere within roughly an hour. Everything you need lives in this
GitHub repo: the source code, the weekly Postgres dumps in `backups/`,
and the configuration described below.

## What you need before you start

- This GitHub repo cloned locally (`git clone …`).
- Node.js 24 and `pnpm` installed (`corepack enable && corepack prepare pnpm@latest --activate`).
- A credit card for whichever host you pick below (all have free tiers).
- The custom domain (`livhappierapps.com`) — login to the registrar so
  you can repoint DNS.

## Inventory of what to rebuild

| Piece            | Today (Replit)                          | Where it lives in the repo                  |
| ---------------- | --------------------------------------- | ------------------------------------------- |
| Static website   | `artifacts/livhappier-website` (static) | builds to `artifacts/livhappier-website/dist/public` |
| API server       | `artifacts/api-server` (autoscale)      | builds to `artifacts/api-server/dist/index.mjs` |
| Database         | Replit Postgres                         | latest dump in `backups/livhappier-*.sql.gz` |
| Custom domain    | `livhappierapps.com` (A → 34.111.179.208) | DNS controlled at the registrar             |
| Secrets          | `DATABASE_URL` only                     | set in the new host's env vars              |

## Step 1 — Restore the database

Pick any managed Postgres provider (Neon, Supabase, Render Postgres,
Fly Postgres — all have free tiers).

1. Create a new Postgres instance and copy its connection string.
2. Find the most recent dump in `backups/` (sorted newest first).
3. Restore it:

   ```bash
   gunzip -c backups/livhappier-YYYY-MM-DD.sql.gz \
     | psql "postgres://USER:PASS@HOST:PORT/DB?sslmode=require"
   ```

4. Save that connection string — you'll set it as `DATABASE_URL` on
   the API host in Step 3.

## Step 2 — Deploy the static website

Any static host works. Recommended: **Netlify** or **Cloudflare Pages**
(both free for this traffic level).

- **Build command**: `pnpm install && pnpm --filter @workspace/livhappier-website run build`
- **Publish directory**: `artifacts/livhappier-website/dist/public`
- **Node version**: 24

After deploy, you'll get a URL like `https://livhappier.netlify.app`.
Keep it open — you'll need it for the API CORS step.

## Step 3 — Deploy the API server

Recommended: **Fly.io** (cheapest for an always-on tiny server) or
**Render** (simplest UI, free tier sleeps like Replit autoscale).

### Fly.io quickstart

1. `brew install flyctl && fly auth signup`
2. From the repo root:

   ```bash
   cd artifacts/api-server
   pnpm install
   pnpm run build
   fly launch --no-deploy --name livhappier-api
   ```

3. Edit the generated `fly.toml` so it runs the built bundle:

   ```toml
   [build]
     builder = "paketobuildpacks/builder:base"

   [processes]
     app = "node dist/index.mjs"

   [[services]]
     internal_port = 8080
     protocol = "tcp"
     [[services.ports]]
       port = 443
       handlers = ["tls", "http"]
   ```

4. Set the database URL and deploy:

   ```bash
   fly secrets set DATABASE_URL="postgres://…"
   fly deploy
   ```

5. Health check: `curl https://livhappier-api.fly.dev/api/healthz`
   should return `{"status":"ok"}`.

### Render alternative

1. Create a new **Web Service** → connect this GitHub repo.
2. Root directory: `artifacts/api-server`
3. Build command: `pnpm install && pnpm run build`
4. Start command: `node dist/index.mjs`
5. Add environment variable `DATABASE_URL` = your Postgres URL from Step 1.

## Step 4 — Point the website at the new API

The frontend currently calls `/api/*` and relies on Replit's path-based
proxy. After migration the API lives on a different domain, so you have
two options:

- **Easy**: put the static site and the API behind the same domain
  using your host's path proxying (Netlify `_redirects`, Cloudflare
  Worker, or Fly's edge routing) so `/api/*` still works as a relative
  URL. Add a rule like:

  ```text
  # Netlify _redirects
  /api/*  https://livhappier-api.fly.dev/api/:splat  200
  ```

- **Explicit**: set a build-time env var (e.g. `VITE_API_BASE_URL`) in
  the website project and update fetch calls to use it. Rebuild and
  redeploy.

## Step 5 — Repoint the domain

1. In your domain registrar, replace the A record for
   `livhappierapps.com` with the new host's IP (Netlify, Fly, etc. all
   publish theirs).
2. Remove the existing `replit-verify` TXT record.
3. Add whatever verification record the new host asks for.
4. Wait for DNS to propagate (5–60 minutes). Test:

   ```bash
   curl -I https://livhappierapps.com/
   curl https://livhappierapps.com/api/healthz
   ```

## Step 6 — Resume backups

The weekly backup workflow lives at `.github/workflows/db-backup.yml`
and reads the GitHub Actions secret `DATABASE_URL`. Update that secret
to point at the new database so backups keep flowing.

## Recovery time objective

Following this playbook end-to-end (database restore + two deploys +
DNS) takes about 45–75 minutes, with the slowest step being DNS
propagation. The last week of chat history is preserved via the most
recent dump in `backups/`.
