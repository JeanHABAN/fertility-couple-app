import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import { typography } from "../../../lib/theme/typography";
import type { FertilityLevel } from "../../types/cycle";



type Props = {
  cycleDay: number;
  statusLabel: string;   // e.g. "High fertility"
  level: FertilityLevel; // LOW / MEDIUM / HIGH
  subtitle: string;      // e.g. "Ovulation expected in 2 days"
};

export const TodayStatusCard: React.FC<Props> = ({
  cycleDay,
  statusLabel,
  level,
  subtitle,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today</Text>
      <Text style={styles.subtitle}>Cycle day {cycleDay}</Text>

      {/* Big ring with fertility state */}
      <View style={[styles.circleOuter, { borderColor: getRingColor(level) }]}>
        <View style={styles.circleInner}>
          <Text style={styles.statusLabel}>{statusLabel}</Text>
        </View>
      </View>

      <Text style={styles.bottomText}>{subtitle}</Text>
    </View>
  );
};

const getRingColor = (level: FertilityLevel) => {
  switch (level) {
    case "LOW":
      return colors.accentMint;
    case "MEDIUM":
      return "#FFC85A"; // warm yellow
    case "HIGH":
      return colors.primaryDark;
    default:
      return colors.primary;
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: spacing.lg,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 3,
  },
  title: {
    fontSize: typography.sectionTitle,
    fontWeight: "700",
    color: colors.textMain,
  },
  subtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  circleOuter: {
    marginTop: spacing.lg,
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 6,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLight,
  },
  circleInner: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.sm,
  },
  statusLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryDark,
    textAlign: "center",
  },
  bottomText: {
    marginTop: spacing.lg,
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
