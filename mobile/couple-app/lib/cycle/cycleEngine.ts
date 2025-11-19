// app/lib/cycle/cycleEngine.ts
import type { CycleDayInfo, CycleDayType, CycleSettings, FertilityLevel } from "../../app/types/cycle";

const toIso = (d: Date) => d.toISOString().slice(0, 10);

function addDays(base: Date, offset: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + offset);
  return d;
}

/**
 * Generate cycle days between start & end based on settings.
 * Very simple model:
 * - Period: first periodLength days of each cycle
 * - Ovulation: (cycleLength - lutealPhaseLength)th day of cycle
 * - Fertile: 5 days before ovulation + ovulation day
 * - Everything else: SAFE
 */
export function generateCycleDays(
  settings: CycleSettings,
  rangeStart: Date,
  rangeEnd: Date
): CycleDayInfo[] {
  const map = new Map<string, CycleDayType>();

  const firstCycleStart = new Date(settings.lastPeriodStart);
  const endTime = rangeEnd.getTime();

  let cycleStart = new Date(firstCycleStart);

  while (cycleStart.getTime() <= endTime + 24 * 60 * 60 * 1000) {
    // 1) Period days
    for (let i = 0; i < settings.periodLength; i++) {
      const d = addDays(cycleStart, i);
      map.set(toIso(d), "PERIOD");
    }

    // 2) Fertile window + ovulation
    const ovulationIndex = settings.cycleLength - settings.lutealPhaseLength; // 14 in a 28-day cycle
    const ovulationOffset = ovulationIndex - 1; // zero-based
    const fertileStartOffset = ovulationOffset - 5;

    for (let offset = fertileStartOffset; offset <= ovulationOffset; offset++) {
      if (offset < 0) continue;
      const d = addDays(cycleStart, offset);
      const iso = toIso(d);

      // Don't overwrite period days
      if (map.get(iso) === "PERIOD") continue;

      if (offset === ovulationOffset) {
        map.set(iso, "OVULATION");
      } else {
        map.set(iso, "FERTILE");
      }
    }

    // Next cycle
    cycleStart = addDays(cycleStart, settings.cycleLength);
  }

  // Build array for range
  const out: CycleDayInfo[] = [];
  const cursor = new Date(rangeStart);

  while (cursor <= rangeEnd) {
    const iso = toIso(cursor);
    const type = map.get(iso) ?? "SAFE";
    out.push({ date: iso, type });
    cursor.setDate(cursor.getDate() + 1);
  }

  return out;
}

export function fertilityLevelForType(type: CycleDayType): FertilityLevel {
  switch (type) {
    case "PERIOD":
      return "LOW";
    case "FERTILE":
    case "OVULATION":
      return "HIGH";
    case "SAFE":
    default:
      return "LOW";
  }
}

export function statusLabelForType(type: CycleDayType): string {
  switch (type) {
    case "PERIOD":
      return "Period";
    case "FERTILE":
      return "Fertile";
    case "OVULATION":
      return "Ovulation";
    case "SAFE":
    default:
      return "Low fertility";
  }
}
