import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";
import type { SexLog, ProtectionType } from "../../types/logs";

const PROTECTION_OPTIONS: ProtectionType[] = ["NONE", "CONDOM", "PILL", "OTHER"];
const TIME_OF_DAY_OPTIONS: SexLog["timeOfDay"][] = [
  "MORNING",
  "AFTERNOON",
  "EVENING",
  "NIGHT",
];

type Props = {
  visible: boolean;
  date: Date;
  onClose: () => void;
  onSave: (log: SexLog) => void;
};

export const LogSexModal: React.FC<Props> = ({
  visible,
  date,
  onClose,
  onSave,
}) => {
  const [protection, setProtection] = useState<ProtectionType>("NONE");
  const [timeOfDay, setTimeOfDay] =
    useState<SexLog["timeOfDay"]>("EVENING");

  const prettyDate = date.toLocaleDateString();

  function handleSave() {
    onSave({
      protection,
      timeOfDay,
    });
  }

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Log sex</Text>
          <Text style={styles.subtitle}>{prettyDate}</Text>

          <Text style={styles.sectionTitle}>Time of day</Text>
          <View style={styles.row}>
            {TIME_OF_DAY_OPTIONS.map((opt) => (
              <Chip
                key={opt}
                label={opt.toLowerCase()}
                selected={timeOfDay === opt}
                onPress={() => setTimeOfDay(opt)}
              />
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: spacing.md }]}>
            Protection
          </Text>
          <View style={styles.row}>
            {PROTECTION_OPTIONS.map((opt) => (
              <Chip
                key={opt}
                label={
                  opt === "NONE"
                    ? "None"
                    : opt === "CONDOM"
                    ? "Condom"
                    : opt === "PILL"
                    ? "Pill"
                    : "Other"
                }
                selected={protection === opt}
                onPress={() => setProtection(opt)}
              />
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const Chip: React.FC<ChipProps> = ({ label, selected, onPress }) => (
  <TouchableOpacity
    style={[styles.chip, selected && styles.chipSelected]}
    onPress={onPress}
  >
    <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textMain,
  },
  subtitle: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textSecondary,
  },
  sectionTitle: {
    marginTop: spacing.sm,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textMain,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.primaryDark,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    marginRight: spacing.sm,
  },
  cancelText: {
    color: colors.textSecondary,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    marginLeft: spacing.sm,
  },
  saveText: {
    color: "#FFF",
    fontWeight: "600",
  },
});
