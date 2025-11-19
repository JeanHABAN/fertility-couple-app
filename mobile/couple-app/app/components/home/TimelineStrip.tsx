import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import { typography } from "../../../lib/theme/typography";
import type { FertilityLevel } from "../../types/cycle";

export type TimelinePoint = {
  label: string;         // "Yesterday", "Today", "Tomorrow"
  level: FertilityLevel; // LOW / MEDIUM / HIGH
};

type Props = {
  timeline: TimelinePoint[];
};

export const TimelineStrip: React.FC<Props> = ({ timeline }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>3-day overview</Text>
      <View style={styles.row}>
        {timeline.map((item) => (
          <View key={item.label} style={styles.col}>
            <Text style={styles.dayLabel}>{item.label}</Text>
            <View
              style={[
                styles.statusPill,
                { backgroundColor: getBg(item.level) },
              ]}
            >
              <Text style={styles.statusText}>{getText(item.level)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const getBg = (level: FertilityLevel) => {
  switch (level) {
    case "LOW":
      return "#E4F8EE";
    case "MEDIUM":
      return "#FFF3D6";
    case "HIGH":
      return "#FFE0EB";
    default:
      return colors.primaryLight;
  }
};

const getText = (level: FertilityLevel) => {
  switch (level) {
    case "LOW":
      return "Low";
    case "MEDIUM":
      return "Medium";
    case "HIGH":
      return "High";
    default:
      return "";
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.sectionTitle,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  col: {
    flex: 1,
    alignItems: "center",
  },
  dayLabel: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    fontSize: typography.caption,
    fontWeight: "600",
    color: colors.textMain,
  },
});
