import AsyncStorage from "@react-native-async-storage/async-storage";
import type { CycleSettings } from "../../app/types/cycle";
import type { DayLog } from "../../app/types/logs";

const SETTINGS_KEY = "cycle_settings_v1";
const LOGS_KEY = "cycle_day_logs_v1";

/* ------------ SETTINGS -------------- */

export async function loadSettings(): Promise<CycleSettings | null> {
  try {
    const raw = await AsyncStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Failed loading settings", e);
    return null;
  }
}

export async function saveSettings(settings: CycleSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error("Failed saving settings", e);
  }
}

/* ------------ LOGS -------------- */

export async function loadDayLogs(): Promise<Record<string, DayLog>> {
  try {
    const raw = await AsyncStorage.getItem(LOGS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed loading logs", e);
    return {};
  }
}

export async function saveDayLogs(logs: Record<string, DayLog>): Promise<void> {
  try {
    await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error("Failed saving logs", e);
  }
}

/* ------------ RESET -------------- */

export async function clearAllStorage() {
  try {
    await AsyncStorage.multiRemove([SETTINGS_KEY, LOGS_KEY]);
  } catch (e) {
    console.error("Failed clearing storage", e);
  }
}
