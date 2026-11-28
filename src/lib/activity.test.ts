import { describe, expect, it } from "vitest";
import { buildLog, type ActivityEvent } from "./activity";

const at = (iso: string) => new Date(iso);
const review = (iso: string, missed = false): ActivityEvent => ({ at: at(iso), kind: "review", summary: iso, missed });

describe("buildLog", () => {
  it("groups by local day, newest first, and folds a sitting's reviews together", () => {
    const days = buildLog(
      [
        review("2026-11-25T17:00:00Z"),
        review("2026-11-25T17:05:00Z", true),
        review("2026-11-25T17:10:00Z"),
        { at: at("2026-11-25T18:00:00Z"), kind: "note.created", summary: "Created a note" },
        review("2026-11-25T20:00:00Z"), // a second sitting, hours later
        review("2026-11-24T17:00:00Z"),
      ],
      "UTC",
    );
    expect(days.map((d) => d.day)).toEqual(["2026-11-25", "2026-11-24"]);
    const [late, note, first] = days[0].entries;
    expect(late).toMatchObject({ type: "study", count: 1 });
    expect(note).toMatchObject({ type: "event", kind: "note.created" });
    expect(first).toMatchObject({ type: "study", count: 3, missed: 1 });
    expect(first.type === "study" && [first.at, first.until]).toEqual([at("2026-11-25T17:00:00Z"), at("2026-11-25T17:10:00Z")]);
  });

  it("doesn't fold reviews across another event or across midnight", () => {
    const days = buildLog(
      [
        review("2026-11-25T08:10:00Z"),
        { at: at("2026-11-25T08:05:00Z"), kind: "drill.finished", summary: "Drill" },
        review("2026-11-25T08:00:00Z"),
        review("2026-11-25T07:55:00Z"), // 23:55 the day before in Los Angeles
      ],
      "America/Los_Angeles",
    );
    expect(days.map((d) => d.entries.length)).toEqual([3, 1]);
  });
});
