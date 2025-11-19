import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { OnboardingLayout } from "../../components/layout/OnboardingLayout";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

type NavProp = NativeStackNavigationProp<OnboardingStackParamList, "GoalSelect">;

export const GoalSelectScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();

  const goNext = () => navigation.navigate("CycleInfo");

  return (
    <OnboardingLayout
      step={3}
      totalSteps={7}
      title="What is your main goal?"
      subtitle="You can change this later in settings."
      onNext={goNext}
      onBack={() => navigation.goBack()}
    >
      <View style={styles.options}>
        <GoalCard
          emoji="🛡️"
          title="Avoid pregnancy"
          description="Understand fertile days to avoid unplanned pregnancy."
        />
        <GoalCard
          emoji="👶"
          title="Try to conceive"
          description="Time intercourse around ovulation to improve chances."
        />
        <GoalCard
          emoji="📊"
          title="Just track cycles"
          description="Learn your pattern without a specific goal yet."
        />
      </View>
    </OnboardingLayout>
  );
};

type GoalCardProps = {
  emoji: string;
  title: string;
  description: string;
};

const GoalCard: React.FC<GoalCardProps> = ({ emoji, title, description }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  options: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.md,
  },
  card: {
    borderRadius: 16,
    padding: spacing.md,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F0D9ED",
  },
  emoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textMain,
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
