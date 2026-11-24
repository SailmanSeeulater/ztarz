import { describe, expect, it } from "vitest";
import { startOfDay, startOfTomorrow } from "./day";

describe("day boundaries", () => {
  it("uses local midnight in the given zone", () => {
    // 02:00 UTC on Nov 24 is still Nov 23 in New York (UTC-5).
    const now = new Date("2026-11-24T02:00:00Z");
    expect(startOfDay(now, "America/New_York").toISOString()).toBe("2026-11-23T05:00:00.000Z");
    expect(startOfTomorrow(now, "America/New_York").toISOString()).toBe("2026-11-24T05:00:00.000Z");
    expect(startOfDay(now, "UTC").toISOString()).toBe("2026-11-24T00:00:00.000Z");
  });

  it("handles a DST change day (US spring forward, 23-hour day)", () => {
    const now = new Date("2026-03-08T18:00:00Z"); // afternoon of Mar 8 in New York
    expect(startOfDay(now, "America/New_York").toISOString()).toBe("2026-03-08T05:00:00.000Z");
    expect(startOfTomorrow(now, "America/New_York").toISOString()).toBe("2026-03-09T04:00:00.000Z");
  });
});
