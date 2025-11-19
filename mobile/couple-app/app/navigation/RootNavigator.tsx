import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabs } from "./BottomTabs";
import { OnboardingNavigator } from "./OnboardingNavigator";

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
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
    </Stack.Navigator>
  );
};
