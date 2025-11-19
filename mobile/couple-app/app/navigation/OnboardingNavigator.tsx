import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { WelcomeScreen } from "../screens/onboarding/WelcomeScreen";
import { RoleSelectScreen } from "../screens/onboarding/RoleSelectScreen";
import { GoalSelectScreen } from "../screens/onboarding/GoalSelectScreen";
import { CycleInfoScreen } from "../screens/onboarding/CycleInfoScreen";
import { AccountScreen } from "../screens/onboarding/AccountScreen";
import { PartnerInviteScreen } from "../screens/onboarding/PartnerInviteScreen";
import { PartnerCodeScreen } from "../screens/onboarding/PartnerCodeScreen";

export type OnboardingStackParamList = {
  Welcome: undefined;
  RoleSelect: undefined;
  GoalSelect: undefined;
  CycleInfo: undefined;
  Account: undefined;
  PartnerInvite: undefined;
  PartnerCode: undefined;
};

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="GoalSelect" component={GoalSelectScreen} />
      <Stack.Screen name="CycleInfo" component={CycleInfoScreen} />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="PartnerInvite" component={PartnerInviteScreen} />
      <Stack.Screen name="PartnerCode" component={PartnerCodeScreen} />
    </Stack.Navigator>
  );
};
