import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { ScreenContainer } from "../../components/layout/ScreenContainer";
import { colors } from "../../../lib/theme/colors";
import { spacing } from "../../../lib/theme/spacing";

export const TermsOfServiceScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.updated}>Last updated: March 2025</Text>

        {/* 1. Intro */}
        <Section title="1. About this app">
          <Paragraph>
            Fertility Couple is a personal cycle and fertility tracking app
            designed to help individuals and couples better understand their
            menstrual cycles and fertile windows.
          </Paragraph>
          <Paragraph>
            By using this app, you agree to these Terms of Service. If you do
            not agree, please stop using the app and uninstall it from your
            device.
          </Paragraph>
        </Section>

        {/* 2. Not medical advice */}
        <Section title="2. Not medical advice">
          <Paragraph>
            This app is provided for general informational and educational
            purposes only. It does not provide medical advice, diagnosis, or
            treatment and must not be used as a substitute for professional
            medical care.
          </Paragraph>
          <Paragraph>
            Always consult a qualified healthcare professional regarding any
            questions you have about your health, fertility, contraception, or
            pregnancy. Never ignore or delay seeking professional medical advice
            because of information shown in this app.
          </Paragraph>
        </Section>

        {/* 3. No guarantees */}
        <Section title="3. No guarantees of accuracy or outcomes">
          <Paragraph>
            Calculations such as predicted fertile windows, ovulation days, and
            cycle statistics are based on data you enter and simplified models.
            Cycles can change for many reasons, and predictions may be wrong or
            incomplete.
          </Paragraph>
          <Paragraph>
            This app cannot guarantee that you will become pregnant, or that you
            will avoid pregnancy, or that any particular cycle prediction is
            correct.
          </Paragraph>
        </Section>

        {/* 4. Local-only data */}
        <Section title="4. Local data only">
          <Paragraph>
            This app is designed to store all cycle, symptom, and log data only
            on your device. The developer does not run any external server for
            this app and does not receive, collect, or store your health data.
          </Paragraph>
          <Paragraph>
            If you uninstall the app, reset your settings, or lose your device,
            your data may be permanently lost. You are responsible for any
            optional backups you create (for example, exporting data to files you
            store yourself).
          </Paragraph>
        </Section>

        {/* 5. Your responsibilities */}
        <Section title="5. Your responsibilities">
          <Paragraph>By using this app, you agree that you:</Paragraph>
          <Bullet>use the app at your own risk;</Bullet>
          <Bullet>
            will not rely on the app as your only method of contraception or
            fertility planning;
          </Bullet>
          <Bullet>
            are responsible for keeping your device secure (screen lock, etc.);
          </Bullet>
          <Bullet>
            will follow the laws and regulations of your country when using this
            app.
          </Bullet>
        </Section>

        {/* 6. Age */}
        <Section title="6. Age requirements">
          <Paragraph>
            This app is intended for users who are legally allowed to track and
            manage their own health information in their country or region. If
            you are under the applicable age or not legally able to consent to
            health tracking, you should only use this app with the guidance and
            supervision of a parent, guardian, or healthcare professional.
          </Paragraph>
        </Section>

        {/* 7. Changes */}
        <Section title="7. Changes to the app or these terms">
          <Paragraph>
            The app may be updated from time to time to fix bugs, improve
            features, or change how predictions work. These Terms of Service may
            also be updated. Continued use of the app after changes means you
            accept the updated terms.
          </Paragraph>
        </Section>

        {/* 8. Disclaimer & Liability */}
        <Section title="8. Disclaimer of warranties & limitation of liability">
          <Paragraph>
            The app is provided on an “as-is” and “as-available” basis, without
            any warranties of any kind, express or implied. To the maximum
            extent permitted by law, the developer is not responsible for any
            loss, damage, or consequences arising from your use of, or inability
            to use, this app.
          </Paragraph>
        </Section>

        {/* 9. Contact */}
        <Section title="9. Contact">
          <Paragraph>
            If you have questions about these terms, you can contact the
            developer using the contact details listed in the app store listing
            or on the project’s website.
          </Paragraph>
        </Section>
      </ScrollView>
    </ScreenContainer>
  );
};

// Reusable helpers
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
