import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

type Props = {
  children: React.ReactNode;
};

export const ScreenContainer: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.inner}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg, // or whatever your main background is
  },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md, // keeps a nice gap under the notch
  },
});
