export type FlowIntensity = "LIGHT" | "MEDIUM" | "HEAVY";
export type ProtectionType = "NONE" | "CONDOM" | "PILL" | "OTHER";

export interface PeriodLog {
  intensity: FlowIntensity;
  note?: string;
}

export interface SexLog {
  timeOfDay: "MORNING" | "AFTERNOON" | "EVENING" | "NIGHT";
  protection: ProtectionType;
  note?: string;
}

export interface SymptomLog {
  symptoms: string[];       // e.g. ["cramps", "headache"]
  mood?: string;            // e.g. "tired", "happy"
  note?: string;
}

export interface DayLog {
  date: string;             // ISO
  period?: PeriodLog;
  sex?: SexLog[];
  symptoms?: SymptomLog;
}