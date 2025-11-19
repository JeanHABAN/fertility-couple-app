import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import type { CycleDayInfo } from "../../types/cycle";
import type { DayLog } from "../../types/logs";
import { statusLabelForType } from "../../../lib/cycle/cycleEngine";
import { useCycle } from "../../../hooks/useCycle";

type Props = {
  selectedDate: Date | null;
  cycleDays: CycleDayInfo[];
};

export const DayDetailSheet: React.FC<Props> = ({
  selectedDate,
  cycleDays,
}) => {
  const { getDayLog } = useCycle();

  const info = useMemo(() => {
    if (!selectedDate) return null;
    const iso = selectedDate.toISOString().slice(0, 10);
    return cycleDays.find((d) => d.date === iso) ?? null;
  }, [selectedDate, cycleDays]);

  const log: DayLog | undefined = useMemo(() => {
    if (!selectedDate) return undefined;
    return getDayLog(selectedDate);
  }, [selectedDate, getDayLog]);

  if (!selectedDate) return null;

  const formattedDate = selectedDate.toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <View style={styles.sheet}>
      <Text style={styles.date}>{formattedDate}</Text>

      {info ? (
        <>
          <Text style={styles.status}>
            {statusLabelForType(info.type)}
          </Text>
          {info.note && <Text style={styles.note}>{info.note}</Text>}
        </>
      ) : (
        <Text style={styles.note}>
          No specific cycle event for this day.
        </Text>
      )}

      {/* Logs */}
      <View style={styles.logsBlock}>
        <Text style={styles.logsTitle}>Your logs</Text>

        {!log && (
          <Text style={styles.noLogs}>No logs yet for this day.</Text>
        )}

        {log?.period && (
          <Text style={styles.logLine}>
            • Period: {log.period.intensity.toLowerCase()} flow
          </Text>
        )}

        {log?.sex && log.sex.length > 0 && (
          <Text style={styles.logLine}>
            • Sex: {log.sex.length} time(s)
            {log.sex.some((s) => s.protection === "NONE")
              ? " (unprotected present)"
              : ""}
          </Text>
        )}

        {log?.symptoms && log.symptoms.symptoms.length > 0 && (
          <Text style={styles.logLine}>
            • Symptoms: {log.symptoms.symptoms.join(", ")}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0D9ED",
  },
  date: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 2,
  },
  status: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primaryDark,
    marginBottom: 2,
  },
  note: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  logsBlock: {
    marginTop: spacing.sm,
  },
  logsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 2,
  },
  logLine: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  noLogs: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});