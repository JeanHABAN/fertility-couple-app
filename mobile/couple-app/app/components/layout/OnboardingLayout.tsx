import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ScreenContainer } from "./ScreenContainer";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

type Props = {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onNext?: () => void;
  onBack?: () => void;
  nextLabel?: string;
};

export const OnboardingLayout: React.FC<Props> = ({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onNext,
  onBack,
  nextLabel = "Next",
}) => {
  const progress = step / totalSteps;

  return (
    <ScreenContainer>
      {/* Progress bar */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>

      <View style={styles.header}>
        <Text style={styles.stepText}>
          Step {step} of {totalSteps}
        </Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.content}>{children}</View>

      <View style={styles.footer}>
        {onBack ? (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backLabel}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 1 }} />
        )}

        {onNext ? (
          <TouchableOpacity style={styles.nextButton} onPress={onNext}>
            <Text style={styles.nextLabel}>{nextLabel}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    flexDirection: "row",
    height: 6,
    borderRadius: 999,
    backgroundColor: "#F3DFED",
    overflow: "hidden",
    marginBottom: spacing.lg,
  },
  progressBarFill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
  },
  header: {
    marginBottom: spacing.md,
  },
  stepText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textMain,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },
  content: {
    flex: 1,
    paddingTop: spacing.md,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  backButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: spacing.sm,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  backLabel: {
    color: colors.textSecondary,
    fontWeight: "500",
  },
  nextButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: spacing.sm,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  nextLabel: {
    color: "#FFF",
    fontWeight: "600",
  },
});
