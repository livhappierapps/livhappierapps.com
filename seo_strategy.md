# SEO Strategy

## In scope
- Public marketing pages on `livhappierapps.com`
- Product/app landing pages (`/`, `/edenmux`, `/apps/middlemain`)
- Public legal and trust pages (`/apps/middlemain/privacy`, `/apps/middlemain/terms`, `/settings`)
- Public support route (`/support`) where crawlability or shared-shell issues affect visibility

## Out of scope
- Authenticated dashboards and admin pages (none currently present in the website app)
- Development-only artifacts such as `artifacts/mockup-sandbox/`
- API-only routes except where they affect SEO support files or public page rendering

## Target audience
- People discovering the LivHappierApps brand and its app portfolio
- Prospective users of MiddleMAIn and EdenMux
- Visitors evaluating trust, compliance, and support information

## Primary keywords
- LivHappier Apps
- MiddleMAIn
- EdenMux
- AI developer app
- AI support chat

## Rendering model
- `artifacts/livhappier-website` is a static Vite + React SPA using Wouter.
- Public routes are client-rendered from a shared `index.html` shell; there is no SSR, SSG prerendering, or route-specific HTML head emission.

## Notes
- Shared-shell issues in `artifacts/livhappier-website/index.html` affect every public route.
- Social bots and AI crawlers only see the static HTML shell and `noscript` content.

## Dismissed categories
- None yet.
