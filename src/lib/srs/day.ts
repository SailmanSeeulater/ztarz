/** The app's day boundary. Set APP_TIMEZONE (IANA, e.g. "America/New_York") on the server. */
export const appTimeZone = () => process.env.APP_TIMEZONE || Intl.DateTimeFormat().resolvedOptions().timeZone;

function offsetMs(at: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(at.getTime() / 1000) * 1000;
}

/** Local midnight (in `timeZone`) at the start of the day containing `now`, as a UTC instant. */
export function startOfDay(now: Date, timeZone = appTimeZone()): Date {
  const local = new Date(now.getTime() + offsetMs(now, timeZone));
  const midnightAsUtc = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
  // Correct with the offset at midnight itself, which differs from now's on DST-change days.
  return new Date(midnightAsUtc - offsetMs(new Date(midnightAsUtc - offsetMs(now, timeZone)), timeZone));
}

export function startOfTomorrow(now: Date, timeZone = appTimeZone()): Date {
  // Noon tomorrow is always in the next local day, even across DST shifts.
  const today = startOfDay(now, timeZone);
  return startOfDay(new Date(today.getTime() + 36 * 3_600_000), timeZone);
}
