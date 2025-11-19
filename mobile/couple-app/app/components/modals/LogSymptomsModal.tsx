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
import type { SymptomLog } from "../../types/logs";

const SYMPTOMS = [
  "Cramps",
  "Breast tenderness",
  "Headache",
  "Mood swings",
  "Bloating",
  "Fatigue",
];

type Props = {
  visible: boolean;
  date: Date;
  onClose: () => void;
  onSave: (log: SymptomLog) => void;
};

export const LogSymptomsModal: React.FC<Props> = ({
  visible,
  date,
  onClose,
  onSave,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  function toggle(symptom: string) {
    setSelected((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  }

  function handleSave() {
    onSave({ symptoms: selected });
  }

  const prettyDate = date.toLocaleDateString();

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Log symptoms</Text>
          <Text style={styles.subtitle}>{prettyDate}</Text>

          <View style={styles.options}>
            {SYMPTOMS.map((s) => (
              <TouchableOpacity
                key={s}
                style={[
                  styles.option,
                  selected.includes(s) && styles.optionSelected,
                ]}
                onPress={() => toggle(s)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selected.includes(s) && styles.optionTextSelected,
                  ]}
                >
                  {s}
                </Text>
              </TouchableOpacity>
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
  options: {
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  optionSelected: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  optionTextSelected: {
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
