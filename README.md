# cherr.io — marketing site

The public site on **https://cherr.io** (pre-launch waitlist + explainer pages). The platform itself lives in
[`web3-platform`](https://github.com/DataVallis-CHERR-IO/web3-platform) and runs on `app.cherr.io` (prod) / `dev.cherr.io`.

- Next.js 15 (App Router), TypeScript strict, no Tailwind — plain CSS on the CHERR.IO design-system tokens.
- `src/styles/tokens.css` and `components.css` are copied from `web3-platform/packages/ui` (same `ch-` classes). Update them from there, never by hand.
- Fonts ship in `src/fonts` (OFL, from Fontsource) — no requests to Google at build or run time.
- English only. Copy lives in the page files; FAQ in `src/lib/faq.tsx`; example figures (always labelled "Example") in `src/lib/examples.ts`.

## Pages

`/` · `/how-it-works` · `/charity-market-cap` · `/emergency-pool` · `/charities` · `/cherrions` · `/faq` · `/about` · `/privacy` · `/terms` · 404.
`www.cherr.io` → `cherr.io` (308, `src/middleware.ts`).

## Waitlist → Klaviyo

`POST /api/subscribe` `{ email, role, consent: true, source }`:
1. `profile-import` — upserts the profile with `cherrio_role` and `cherrio_signup_source` properties,
2. `profile-subscription-bulk-create-jobs` — subscribes it to `KLAVIYO_LIST_ID` with email marketing consent.

Double opt-in is controlled by the list's settings in Klaviyo. Origin check, honeypot and a per-IP limit (5 / 10 min).
The key needs write access to **Profiles**, **Lists** and **Subscriptions**. `/api/health` shows `"klaviyo": true` once both env vars are set.

## Develop

```bash
pnpm install
cp .env.example .env.local   # optional: Klaviyo test key
pnpm dev                     # http://localhost:3000
pnpm typecheck && pnpm test && pnpm build
```

## Deploy

Push to `main` → GitHub Actions (`deploy.yml`): typecheck + tests → image to GHCR → `kamal deploy` → smoke tests on https://cherr.io.
Kamal service `cherrio-site` (256 MB), same host and kamal-proxy as the platform. TLS by Let's Encrypt via kamal-proxy.

Repository secrets: `SSH_PRIVATE_KEY` (CI-only key for `deploy@`), `SSH_KNOWN_HOSTS`, `KAMAL_REGISTRY_USERNAME`,
`KAMAL_REGISTRY_PASSWORD` (GitHub token with `read:packages`), `KLAVIYO_PRIVATE_KEY`, `KLAVIYO_LIST_ID`.

Rollback: `kamal rollback sha-<previous7>` (with the secrets exported).

---
Operated by Data Vallis d.o.o., Maribor, Slovenia.
