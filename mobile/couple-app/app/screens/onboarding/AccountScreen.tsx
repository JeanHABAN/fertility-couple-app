// app/screens/onboarding/AccountScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";
import { useProfile } from "../../../hooks/useProfile";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, "Account">;

export const AccountScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { profile, updateProfile } = useProfile();

  const [name, setName] = useState<string>(profile.name ?? "");
  const [email, setEmail] = useState<string>(profile.email ?? "");

  function handleNext() {
    updateProfile({
      name: name.trim(),
      email: email.trim() || undefined,
    });

    navigation.navigate("PartnerInvite");
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={{ padding: spacing.lg }}>
          <Text style={styles.title}>Create your profile</Text>

          <Text style={styles.label}>Your name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="First name"
            style={styles.input}
          />

          <Text style={styles.label}>Email (optional)</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            style={styles.input}
            keyboardType="email-address"
          />

          <Text style={styles.helper}>
            We only store this locally on your device. No account is created.
          </Text>

          <View style={{ height: spacing.lg }} />

          <Text style={styles.next} onPress={handleNext}>
            Next →
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    marginTop: spacing.md,
    marginBottom: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E4D3EB",
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    backgroundColor: "white",
  },
  helper: {
    marginTop: spacing.md,
    fontSize: 12,
    color: colors.textSecondary,
  },
  next: {
    marginTop: spacing.lg,
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
});

export default AccountScreen;
