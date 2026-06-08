// Calendar events for the site, pulled at BUILD TIME from a Google Calendar
// "secret iCal" feed (output: "export" has no server runtime). The feed URL is a
// private secret: GCAL_ICS_URL in .env.local locally, a GitHub Actions secret in
// CI. It never reaches the browser. We fetch the whole calendar, keep only events
// whose title/description contains "[UFA]" or "Ultimate Fighting Agents", and
// publish just those. If the URL is missing or the fetch fails, we return [] so
// the site still builds and renders a graceful fallback.

const ICS_ENV = "GCAL_ICS_URL";
const MATCH = /\[ufa\]|ultimate\s+fighting\s+agents/i;
// Timezone used for display only when the feed gives a UTC/floating time with no
// zone of its own. Google's secret iCal normally carries a TZID per event.
const DISPLAY_TZ = "America/Los_Angeles";

export type UfaEvent = {
  id: string;
  name: string;
  startAt: string; // ISO instant
  endAt: string | null;
  timezone: string | null;
  allDay: boolean;
  url: string | null;
  location: string | null;
};

type ParsedEvent = UfaEvent & { description: string | null };

export async function getUpcomingEvents(limit = 6): Promise<UfaEvent[]> {
  const url = process.env[ICS_ENV];
  if (!url) {
    console.warn(`[events] ${ICS_ENV} not set — building without event dates.`);
    return [];
  }

  try {
    const res = await fetch(url, { headers: { accept: "text/calendar" } });
    if (!res.ok) {
      console.warn(`[events] ICS fetch failed: ${res.status} ${res.statusText}`);
      return [];
    }
    const ics = await res.text();
    const now = Date.now();

    return parseIcs(ics)
      .filter((e) => MATCH.test(e.name) || (e.description ? MATCH.test(e.description) : false))
      // keep events that haven't ended yet
      .filter((e) => new Date(e.endAt ?? e.startAt).getTime() >= now)
      .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
      .slice(0, limit)
      .map(
        ({ id, name, startAt, endAt, timezone, allDay, url: u, location }): UfaEvent => ({
          id,
          name,
          startAt,
          endAt,
          timezone,
          allDay,
          url: u,
          location,
        })
      );
  } catch (err) {
    console.warn("[events] error:", err);
    return [];
  }
}

// --- iCal parsing ---------------------------------------------------------- //

type Prop = { value: string; params: Record<string, string> };

function parseIcs(text: string): ParsedEvent[] {
  // Unfold folded lines (RFC 5545: a CRLF followed by a space/tab is a continuation).
  const unfolded = text.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "");
  const lines = unfolded.split("\n");

  const events: ParsedEvent[] = [];
  let cur: Record<string, Prop> | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      cur = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (cur) events.push(toEvent(cur));
      cur = null;
      continue;
    }
    if (!cur) continue;

    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const left = line.slice(0, colon);
    const value = line.slice(colon + 1);
    const segs = left.split(";");
    const name = segs[0].toUpperCase();
    const params: Record<string, string> = {};
    for (const seg of segs.slice(1)) {
      const eq = seg.indexOf("=");
      if (eq > 0) params[seg.slice(0, eq).toUpperCase()] = seg.slice(eq + 1);
    }
    cur[name] = { value, params };
  }

  return events;
}

function toEvent(props: Record<string, Prop>): ParsedEvent {
  const get = (k: string) => props[k]?.value;
  const start = parseDate(props["DTSTART"]);
  const end = props["DTEND"] ? parseDate(props["DTEND"]) : null;
  const description = get("DESCRIPTION") ? unescape(get("DESCRIPTION")!) : null;

  return {
    id: get("UID") || `${get("SUMMARY") ?? "event"}-${start.iso}`,
    name: unescape(get("SUMMARY") ?? "UFA Event"),
    startAt: start.iso,
    endAt: end?.iso ?? null,
    timezone: start.tz,
    allDay: start.allDay,
    url: get("URL") ? get("URL")!.trim() : extractUrl(description),
    location: get("LOCATION") ? unescape(get("LOCATION")!) : null,
    description,
  };
}

function parseDate(prop: Prop | undefined): { iso: string; tz: string | null; allDay: boolean } {
  if (!prop) return { iso: new Date(0).toISOString(), tz: null, allDay: false };
  const v = prop.value.trim();
  const tzid = prop.params["TZID"] || null;

  // All-day: VALUE=DATE or a bare YYYYMMDD
  if (prop.params["VALUE"] === "DATE" || /^\d{8}$/.test(v)) {
    const y = +v.slice(0, 4), mo = +v.slice(4, 6), d = +v.slice(6, 8);
    return { iso: new Date(Date.UTC(y, mo - 1, d)).toISOString(), tz: null, allDay: true };
  }

  const m = v.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?(Z)?$/);
  if (!m) {
    const t = Date.parse(v);
    return { iso: new Date(Number.isNaN(t) ? 0 : t).toISOString(), tz: tzid, allDay: false };
  }
  const y = +m[1], mo = +m[2], d = +m[3], h = +m[4], mi = +m[5], s = +(m[6] || 0);

  if (m[7]) {
    // UTC ("Z")
    return { iso: new Date(Date.UTC(y, mo - 1, d, h, mi, s)).toISOString(), tz: null, allDay: false };
  }
  if (tzid) {
    // Wall-clock time in a named zone -> resolve to a true instant.
    return { iso: new Date(wallTimeToInstant(y, mo, d, h, mi, s, tzid)).toISOString(), tz: tzid, allDay: false };
  }
  // Floating time, no zone: treat the wall clock as UTC.
  return { iso: new Date(Date.UTC(y, mo - 1, d, h, mi, s)).toISOString(), tz: null, allDay: false };
}

// Convert a wall-clock time in an IANA zone to a UTC instant (DST-aware).
function wallTimeToInstant(y: number, mo: number, d: number, h: number, mi: number, s: number, tz: string): number {
  const guess = Date.UTC(y, mo - 1, d, h, mi, s);
  let offset = tzOffsetMs(tz, guess);
  let instant = guess - offset;
  offset = tzOffsetMs(tz, instant); // refine across DST boundaries
  return guess - offset;
}

function tzOffsetMs(tz: string, utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
    .formatToParts(new Date(utcMs))
    .reduce<Record<string, string>>((acc, p) => {
      acc[p.type] = p.value;
      return acc;
    }, {});
  const asUTC = Date.UTC(
    +parts.year,
    +parts.month - 1,
    +parts.day,
    +parts.hour,
    +parts.minute,
    +parts.second
  );
  return asUTC - utcMs;
}

function unescape(s: string): string {
  return s
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\")
    .trim();
}

function extractUrl(text: string | null): string | null {
  if (!text) return null;
  const luma = text.match(/https?:\/\/(?:[\w.-]*\.)?lu\.ma\/[^\s<>"]+/i);
  if (luma) return luma[0];
  const any = text.match(/https?:\/\/[^\s<>"]+/i);
  return any ? any[0] : null;
}

// Date pieces for rendering, in the event's own timezone.
export function eventDateParts(ev: UfaEvent) {
  const timeZone = ev.timezone || (ev.allDay ? "UTC" : DISPLAY_TZ);
  const d = new Date(ev.startAt);
  const fmt = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { ...opts, timeZone }).format(d);
  return {
    mo: fmt({ month: "short" }),
    dy: fmt({ day: "numeric" }),
    weekday: fmt({ weekday: "long" }),
    time: ev.allDay ? null : fmt({ hour: "numeric", minute: "2-digit", timeZoneName: "short" }),
    short: fmt({ weekday: "short", month: "short", day: "numeric" }),
  };
}
