import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { usePartner } from "../../../hooks/usePartner";
import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";

export const CoupleScreen: React.FC = () => {
  const { myCode, status, partnerCode, markLinked, unlink } = usePartner();
  const [input, setInput] = useState("");

  function handleConnect() {
    if (!input.trim()) return;
    markLinked(input.trim().toUpperCase());
    setInput("");
  }

  return (
    <ScreenContainer>
      <View style={styles.section}>
        <Text style={styles.title}>Share with your partner</Text>
        <Text style={styles.text}>
          Your partner can enter this code in their app to link accounts.
        </Text>

        <View style={styles.codeBox}>
          <Text style={styles.code}>{myCode}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Enter partner’s code</Text>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          autoCapitalize="characters"
          placeholder="ABC123"
        />
        <TouchableOpacity style={styles.button} onPress={handleConnect}>
          <Text style={styles.buttonLabel}>Link partner</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Status</Text>
        <Text style={styles.text}>
          {status === "UNLINKED" && "Not linked yet."}
          {status === "LINKED" &&
            `Linked with partner code ${partnerCode ?? ""}.`}
        </Text>

        {status === "LINKED" && (
          <TouchableOpacity style={styles.unlinkBtn} onPress={unlink}>
            <Text style={styles.unlinkLabel}>Unlink</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  codeBox: {
    marginTop: spacing.sm,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.cardBg,
    alignItems: "center",
  },
  code: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 4,
    color: colors.primaryDark,
  },
  input: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonLabel: {
    color: "#FFF",
    fontWeight: "600",
  },
  unlinkBtn: {
    marginTop: spacing.sm,
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: "flex-start",
  },
  unlinkLabel: {
    color: colors.textSecondary,
  },
});
