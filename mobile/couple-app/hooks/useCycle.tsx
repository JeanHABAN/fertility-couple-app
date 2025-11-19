import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

import type {
  CycleDayInfo,
  CycleSettings,
  FertilityLevel,
} from "../app/types/cycle";
import {
  generateCycleDays,
  fertilityLevelForType,
  statusLabelForType,
} from "../lib/cycle/cycleEngine";

import type { DayLog, PeriodLog, SexLog, SymptomLog } from "../app/types/logs";

const toIso = (d: Date) => d.toISOString().slice(0, 10);
const today = new Date();

// Default settings – will be overridden by onboarding
const initialSettings: CycleSettings = {
  lastPeriodStart: toIso(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14)
  ),
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
  goal: "AVOID_PREGNANCY", // 👈 default
};

export type TodayStatus = {
  dateIso: string;
  cycleDay: number;
  level: FertilityLevel;
  label: string;
  subtitle: string;
};

export type TimelineItem = {
  label: string; // Yesterday / Today / Tomorrow
  date: Date;
  level: FertilityLevel;
};

type CycleContextValue = {
  // current cycle settings (goal, lengths, etc.)
  settings: CycleSettings;
  setSettings: (s: CycleSettings) => void;

  // cycle info helpers
  getDayInfo: (d: Date) => CycleDayInfo | undefined;
  getTodayStatus: (refDate?: Date) => TodayStatus;
  getTimeline: (refDate?: Date) => TimelineItem[];
  getMonthDays: (month: Date) => CycleDayInfo[];

  // logs
  dayLogs: Record<string, DayLog>;
  getDayLog: (d: Date) => DayLog | undefined;
  addPeriodLog: (d: Date, period: PeriodLog) => void;
  addSexLog: (d: Date, sex: SexLog) => void;
  addSymptomsLog: (d: Date, symptoms: SymptomLog) => void;

  // reset everything back to defaults
  resetAll: () => void;
};

const CycleContext = createContext<CycleContextValue | undefined>(undefined);

export const CycleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<CycleSettings>(initialSettings);

  // logs: date ISO -> DayLog
  const [dayLogs, setDayLogs] = useState<Record<string, DayLog>>({});

  // ======= cycle days computation =======

  // pre-compute days for a 3-month window around today
  const allDays = useMemo(() => {
    const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const end = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    return generateCycleDays(settings, start, end);
  }, [settings]);

  const dayMap = useMemo(() => {
    const m = new Map<string, CycleDayInfo>();
    allDays.forEach((d) => m.set(d.date, d));
    return m;
  }, [allDays]);

  function getDayInfo(date: Date): CycleDayInfo | undefined {
    return dayMap.get(toIso(date));
  }

  function getTodayStatus(refDate: Date = today): TodayStatus {
    const iso = toIso(refDate);
    const info = dayMap.get(iso) ?? { date: iso, type: "SAFE" as const };

    const lastStart = new Date(settings.lastPeriodStart);
    const diffMs = new Date(iso).getTime() - lastStart.getTime();
    const cycleDay = Math.floor(diffMs / (24 * 60 * 60 * 1000)) + 1;

    const level = fertilityLevelForType(info.type);
    let subtitle = "";

    if (info.type === "OVULATION") subtitle = "Ovulation day";
    else if (info.type === "FERTILE") subtitle = "High fertility window";
    else if (info.type === "PERIOD") subtitle = "Period day";
    else subtitle = "Low fertility day";

    return {
      dateIso: iso,
      cycleDay,
      level,
      label: statusLabelForType(info.type),
      subtitle,
    };
  }

  function getTimeline(refDate: Date = today): TimelineItem[] {
    const dates = [
      {
        label: "Yesterday",
        date: new Date(refDate.getTime() - 24 * 60 * 60 * 1000),
      },
      { label: "Today", date: refDate },
      {
        label: "Tomorrow",
        date: new Date(refDate.getTime() + 24 * 60 * 60 * 1000),
      },
    ];

    return dates.map((d) => {
      const info = getDayInfo(d.date);
      const level = info
        ? fertilityLevelForType(info.type)
        : ("LOW" as FertilityLevel);
      return { label: d.label, date: d.date, level };
    });
  }

  function getMonthDays(month: Date): CycleDayInfo[] {
    const year = month.getFullYear();
    const m = month.getMonth();
    return allDays.filter((d) => {
      const dd = new Date(d.date);
      return dd.getFullYear() === year && dd.getMonth() === m;
    });
  }

  // ======= logs helpers =======

  function upsertDayLog(
    dateIso: string,
    updater: (prev?: DayLog) => DayLog
  ): void {
    setDayLogs((prev) => {
      const existing = prev[dateIso];
      const next = updater(existing);
      return { ...prev, [dateIso]: next };
    });
  }

  function getDayLog(d: Date): DayLog | undefined {
    return dayLogs[toIso(d)];
  }

  function addPeriodLog(d: Date, period: PeriodLog): void {
    const iso = toIso(d);
    upsertDayLog(iso, (existing) => ({
      ...(existing ?? { date: iso }),
      period,
    }));
  }

  function addSexLog(d: Date, sex: SexLog): void {
    const iso = toIso(d);
    upsertDayLog(iso, (existing) => {
      const base = existing ?? { date: iso };
      return {
        ...base,
        sex: base.sex ? [...base.sex, sex] : [sex],
      };
    });
  }

  function addSymptomsLog(d: Date, symptoms: SymptomLog): void {
    const iso = toIso(d);
    upsertDayLog(iso, (existing) => ({
      ...(existing ?? { date: iso }),
      symptoms,
    }));
  }

  // ======= reset helper =======

  function resetAll() {
    setSettings(initialSettings);
    setDayLogs({});
  }

  const value: CycleContextValue = {
    settings,
    setSettings,
    getDayInfo,
    getTodayStatus,
    getTimeline,
    getMonthDays,

    dayLogs,
    getDayLog,
    addPeriodLog,
    addSexLog,
    addSymptomsLog,

    resetAll,
  };

  return (
    <CycleContext.Provider value={value}>{children}</CycleContext.Provider>
  );
};

export function useCycle(): CycleContextValue {
  const ctx = useContext(CycleContext);
  if (!ctx) {
    throw new Error("useCycle must be used inside <CycleProvider>");
  }
  return ctx;
}
