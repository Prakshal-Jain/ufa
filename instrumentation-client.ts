import posthog from 'posthog-js';

// PostHog for ufa.foundation. Mirrors the Mitosis Labs setup
// (src/instrumentation-client.ts in the monorepo) but records into the SEPARATE
// "UFA" PostHog project (id 508136) so UFA session replays never mix into the
// Mitosis project.
//
// Static-export difference: UFA ships to GitHub Pages with no server, so the
// `/ingest` reverse-proxy Mitosis uses is not available. We point api_host
// straight at PostHog's US cloud instead (slightly more ad-blockable; fine for
// a marketing site). The project token below is a write-only client key, safe
// to ship in a public bundle; an env var can override it per build.

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY || 'phc_D5aybzydDnRSNzCmefimMWHKGrMePRQ5tm86CA5nnXCx';
const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';
const isDev = process.env.NODE_ENV === 'development';

if (typeof window !== 'undefined' && key && !isDev) {
  const host = window.location.hostname;
  // Never initialize on localhost or dev environments.
  if (host !== 'localhost' && host !== '127.0.0.1' && !host.startsWith('dev.')) {
    posthog.init(key, {
      api_host: apiHost,
      ui_host: 'https://us.posthog.com',
      defaults: '2026-01-30',
      person_profiles: 'identified_only',
      capture_exceptions: true,
      // Full page + interaction coverage on top of session replay (enabled in
      // the UFA project settings).
      autocapture: true,          // every meaningful click/change/submit
      capture_pageview: true,     // incl. SPA route changes (History API)
      capture_pageleave: true,    // time-on-page / bounce
      rageclick: true,            // frustration signal
      capture_dead_clicks: true,  // clicks that did nothing (UX friction)
      capture_heatmaps: true,     // click/scroll heatmaps
    });
  }
}
