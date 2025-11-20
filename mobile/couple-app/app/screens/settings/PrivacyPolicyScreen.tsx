import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

export const PrivacyPolicyScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.updated}>Last updated: March 2025</Text>

        <Section title="1. Overview">
          <Paragraph>
            This Privacy Policy explains how Fertility Couple handles your
            information. The app is designed with privacy first: all cycle and
            health data stays only on your device.
          </Paragraph>
        </Section>

        <Section title="2. Data we store">
          <Paragraph>
            The app stores information that you enter, such as:
          </Paragraph>
          <Bullet>cycle start dates and predicted cycle data;</Bullet>
          <Bullet>period, sex, and symptom logs;</Bullet>
          <Bullet>your chosen fertility goal and basic settings.</Bullet>
          <Paragraph>
            This information is saved locally on your device using on-device
            storage. It is not automatically uploaded to any external server
            controlled by the developer.
          </Paragraph>
        </Section>

        <Section title="3. No account, no server, no tracking">
          <Bullet>No account or login is required.</Bullet>
          <Bullet>The developer does not run a backend for this app.</Bullet>
          <Bullet>
            Your health data is not sent to or stored on a remote server.
          </Bullet>
          <Bullet>
            The app does not use advertising trackers or analytics that profile
            your behavior.
          </Bullet>
        </Section>

        <Section title="4. Permissions and local notifications">
          <Paragraph>
            The app may ask for permission to send notifications (for example,
            cycle reminders). These notifications are scheduled locally on your
            device. Notification schedules are not sent to any server.
          </Paragraph>
        </Section>

        <Section title="5. Third-party services">
          <Paragraph>
            The app is built using common mobile frameworks (for example React
            Native / Expo). These frameworks may collect basic technical
            information needed to operate the app store or deliver updates, but
            the developer does not receive identifiable health data through
            them.
          </Paragraph>
        </Section>

        <Section title="6. How you can control your data">
          <Bullet>
            You can delete logs and change settings directly in the app.
          </Bullet>
          <Bullet>
            You can use the “Reset to Default” option in Settings to clear local
            data stored by the app.
          </Bullet>
          <Bullet>
            You can uninstall the app at any time, which removes the data stored
            on your device.
          </Bullet>
        </Section>

        <Section title="7. Children and sensitive data">
          <Paragraph>
            This app handles sensitive health-related data. It is intended for
            individuals who are legally allowed to manage their own health data
            in their country or region.
          </Paragraph>
        </Section>

        <Section title="8. Changes to this policy">
          <Paragraph>
            This Privacy Policy may be updated in the future. If it changes, the
            updated version will be included in a new app release. Your
            continued use after changes means you accept the updated policy.
          </Paragraph>
        </Section>

        <Section title="9. Contact">
          <Paragraph>
            If you have questions about this Privacy Policy, please use the
            contact information provided in the app store listing or on the
            developer’s website.
          </Paragraph>
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
};

type SectionProps = { title: string; children: React.ReactNode };
const Section: React.FC<SectionProps> = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

type ParagraphProps = { children: React.ReactNode };
const Paragraph: React.FC<ParagraphProps> = ({ children }) => (
  <Text style={styles.paragraph}>{children}</Text>
);

type BulletProps = { children: React.ReactNode };
const Bullet: React.FC<BulletProps> = ({ children }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bulletDot}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textMain,
    marginBottom: spacing.xs,
  },
  updated: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textMain,
    marginBottom: spacing.xs,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  bulletDot: {
    fontSize: 14,
    marginRight: 6,
    color: colors.textSecondary,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
