import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, "Account">;

export const AccountScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <OnboardingLayout
      step={5}
      totalSteps={7}
      title="Create your profile"
      subtitle="This helps save your data across devices later."
      onNext={() => navigation.navigate("PartnerInvite")}
      onBack={() => navigation.goBack()}
    >
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Your name</Text>
          <TextInput
            placeholder="First name"
            style={styles.input}
            placeholderTextColor="#B99FBA"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email (optional)</Text>
          <TextInput
            placeholder="email@example.com"
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor="#B99FBA"
          />
        </View>
      </View>
    </OnboardingLayout>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  field: {},
  label: {
    fontSize: 14,
    color: colors.textMain,
    marginBottom: 4,
  },
  input: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#F0D9ED",
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    color: colors.textMain,
  },
});
