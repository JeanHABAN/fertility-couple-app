import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";
import type { FlowIntensity, PeriodLog } from "../../types/logs";

type Props = {
  visible: boolean;
  date: Date;
  onClose: () => void;
  onSave: (log: PeriodLog) => void;
};

const options: FlowIntensity[] = ["LIGHT", "MEDIUM", "HEAVY"];

export const LogPeriodModal: React.FC<Props> = ({
  visible,
  date,
  onClose,
  onSave,
}) => {
  const [selected, setSelected] = React.useState<FlowIntensity>("MEDIUM");

  const handleSave = () => {
    onSave({ intensity: selected });
  };

  const prettyDate = date.toLocaleDateString();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Log period</Text>
          <Text style={styles.subtitle}>{prettyDate}</Text>

          <View style={styles.row}>
            {options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={[
                  styles.chip,
                  selected === opt && styles.chipSelected,
                ]}
                onPress={() => setSelected(opt)}
              >
                <Text
                  style={[
                    styles.chipLabel,
                    selected === opt && styles.chipLabelSelected,
                  ]}
                >
                  {opt.toLowerCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancel} onPress={onClose}>
              <Text style={styles.cancelLabel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.save} onPress={handleSave}>
              <Text style={styles.saveLabel}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  row: {
    flexDirection: "row",
    marginTop: spacing.md,
    gap: spacing.sm,
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
  chipLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  chipLabelSelected: {
    color: colors.primaryDark,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    marginTop: spacing.lg,
  },
  cancel: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    marginRight: spacing.sm,
  },
  cancelLabel: {
    color: colors.textSecondary,
  },
  save: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primary,
    alignItems: "center",
    marginLeft: spacing.sm,
  },
  saveLabel: {
    color: "#FFF",
    fontWeight: "600",
  },
});
