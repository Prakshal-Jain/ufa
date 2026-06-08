# External Integrations

**Analysis Date:** 2026-06-08

## APIs & External Services

**None detected** - This is a minimalist coming-soon landing page with no external API integrations.

## Data Storage

**Databases:**
- None - Application is stateless static content

**File Storage:**
- Local filesystem only - Static assets served from generated `out/` directory

**Caching:**
- None explicitly configured

## Authentication & Identity

**Auth Provider:**
- Not applicable - No user authentication required

## Monitoring & Observability

**Error Tracking:**
- None detected

**Logs:**
- Standard Next.js development logs via console

## CI/CD & Deployment

**Hosting:**
- GitHub Pages (inferred from static export configuration)
  - Apex domain: `ufa.foundation`
  - No basePath required (root-level deployment)

**CI Pipeline:**
- Not detected - No CI configuration files present (no GitHub Actions workflows, no .gitlab-ci.yml, etc.)

## Environment Configuration

**Required env vars:**
- None - Application is fully self-contained

**Secrets location:**
- Not applicable

## Webhooks & Callbacks

**Incoming:**
- None

**Outgoing:**
- None

## Build & Deployment Flow

**Static Export:**
- `npm run build` generates static HTML/CSS/JS in `out/` directory
- All pages pre-rendered at build time
- No server-side rendering or API routes
- Suitable for direct GitHub Pages deployment or any static hosting provider

**Content Delivery:**
- Metadata configured in `app/layout.tsx` for SEO:
  - Open Graph tags included
  - Base URL: `https://ufa.foundation`
  - Canonical domain configuration

---

*Integration audit: 2026-06-08*
