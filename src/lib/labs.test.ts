import { describe, expect, it } from "vitest";
import { runChecks } from "./labs";

describe("runChecks", () => {
  const checks = [
    { label: "connected", pattern: "Connected to .+ port 443" },
    { label: "once", pattern: "processed evt_1\\b", times: 1 },
  ];

  it("passes each check whose pattern matches, case-insensitively and per line", () => {
    const r = runChecks(checks, "* connected to example.com (1.2.3.4) port 443\r\nprocessed evt_1\n");
    expect(r).toEqual([
      { label: "connected", passed: true },
      { label: "once", passed: true },
    ]);
  });

  it("fails a times check when the line appears more or less often", () => {
    expect(runChecks(checks, "processed evt_1\nprocessed evt_1")[1].passed).toBe(false);
    expect(runChecks(checks, "nothing here")[1].passed).toBe(false);
  });
});
