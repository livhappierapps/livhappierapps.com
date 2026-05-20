# Threat Model

## Project Overview

LivHappierApps is a public-facing monorepo that serves a static React website and a small Express API backed by PostgreSQL. In production, the meaningful attack surface is concentrated in the anonymous community chat flow exposed at `/api/messages`; the `artifacts/mockup-sandbox` app is development-only and out of scope unless a production reachability path appears.

## Assets

- **Community message integrity** -- messages shown on the public site shape user trust. If attackers can impersonate trusted identities or flood the feed, they can mislead visitors and damage the site’s reputation.
- **Service availability** -- the API server and backing PostgreSQL database must remain responsive. Unbounded public writes can degrade the always-on chat service or consume storage over time.
- **Stored community content** -- chat messages are persisted in PostgreSQL and displayed to visitors. Stored content must not become an XSS or injection vector.
- **Application secrets and infrastructure configuration** -- `DATABASE_URL`, deployment configuration, and server logs must not leak sensitive values.

## Trust Boundaries

- **Browser to API** -- all `/api/*` requests come from an untrusted client. The server must validate, authenticate where required, and rate-limit as needed.
- **API to PostgreSQL** -- the API has direct database write access. Public input reaching insert paths can affect data integrity and availability even when SQL injection is prevented by the ORM.
- **Anonymous user to displayed identity** -- the current chat model lets visitors choose a display name client-side and submit it to the server. This is a trust boundary because visitors may interpret names as meaningful identities.
- **Production vs. dev-only artifacts** -- `artifacts/api-server` and `artifacts/livhappier-website` are production-relevant. `artifacts/mockup-sandbox`, agent skills, and other internal tooling should usually be ignored for production findings.

## Scan Anchors

- Production server entry point: `artifacts/api-server/src/index.ts` and `artifacts/api-server/src/app.ts`
- Public API routes: `artifacts/api-server/src/routes/health.ts`, `artifacts/api-server/src/routes/messages.ts`
- Database schema and validation for chat: `lib/db/src/schema/messages.ts`
- Client rendering for public content: `artifacts/livhappier-website/src/pages/Community.tsx`, `artifacts/livhappier-website/src/hooks/use-messages.ts`
- Dev-only area to skip unless proven reachable: `artifacts/mockup-sandbox/`

## Threat Categories

### Spoofing

The production chat currently allows anonymous posting with a client-chosen `username`. If the server does not bind displayed identity to any authenticated principal or reserve trusted names, an attacker may post as the site owner or as another participant. Publicly displayed identities therefore must either be explicitly treated as untrusted aliases or be backed by server-enforced authenticity.

### Tampering

Visitors can submit message content that is persisted and later rendered to other users. The server must validate message shape and length, and the client must render stored content as text rather than HTML. Any future expansion of the API must continue to avoid client-side-only enforcement of message rules.

### Information Disclosure

The public API should expose only intended chat fields and generic error messages. Secrets such as database credentials, auth headers, and cookies must remain redacted in logs and must never reach browser-delivered code or API responses.

### Denial of Service

`POST /api/messages` is a public write endpoint on an always-on deployment. The service must prevent attackers from using automated message submission, high-frequency polling, or other cheap requests to overwhelm the API, exhaust database storage, or make the chat unusable for legitimate visitors.

### Elevation of Privilege

This project does not currently implement authenticated or admin-only production routes, so classic privilege escalation risk is limited today. The main guarantee is that future privileged routes must not inherit the current trust-based chat model; any sensitive action must be protected by server-side authentication and authorization rather than client-provided identifiers.
