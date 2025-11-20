import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { useCycle } from "../../../hooks/useCycle";
import { useProfile } from "../../../hooks/useProfile";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import type { CycleSettings, FertilityGoal } from "../../../app/types/cycle";

const GOAL_OPTIONS: {
  value: FertilityGoal;
  label: string;
  note: string;
}[] = [
  {
    value: "AVOID_PREGNANCY",
    label: "Avoid pregnancy",
    note: "Use fertile days as a warning zone.",
  },
  {
    value: "TRY_TO_CONCEIVE",
    label: "Trying to conceive",
    note: "Highlight your most fertile days.",
  },
  {
    value: "TRACK_ONLY",
    label: "Just tracking",
    note: "Learn your cycle patterns over time.",
  },
];

export const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { settings, setSettings, resetAll } = useCycle();
  const { profile } = useProfile(); // 👈 only read profile, no setName/setEmail

  function handleReset() {
    Alert.alert(
      "Reset all data?",
      "This will erase logs, cycle settings, and restore defaults.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => resetAll(),
        },
      ]
    );
  }

  function handleGoalChange(goal: CycleSettings["goal"]) {
    if (goal === settings.goal) return;
    setSettings({
      ...settings,
      goal,
    });
  }

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Summary section */}
        <View style={styles.section}>
          <Text style={styles.title}>Your Settings</Text>

          {/* Optional: show profile info */}
          {profile.name ? (
            <>
              <Text style={styles.label}>Name</Text>
              <Text style={styles.value}>{profile.name}</Text>
            </>
          ) : null}
          {profile.email ? (
            <>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{profile.email}</Text>
            </>
          ) : null}

          <Text style={styles.label}>Goal</Text>
          <Text style={styles.value}>{readableGoal(settings.goal)}</Text>

          <Text style={styles.label}>Cycle length</Text>
          <Text style={styles.value}>{settings.cycleLength} days</Text>

          <Text style={styles.label}>Period length</Text>
          <Text style={styles.value}>{settings.periodLength} days</Text>

          <Text style={styles.label}>Luteal phase</Text>
          <Text style={styles.value}>{settings.lutealPhaseLength} days</Text>
        </View>

        {/* Editable goal chips */}
        <View style={[styles.section, styles.goalSection]}>
          <Text style={styles.subTitle}>Edit your goal</Text>
          <Text style={styles.helperText}>
            This helps the app decide how to highlight fertile days.
          </Text>

          {GOAL_OPTIONS.map((opt) => (
            <GoalChip
              key={opt.value}
              label={opt.label}
              note={opt.note}
              active={settings.goal === opt.value}
              onPress={() => handleGoalChange(opt.value)}
            />
          ))}
        </View>

        {/* Legal / Info */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Legal & About</Text>

          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => navigation.navigate("PrivacyPolicy" as never)}
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>

        {/* Reset button */}
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetText}>Reset to Default</Text>
        </TouchableOpacity>

        <View style={{ height: spacing.lg }} />
      </ScrollView>
    </ScreenContainer>
  );
};

// helper to show nicer goal text
function readableGoal(goal: CycleSettings["goal"]): string {
  switch (goal) {
    case "AVOID_PREGNANCY":
      return "Avoid pregnancy";
    case "TRY_TO_CONCEIVE":
      return "Trying to conceive";
    case "TRACK_ONLY":
    default:
      return "Just tracking";
  }
}

type GoalChipProps = {
  label: string;
  note: string;
  active: boolean;
  onPress: () => void;
};

const GoalChip: React.FC<GoalChipProps> = ({ label, note, active, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
    >
      <Text style={[styles.chipLabel, active && styles.chipLabelActive]}>
        {label}
      </Text>
      <Text style={[styles.chipNote, active && styles.chipNoteActive]}>
        {note}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  section: {
    marginTop: spacing.lg,
  },
  goalSection: {
    marginTop: spacing.xl,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: spacing.md,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: spacing.xs,
  },
  helperText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  label: {
    marginTop: spacing.sm,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },
  value: {
    fontSize: 16,
    color: colors.textMain,
    marginBottom: spacing.xs,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    backgroundColor: "white",
    marginTop: spacing.sm,
  },
  chipActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  chipLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 2,
  },
  chipLabelActive: {
    color: colors.primaryDark,
  },
  chipNote: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipNoteActive: {
    color: colors.primaryDark,
  },
  resetBtn: {
    marginTop: spacing.xl,
    padding: 16,
    backgroundColor: "#ff4444",
    borderRadius: 12,
    alignItems: "center",
  },
  resetText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkItem: {
    paddingVertical: 10,
  },
  linkText: {
    fontSize: 15,
    color: colors.primary,
  },
});

export default SettingsScreen;
