---
name: assess-publication
description: Audit a published web app for reachability, discoverability, independence from the dev environment, dev-URL leaks, deployment cost surface, and survivability if the hosting account is lost. Use when the user asks to "audit my publication", "is my site fully live", "check my deployment health", "make sure my app is independent of dev", "am I paying for things I don't need", "what happens if I lose my account", or any variation of verifying a deployed site is production-grade and not silently broken.
---

# Assess Publication Health & Independence

A repeatable audit that probes a deployed app from the outside, checks the build output for dev-environment leaks, inspects deployment configs for cost waste, and documents what would survive if the hosting account were lost.

## When to use
- User has published a site and wants confidence it's actually live, discoverable, and durable.
- User is worried about hosting costs and wants to know what they're paying for.
- User is worried about losing their account and wants to know what would survive.
- After a major deployment or domain change, to verify nothing is silently broken.

## What this skill does NOT do
- It does not migrate the project off the current host.
- It does not change DNS.
- It does not set up backups (it only recommends them).
- It does not implement rate-limiting or auth (separate skills/tasks).

## The 7-question audit

For each question, record **PASS / WARN / FAIL** with a one-line note in the report.

### 1. Reachability
Does the public domain return HTTP 200 with valid SSL? Do all named routes render?
```bash
DOMAIN="livhappierapps.com"   # replace
for path in / /support /settings /edenmux; do
  echo "$path → $(curl -s -o /dev/null -w '%{http_code}' --max-time 10 https://$DOMAIN$path)"
done
echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates -issuer
curl -s -I --max-time 10 https://$DOMAIN/ | grep -iE 'strict-transport|content-security|x-frame|x-content-type'
```

### 2. API health
Does the API health endpoint respond, and is the API the published service (not a dev tunnel)?
```bash
curl -s --max-time 10 https://$DOMAIN/api/healthz
grep -E 'deploymentTarget|health' artifacts/*/.replit-artifact/artifact.toml
```

### 3. Discoverability
Are OG/Twitter meta tags in the **live** HTML (not just source)? Is a `<noscript>` block present for non-JS crawlers?
```bash
html=$(curl -s --max-time 10 https://$DOMAIN/)
echo "$html" | grep -cE 'og:title|og:description|og:image|twitter:card'
echo "$html" | grep -q '<noscript>' && echo "noscript: PRESENT" || echo "noscript: MISSING"
```
**Common bug:** noscript or meta tags are in `index.html` source but missing from the live site because `dist/` is stale. Compare timestamps of `index.html` (source) vs `dist/public/index.html`. If source is newer, rebuild and republish.

### 4. Independence
Would the published site keep serving if the dev workflow stops? Static sites: yes automatically. API: verify code has no dev-only URLs.
```bash
rg -n 'localhost|replit\.dev|\.repl\.co|127\.0\.0\.1' artifacts/*/src
```
Any matches = FAIL or WARN (depending on whether they're gated behind `NODE_ENV === 'development'`).

### 5. No dev-environment leaks
Search the **built output** for hardcoded dev URLs that would break in production.
```bash
rg -i -l 'localhost|replit\.dev|\.repl\.co|127\.0\.0\.1|replit\.app' artifacts/*/dist/
```
For each match, open the file and check the surrounding context — distinguish between **leaked dev URLs** (FAIL) and **intentional public links** to other hosted projects (WARN, document but don't necessarily fix).

### 6. Cost surface
Inspect every `artifact.toml` for deployment type and identify always-on services.
```bash
for f in artifacts/*/.replit-artifact/artifact.toml; do
  echo "=== $f ==="
  grep -E 'kind|deploymentTarget|serve' $f
done
```
Flag:
- Any `deploymentTarget = "vm"` (always-on) where traffic is likely low → recommend `autoscale`.
- Any dev-only artifact (`kind = "design"` etc.) that the user might think is being deployed (it's not).
- Remind the user: the **dev container** itself bills while open. Close the workspace tab when done.

### 7. Survivability
Document what survives if the hosting account dies. For each component:
- Source code → safe if pushed to git remote, GONE otherwise.
- Database → GONE unless backed up.
- Static site → can be redeployed anywhere from `dist/`.
- API → can be redeployed to Fly.io / Railway / Render.
- Custom domain → DNS will need re-pointing; if domain is host-managed (e.g. Replit-managed), transfer requires support ticket.

Always recommend: (a) push to GitHub now, (b) schedule a weekly `pg_dump`, (c) write a 1-page migration playbook.

## Report template

Save to `.local/publication-audit-<YYYY-MM-DD>.md` with this structure:

```markdown
# Publication Audit — <domain>
**Date:** <YYYY-MM-DD>
**Domain probed:** https://<domain>/

## Summary
| # | Check | Result | Note |
|---|---|---|---|
| 1 | Reachability | ✅/⚠️/❌ | one line |
| 2 | API health | ✅/⚠️/❌ | one line |
| 3 | Discoverability | ✅/⚠️/❌ | one line |
| 4 | Independence | ✅/⚠️/❌ | one line |
| 5 | Dev-env leaks | ✅/⚠️/❌ | one line |
| 6 | Cost surface | ✅/⚠️/❌ | one line |
| 7 | Survivability | ✅/⚠️/❌ | one line |

## Details
(one short section per question, with exact findings)

## Recommended follow-ups
- (Cost) ...
- (Survivability) ...
- (Republish) ...
```

## Fix-while-you-audit rule
If you find a critical FAIL that's a one-line fix (stale build, missing noscript, exposed dev URL in source), **fix it inline** in the same task. For WARNs and larger fixes (switching deployment target, setting up backups), document them as recommended follow-ups — do not implement without explicit user approval, because they may have cost or downtime implications.

## Hand-off
After writing the report, surface the top 3 actionable items to the user in plain language. Do not assume the user will read the full markdown file — give them the headline findings and let them ask for details.
