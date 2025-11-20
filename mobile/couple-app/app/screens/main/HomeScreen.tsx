import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";

import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { TodayStatusCard } from "../../components/home/TodayStatusCard";
import { QuickActionsRow } from "../../components/home/QuickActionsRow";
import { TimelineStrip } from "../../components/home/TimelineStrip";

import { spacing } from "../../../lib/theme/spacing";
import { colors } from "../../../lib/theme/colors";
import { useCycle } from "../../../hooks/useCycle";

import { LogPeriodModal } from "../../components/modals/LogPeriodModal";
import { LogSexModal } from "../../components/modals/LogSexModal";
import { LogSymptomsModal } from "../../components/modals/LogSymptomsModal";
import { useProfile } from "../../../hooks/useProfile"; 

export const HomeScreen: React.FC = () => {
  const {
    getTodayStatus,
    getTimeline,
    addPeriodLog,
    addSexLog,
    addSymptomsLog,
  } = useCycle();

  const { profile } = useProfile();
  const userName = profile.name || "Friend";
  const today = new Date();

  const todayStatus = getTodayStatus();
  const timeline = getTimeline();

  const [showPeriodModal, setShowPeriodModal] = useState(false);
  const [showSexModal, setShowSexModal] = useState(false);
  const [showSymptomsModal, setShowSymptomsModal] = useState(false);

  return (
    <ScreenContainer>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>Hi, {userName} 💗</Text>
            <Text style={styles.subGreeting}>
              Let’s check today’s fertility
            </Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>J</Text>
          </View>
        </View>

        {/* Today status */}
        <TodayStatusCard
          cycleDay={todayStatus.cycleDay}
          statusLabel={todayStatus.label}
          level={todayStatus.level}
          subtitle={todayStatus.subtitle}
        />

        {/* Quick actions */}
        <View style={styles.section}>
          <QuickActionsRow
            onLogPeriod={() => setShowPeriodModal(true)}
            onLogSex={() => setShowSexModal(true)}
            onLogSymptoms={() => setShowSymptomsModal(true)}
            onAskCoach={() => console.log("Ask coach")}
          />
        </View>

        {/* 3-day timeline */}
        <View style={styles.section}>
          <TimelineStrip
            timeline={timeline.map((item) => ({
              label: item.label,
              level: item.level,
            }))}
          />
        </View>

        {/* Tip of the day */}
        <View style={styles.section}>
          <Text style={styles.tipTitle}>Tip of the day</Text>
          <Text style={styles.tipText}>
            If you want to avoid pregnancy, be extra careful on high-fertility
            days. If you’re trying to conceive, these are your best chances.
          </Text>
        </View>
      </ScrollView>

      {/* Period log modal */}
      <LogPeriodModal
        visible={showPeriodModal}
        date={today}
        onClose={() => setShowPeriodModal(false)}
        onSave={(log) => {
          addPeriodLog(today, log);
          setShowPeriodModal(false);
        }}
      />

      {/* Sex log modal */}
      <LogSexModal
        visible={showSexModal}
        date={today}
        onClose={() => setShowSexModal(false)}
        onSave={(log) => {
          addSexLog(today, log);
          setShowSexModal(false);
        }}
      />

      {/* Symptoms log modal */}
      <LogSymptomsModal
        visible={showSymptomsModal}
        date={today}
        onClose={() => setShowSymptomsModal(false)}
        onSave={(log) => {
          addSymptomsLog(today, log);
          setShowSymptomsModal(false);
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textMain,
  },
  subGreeting: {
    marginTop: 2,
    fontSize: 13,
    color: colors.textSecondary,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  section: {
    marginTop: spacing.md,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});
