import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { useCoach } from "../../../hooks/useCoach";
import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";

function goalLabel(goal: string): string {
  if (goal === "AVOID_PREGNANCY") return "Avoid pregnancy";
  if (goal === "TRY_TO_CONCEIVE") return "Try to conceive";
  return "Track cycle";
}

export const CoachScreen: React.FC = () => {
  const { todayMessages, todayStatus, goal } = useCoach();

  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Fertility Coach</Text>
        <Text style={styles.subtitle}>
          Today: Day {todayStatus.cycleDay} – {todayStatus.label}
        </Text>
        <Text style={styles.goalLine}>
          Goal: {goalLabel(goal)}
        </Text>

        {todayMessages.map((m) => (
          <View key={m.id} style={styles.bubble}>
            <Text style={styles.bubbleText}>{m.text}</Text>
          </View>
        ))}

        {todayMessages.length === 0 && (
          <Text style={styles.empty}>
            No special advice for today. Keep tracking your cycle and logs.
          </Text>
        )}
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
  },
  goalLine: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bubble: {
    backgroundColor: colors.cardBg,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  bubbleText: {
    fontSize: 14,
    color: colors.textMain,
  },
  empty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
