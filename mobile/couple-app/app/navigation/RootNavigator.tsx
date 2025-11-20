import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "./BottomTabs";
import { OnboardingNavigator } from "./OnboardingNavigator";
import { PrivacyPolicyScreen } from "../screens/settings/PrivacyPolicyScreen";
import { TermsOfServiceScreen } from "../screens/terms/TermsOfServiceScreen";

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  PrivacyPolicy: undefined;
  TermsOfService: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const hasCompletedOnboarding = false; // later from storage

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={hasCompletedOnboarding ? "MainTabs" : "Onboarding"}
    >
      <Stack.Screen name="Onboarding" component={OnboardingNavigator} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />
       <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{ title: "Privacy Policy", headerShown: true }}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={{ title: "Terms of Service", headerShown: true }}
      />
    </Stack.Navigator>
  );
};
