import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, "RoleSelect">;

export const RoleSelectScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const goNext = () => {
    navigation.navigate("GoalSelect");
  };

  return (
    <OnboardingLayout
      step={2}
      totalSteps={7}
      title="Who is using the app?"
      subtitle="We’ll slightly personalize the experience based on your role."
      onNext={goNext}
      onBack={() => navigation.goBack()}
    >
      <View style={styles.options}>
        <RoleCard label="Woman tracking her cycle" emoji="🌸" />
        <RoleCard label="Partner supporting" emoji="🤍" />
        <RoleCard label="We use it together" emoji="🫶" />
      </View>
    </OnboardingLayout>
  );
};

type RoleCardProps = {
  label: string;
  emoji: string;
};

const RoleCard: React.FC<RoleCardProps> = ({ label, emoji }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  options: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.md,
  },
  card: {
    borderRadius: 16,
    padding: spacing.md,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0D9ED",
  },
  emoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  label: {
    fontSize: 14,
    color: colors.textMain,
  },
});
