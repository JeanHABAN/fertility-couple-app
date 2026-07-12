import { fertilityLevelForType, generateCycleDays, statusLabelForType } from "../lib/cycle/cycleEngine";

describe("cycleEngine", () => {
  test("generateCycleDays marks period, fertile and ovulation days for a 28-day cycle", () => {
    const settings = {
      lastPeriodStart: "2026-01-01",
      cycleLength: 28,
      periodLength: 5,
      lutealPhaseLength: 14,
      goal: "TRACK_ONLY",
    } as const;

    const days = generateCycleDays(settings, new Date("2026-01-01"), new Date("2026-01-28"));

    expect(days).toHaveLength(28);

    expect(days[0]).toEqual({ date: "2026-01-01", type: "PERIOD" });
    expect(days[4]).toEqual({ date: "2026-01-05", type: "PERIOD" });

    expect(days[22]).toEqual({ date: "2026-01-23", type: "FERTILE" });
    expect(days[27]).toEqual({ date: "2026-01-28", type: "OVULATION" });
  });

  test("fertilityLevelForType returns HIGH for fertile and ovulation", () => {
    expect(fertilityLevelForType("SAFE")).toBe("LOW");
    expect(fertilityLevelForType("PERIOD")).toBe("LOW");
    expect(fertilityLevelForType("FERTILE")).toBe("HIGH");
    expect(fertilityLevelForType("OVULATION")).toBe("HIGH");
  });

  test("statusLabelForType returns correct labels", () => {
    expect(statusLabelForType("PERIOD")).toBe("Period");
    expect(statusLabelForType("FERTILE")).toBe("Fertile");
    expect(statusLabelForType("OVULATION")).toBe("Ovulation");
    expect(statusLabelForType("SAFE")).toBe("Low fertility");
  });
});
