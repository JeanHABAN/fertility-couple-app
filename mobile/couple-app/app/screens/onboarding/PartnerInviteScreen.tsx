import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

type NavProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  "PartnerInvite"
>;

export const PartnerInviteScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const [shareWithPartner] = React.useState(true); // later hook

  return (
    <OnboardingLayout
      step={6}
      totalSteps={7}
      title="Invite your partner?"
      subtitle="You can share fertile days, period info, and reminders with your partner."
      onNext={() => navigation.navigate("PartnerCode")}
      onBack={() => navigation.goBack()}
      nextLabel="Continue"
    >
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Share with partner</Text>
          <Switch value={shareWithPartner} onValueChange={() => {}} />
        </View>
        <Text style={styles.desc}>
          If enabled, we’ll generate a code your partner can use to link their
          app and view shared info.
        </Text>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0D9ED",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 15,
    color: colors.textMain,
  },
  desc: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
