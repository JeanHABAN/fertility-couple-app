import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { useCycle } from "../../../hooks/useCycle";
import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";
import type { FertilityGoal } from "../../types/cycle";

const GOAL_OPTIONS: {
  value: FertilityGoal;
  label: string;
  description: string;
}[] = [
  {
    value: "AVOID_PREGNANCY",
    label: "Avoid pregnancy",
    description: "Use fertile window to reduce chances of pregnancy.",
  },
  {
    value: "TRY_TO_CONCEIVE",
    label: "Try to conceive",
    description: "Use fertile window to increase chances of pregnancy.",
  },
  {
    value: "TRACK_ONLY",
    label: "Just track cycle",
    description: "No specific goal, just understand your body better.",
  },
];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export const SettingsScreen: React.FC = () => {
  const { settings, setSettings } = useCycle();

  const handleChangeGoal = (goal: FertilityGoal) => {
    setSettings({
      ...settings,
      goal,
    });
  };

  const adjustCycleLength = (delta: number) => {
    const next = clamp(settings.cycleLength + delta, 15, 60); // typical range
    setSettings({
      ...settings,
      cycleLength: next,
    });
  };

  const adjustPeriodLength = (delta: number) => {
    const next = clamp(settings.periodLength + delta, 1, 15);
    setSettings({
      ...settings,
      periodLength: next,
    });
  };

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Adjust how the app tracks your fertility and what you’re aiming for.
        </Text>

        {/* Fertility Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fertility goal</Text>
          <Text style={styles.text}>
            This helps the app tailor messages and highlight the most important
            days for you and your partner.
          </Text>

          <View style={styles.goalList}>
            {GOAL_OPTIONS.map((opt) => {
              const selected = settings.goal === opt.value;
              return (
                <TouchableOpacity
                  key={opt.value}
                  style={[
                    styles.goalCard,
                    selected && styles.goalCardSelected,
                  ]}
                  onPress={() => handleChangeGoal(opt.value)}
                >
                  <Text
                    style={[
                      styles.goalLabel,
                      selected && styles.goalLabelSelected,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  <Text
                    style={[
                      styles.goalDescription,
                      selected && styles.goalDescriptionSelected,
                    ]}
                  >
                    {opt.description}
                  </Text>
                  {selected && (
                    <Text style={styles.currentTag}>Current goal</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Cycle numbers */}
        <View className="section">
          <Text style={styles.sectionTitle}>Cycle details</Text>
          <Text style={styles.text}>
            These values are used by the cycle engine to estimate period days,
            fertile window, and ovulation. You can adjust them if you know your
            typical pattern.
          </Text>

          {/* Cycle length row */}
          <View style={styles.numberRow}>
            <View style={styles.numberTextBlock}>
              <Text style={styles.numberLabel}>Cycle length</Text>
              <Text style={styles.numberHint}>
                Average days from period start to the next one.
              </Text>
            </View>
            <View style={styles.numberControls}>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => adjustCycleLength(-1)}
              >
                <Text style={styles.roundButtonLabel}>−</Text>
              </TouchableOpacity>
              <Text style={styles.numberValue}>
                {settings.cycleLength} d
              </Text>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => adjustCycleLength(1)}
              >
                <Text style={styles.roundButtonLabel}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Period length row */}
          <View style={styles.numberRow}>
            <View style={styles.numberTextBlock}>
              <Text style={styles.numberLabel}>Period length</Text>
              <Text style={styles.numberHint}>
                How many days your bleeding usually lasts.
              </Text>
            </View>
            <View style={styles.numberControls}>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => adjustPeriodLength(-1)}
              >
                <Text style={styles.roundButtonLabel}>−</Text>
              </TouchableOpacity>
              <Text style={styles.numberValue}>
                {settings.periodLength} d
              </Text>
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => adjustPeriodLength(1)}
              >
                <Text style={styles.roundButtonLabel}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Debug view of settings – keeps helping while building */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current settings (debug)</Text>
          <View style={styles.debugBox}>
            <Text style={styles.debugText}>
              {JSON.stringify(settings, null, 2)}
            </Text>
          </View>
          <Text style={styles.hint}>
            Later, we can add more controls here (luteal phase, notifications,
            partner preferences…) and hide this debug box in production.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  goalList: {
    marginTop: spacing.sm,
    gap: spacing.sm,
  },
  goalCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    backgroundColor: "#FFF",
  },
  goalCardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  goalLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 2,
  },
  goalLabelSelected: {
    color: colors.primaryDark,
  },
  goalDescription: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  goalDescriptionSelected: {
    color: colors.textMain,
  },
  currentTag: {
    marginTop: 6,
    alignSelf: "flex-start",
    fontSize: 11,
    fontWeight: "600",
    color: colors.primaryDark,
  },
  numberRow: {
    marginTop: spacing.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberTextBlock: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  numberLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMain,
  },
  numberHint: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  numberControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  roundButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  roundButtonLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textMain,
  },
  numberValue: {
    minWidth: 48,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: colors.textMain,
  },
  debugBox: {
    marginTop: spacing.sm,
    padding: spacing.sm,
    borderRadius: 10,
    backgroundColor: "#0B1020",
    borderWidth: 1,
    borderColor: "#31364A",
  },
  debugText: {
    fontSize: 11,
    color: "#E6ECFF",
    fontFamily: "monospace",
  },
  hint: {
    marginTop: spacing.sm,
    fontSize: 12,
    color: colors.textSecondary,
  },
});
