# Threat Model

## Project Overview

LivHappierApps is a public-facing monorepo that serves a static React website and a small Express API. The community chat feature was removed; the only active public write endpoint is the Grok AI support chat at `POST /api/chat`, which is a stateless proxy to xAI's API. The `artifacts/mockup-sandbox` app is development-only and out of scope unless a production reachability path appears.

## Assets

- **AI chat availability** — the Grok support chat is the primary interactive feature on the site. If the endpoint is overwhelmed or abused, legitimate visitors lose access to support.
- **xAI API key** — `GROK_API_KEY` is required for the chat proxy. If leaked, attackers can exhaust quota and incur costs. It must never appear in logs, responses, or client-delivered code.
- **Service availability** — the API server must remain responsive. The `/api/chat` endpoint calls an external API (xAI) and must not become a vector for cost amplification or DoS.
- **Application secrets and infrastructure configuration** — `DATABASE_URL`, deployment configuration, and server logs must not leak sensitive values.

## Trust Boundaries

- **Browser to API** — all `/api/*` requests come from an untrusted client. The server must validate input shape and length before forwarding to xAI.
- **API to xAI** — the API acts as a stateless proxy. User-supplied content reaches xAI's API; the server must not forward malformed, oversized, or injection-crafted payloads.
- **Production vs. dev-only artifacts** — `artifacts/api-server` and `artifacts/livhappier-website` are production-relevant. `artifacts/mockup-sandbox`, agent skills, and other internal tooling are development-only and should be ignored for production findings.

## Scan Anchors

- Production server entry point: `artifacts/api-server/src/index.ts` and `artifacts/api-server/src/app.ts`
- Public API routes: `artifacts/api-server/src/routes/health.ts`, `artifacts/api-server/src/routes/chat.ts`
- Client rendering for chat: `artifacts/livhappier-website/src/pages/Support.tsx`
- Dev-only area to skip unless proven reachable: `artifacts/mockup-sandbox/`

## Threat Categories

### Spoofing

The Grok chat is stateless and requires no identity. No user identity is displayed to other users, so impersonation of other visitors is not a concern. The only identity risk is prompt injection — a user crafting a message that tricks Grok into impersonating the site owner or making false claims about the apps. The system prompt is server-side and cannot be overridden by client input, but the model should be monitored for jailbreak attempts if usage scales.

### Tampering

Users submit message content that is forwarded to xAI and returned as a reply. No content is persisted. The server validates message shape (Zod schema) and enforces a 2,000-character input limit and 20-turn history cap. The client renders Grok's reply as text — it must never be set as `innerHTML` to prevent XSS.

### Information Disclosure

- `GROK_API_KEY` must remain server-side only — never returned in API responses or logged at INFO level.
- Error responses must return generic messages only; raw xAI error bodies must be logged server-side, not forwarded to the client.
- Web search results (from DuckDuckGo) are fetched server-side and included in the Grok context — URLs are surfaced to the client only inside Grok's text reply.

### Denial of Service

`POST /api/chat` is a public endpoint on an always-on deployment that makes an outbound call to xAI on every request. Without rate limiting, an attacker can drive up xAI API costs via high-frequency requests or exhaust quota, making the chat unavailable for real visitors.

**Recommended control (not yet implemented):** per-IP rate limiting (e.g., 20 requests/minute) on `/api/chat`. Express `rate-limiter-flexible` or similar middleware would address this.

### Elevation of Privilege

No authenticated or admin-only production routes exist. The chat endpoint is fully public and stateless. Any future privileged routes must implement server-side authentication — the current public-proxy model must not be extended to sensitive operations.
