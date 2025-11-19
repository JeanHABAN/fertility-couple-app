export type CycleDayType = "PERIOD" | "FERTILE" | "OVULATION" | "SAFE";

export interface CycleDayInfo {
  date: string;          // ISO: "2025-02-15"
  type: CycleDayType;
  note?: string;
}

export type FertilityLevel = "LOW" | "MEDIUM" | "HIGH";

export interface CycleSettings {
  lastPeriodStart: string;   // ISO date
  cycleLength: number;       // e.g. 28
  periodLength: number;      // e.g. 5
  lutealPhaseLength: number; // e.g. 14
}



export type FertilityGoal =
  | "AVOID_PREGNANCY"
  | "TRY_TO_CONCEIVE"
  | "TRACK_ONLY";

export interface CycleSettings {
  lastPeriodStart: string; // YYYY-MM-DD
  cycleLength: number;
  periodLength: number;
  lutealPhaseLength: number;
  goal: FertilityGoal; // 👈 add this line
}