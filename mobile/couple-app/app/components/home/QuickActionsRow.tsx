import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import { typography } from "../../../lib/theme/typography";

type Props = {
  onLogPeriod: () => void;
  onLogSex: () => void;
  onLogSymptoms: () => void;
  onAskCoach: () => void;
};

export const QuickActionsRow: React.FC<Props> = ({
  onLogPeriod,
  onLogSex,
  onLogSymptoms,
  onAskCoach,
}) => {
  return (
    <View style={styles.card}>
      <Action
        icon="water"
        label="Log period"
        onPress={onLogPeriod}
        color={colors.primary}
      />

      <Action
        icon="heart"
        label="Log sex"
        onPress={onLogSex}
        color={colors.accentPurple}
      />

      <Action
        icon="medkit"
        label="Symptoms"
        onPress={onLogSymptoms}
        color={colors.accentMint}
      />

      <Action
        icon="chatbubbles"
        label="Ask coach"
        onPress={onAskCoach}
        color={colors.primaryDark}
      />
    </View>
  );
};

type ActionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
};

const Action: React.FC<ActionProps> = ({ icon, label, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={[styles.iconWrapper, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    flex: 1,
    alignItems: "center",
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },

  label: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
