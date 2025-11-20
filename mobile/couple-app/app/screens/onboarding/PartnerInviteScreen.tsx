// app/screens/onboarding/PartnerInviteScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";
import { useProfile } from "../../../hooks/useProfile";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";

type NavProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  "PartnerInvite"
>;

export const PartnerInviteScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { profile, updateProfile } = useProfile();

  const [enabled, setEnabled] = useState<boolean>(
    profile.shareWithPartner ?? false
  );

  function toggle(value: boolean) {
    setEnabled(value);
    // save preference in profile (and AsyncStorage)
    updateProfile({ shareWithPartner: value });
  }

  function handleNext() {
    if (enabled) {
      // go to code screen (step 7)
      navigation.navigate("PartnerCode");
    } else {
      
      // skip code and go straight to the main app (root stack "MainTabs")
    const rootNav = navigation.getParent();
    rootNav?.navigate("MainTabs" as never);
      // If you DO have a "FinishOnboarding" stack screen, use:
      // navigation.navigate("FinishOnboarding");
    }
  }

  return (
    <OnboardingLayout
      step={6}
      totalSteps={7}
      title="Invite your partner?"
      subtitle="You can share fertile days, period info, and reminders with your partner."
      onBack={() => navigation.goBack()}
      onNext={handleNext}
    >
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Share with partner</Text>
            <Text style={styles.helper}>
              If enabled, we’ll generate a code your partner can use to link
              with your app.
            </Text>
          </View>
          <Switch value={enabled} onValueChange={toggle} />
        </View>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: spacing.lg,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0D9ED",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 4,
  },
  helper: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});

export default PartnerInviteScreen;
