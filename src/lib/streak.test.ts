import { describe, expect, it } from "vitest";
import { buildStreak, dayKey } from "./streak";

describe("buildStreak", () => {
  it("counts back from today when today is done", () => {
    expect(buildStreak(["2026-11-23", "2026-11-24", "2026-11-25"], "2026-11-25")).toEqual({
      current: 3,
      longest: 3,
      practisedToday: true,
    });
  });

  it("keeps yesterday's streak alive until today ends", () => {
    expect(buildStreak(["2026-11-23", "2026-11-24"], "2026-11-25")).toMatchObject({ current: 2, practisedToday: false });
  });

  it("breaks after a missed day, but remembers the longest run", () => {
    const s = buildStreak(["2026-11-01", "2026-11-02", "2026-11-03", "2026-11-04", "2026-11-23"], "2026-11-25");
    expect(s).toEqual({ current: 0, longest: 4, practisedToday: false });
  });

  it("crosses month and year ends and a DST change", () => {
    expect(buildStreak(["2026-12-31", "2027-01-01"], "2027-01-01").current).toBe(2);
    expect(buildStreak(["2026-10-31", "2026-11-01", "2026-11-02"], "2026-11-02").current).toBe(3);
  });

  it("is zero with no reviews", () => {
    expect(buildStreak([], "2026-11-25")).toEqual({ current: 0, longest: 0, practisedToday: false });
  });
});

describe("dayKey", () => {
  it("uses the local calendar day", () => {
    // 07:30 UTC on the 25th is still the 24th in Los Angeles.
    expect(dayKey(new Date("2026-11-25T07:30:00Z"), "America/Los_Angeles")).toBe("2026-11-24");
    expect(dayKey(new Date("2026-11-25T07:30:00Z"), "Europe/London")).toBe("2026-11-25");
  });
});
