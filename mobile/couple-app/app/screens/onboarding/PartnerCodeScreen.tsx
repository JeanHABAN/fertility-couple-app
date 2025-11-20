// app/screens/onboarding/PartnerCodeScreen.tsx
import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";
import { useProfile } from "../../../hooks/useProfile";

export const PartnerCodeScreen: React.FC = () => {
  // use any here so we can call getParent().replace("MainTabs")
  const navigation = useNavigation<any>();
  const { profile, ensurePartnerCode } = useProfile();

  // Make sure we have a code generated
  useEffect(() => {
    ensurePartnerCode();
  }, [ensurePartnerCode]);

  const code = profile.partnerCode ?? "•••-•••";

  function handleFinish() {
    // Finish onboarding and go to main app
    navigation.getParent()?.replace("MainTabs");
  }

  return (
    <ScreenContainer>
      <View style={styles.root}>
        <Text style={styles.title}>Share this code with your partner</Text>
        <Text style={styles.subtitle}>
          They can enter it in their app to link accounts (in a future
          version). For now it’s just for you.
        </Text>

        <View style={styles.codeBadge}>
          <Text style={styles.codeText}>{code}</Text>
        </View>

        <Text style={styles.footer} onPress={handleFinish}>
          Done → Go to app
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textMain,
    textAlign: "center",
    marginBottom: spacing.md,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: spacing.xl,
  },
  codeBadge: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 999,
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.xl,
  },
  codeText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.primaryDark,
    letterSpacing: 2,
  },
  footer: {
    marginTop: spacing.lg,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
});

export default PartnerCodeScreen;
