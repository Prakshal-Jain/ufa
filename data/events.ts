import type { UfaEvent } from "@/lib/events";

// Events pinned by hand. These always show on the site, merged with whatever the
// Google Calendar feed returns (deduped by URL). Use this for events hosted on
// Partiful or anywhere the calendar feed may not carry. Past events drop off
// automatically once their end time passes.
export const PINNED_EVENTS: UfaEvent[] = [
  {
    id: "partiful-OTceSaxsG5xUuZ54BeI4",
    name: "JEV Bake-Off: $1,000 Emergency Game Show",
    startAt: "2026-10-01T02:00:00.000Z", // Wed Sep 30, 7:00pm PT
    endAt: "2026-10-01T04:00:00.000Z", // 9:00pm PT
    timezone: "America/Los_Angeles",
    allDay: false,
    url: "https://partiful.com/e/OTceSaxsG5xUuZ54BeI4",
    location: "590 Howard St, San Francisco",
  },
];
