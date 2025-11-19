import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { CycleCalendar } from "../../components/calendar/CycleCalendar";
import { DayDotLegend } from "../../components/calendar/DayDotLegend";
import { DayDetailSheet } from "../../components/calendar/DayDetailSheet";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import type { CycleDayInfo } from "../../types/cycle";

const today = new Date();

export const CalendarScreen: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

  // 👉 TEMP: mock data. Later we'll get this from useCycle().
  const cycleDays: CycleDayInfo[] = useMemo(
    () => [
      // Example: period days
      { date: "2025-02-01", type: "PERIOD" },
      { date: "2025-02-02", type: "PERIOD" },
      { date: "2025-02-03", type: "PERIOD" },
      { date: "2025-02-04", type: "PERIOD" },

      // fertile window
      { date: "2025-02-10", type: "FERTILE" },
      { date: "2025-02-11", type: "FERTILE" },
      { date: "2025-02-12", type: "FERTILE" },
      { date: "2025-02-13", type: "OVULATION", note: "Predicted ovulation" },
      { date: "2025-02-14", type: "FERTILE" },
    ],
    []
  );

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const next = new Date(prev);
      if (direction === "prev") {
        next.setMonth(prev.getMonth() - 1);
      } else {
        next.setMonth(prev.getMonth() + 1);
      }
      return next;
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Cycle Calendar</Text>
        <Text style={styles.subtitle}>Tap a day for more details</Text>
      </View>

      <CycleCalendar
        month={currentMonth}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onChangeMonth={handleMonthChange}
        cycleDays={cycleDays}
      />

      <View style={styles.legendWrapper}>
        <DayDotLegend />
      </View>

      <DayDetailSheet
        selectedDate={selectedDate}
        cycleDays={cycleDays}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textMain,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textSecondary,
  },
  legendWrapper: {
    marginTop: spacing.md,
  },
});
