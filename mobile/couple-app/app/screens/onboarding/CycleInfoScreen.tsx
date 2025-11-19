import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import { useCycle } from "../../../hooks/useCycle";

type NavProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  "CycleInfo"
>;

export const CycleInfoScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const { settings, setSettings } = useCycle();

  const [lastPeriod, setLastPeriod] = React.useState(settings.lastPeriodStart);
  const [cycleLength, setCycleLength] = React.useState(
    String(settings.cycleLength)
  );
  const [periodLength, setPeriodLength] = React.useState(
    String(settings.periodLength)
  );

  const handleNext = () => {
    setSettings({
      ...settings,
      lastPeriodStart: lastPeriod || settings.lastPeriodStart,
      cycleLength: Number(cycleLength) || settings.cycleLength,
      periodLength: Number(periodLength) || settings.periodLength,
    });
    navigation.navigate("Account");
  };

  return (
    <OnboardingLayout
      step={4}
      totalSteps={7}
      title="Tell us a bit about your cycle"
      subtitle="Even rough estimates help us calculate fertile days."
      onNext={handleNext}
      onBack={() => navigation.goBack()}
    >
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>First day of last period</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={lastPeriod}
            onChangeText={setLastPeriod}
            style={styles.input}
            placeholderTextColor="#B99FBA"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Average cycle length (days)</Text>
          <TextInput
            placeholder="e.g. 28"
            keyboardType="numeric"
            value={cycleLength}
            onChangeText={setCycleLength}
            style={styles.input}
            placeholderTextColor="#B99FBA"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Period length (days)</Text>
          <TextInput
            placeholder="e.g. 5"
            keyboardType="numeric"
            value={periodLength}
            onChangeText={setPeriodLength}
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
