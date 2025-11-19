import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { colors } from "../../../lib/theme/colors";

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, "Welcome">;

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <OnboardingLayout
      step={1}
      totalSteps={7}
      title="Welcome to the Fertility Couple App"
      subtitle="Track cycles together, avoid surprise pregnancies, or plan for a baby with confidence."
      onNext={() => navigation.navigate("RoleSelect")}
      nextLabel="Let's start"
    >
      <View style={styles.centerBox}>
        <Text style={styles.bigEmoji}>💗</Text>
        <Text style={styles.description}>
          This app is designed for couples to understand fertility days,
          ovulation, and period patterns in a simple, respectful way.
        </Text>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  bigEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
});
