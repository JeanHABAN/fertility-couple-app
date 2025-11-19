import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

export const DayDotLegend: React.FC = () => {
  const items = [
    { label: "Period", color: colors.primaryDark },
    { label: "Fertile", color: colors.accentMint },
    { label: "Ovulation", color: colors.accentPurple },
  ];

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={[styles.dot, { backgroundColor: item.color }]} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: spacing.md,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  label: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
