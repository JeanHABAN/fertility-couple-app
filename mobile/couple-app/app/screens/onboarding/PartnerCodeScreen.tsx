import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

type NavProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  "PartnerCode"
>;

export const PartnerCodeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  // later: real code from backend
  const fakeCode = "AB3-F7Q";

  const finish = () => {
  const parent = navigation.getParent();
  if (parent) {
    // TS doesn't know this is a stack, so we cast to any
    (parent as any).navigate("MainTabs");
  }
};

  return (
    <OnboardingLayout
      step={7}
      totalSteps={7}
      title="Share this code with your partner"
      subtitle="They can enter it in their app to link accounts."
      onNext={finish}
      onBack={() => navigation.goBack()}
      nextLabel="Finish setup"
    >
      <View style={styles.center}>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{fakeCode}</Text>
        </View>
        <Text style={styles.desc}>
          This is just a preview. Later we’ll generate a real secure code from
          the backend and let partners join.
        </Text>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  codeBox: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 999,
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.md,
  },
  codeText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primaryDark,
    letterSpacing: 2,
  },
  desc: {
    textAlign: "center",
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
