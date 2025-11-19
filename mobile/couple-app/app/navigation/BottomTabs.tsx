import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/main/HomeScreen";
import { CalendarScreen } from "../screens/main/CalendarScreen";
import { CoachScreen } from "../screens/main/CoachScreen";
import { CoupleScreen } from "../screens/main/CoupleScreen";
import { SettingsScreen } from "../screens/main/SettingsScreen";

export type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Coach: undefined;
  Couple: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#7B61FF",
        tabBarInactiveTintColor: "#888",
        tabBarIcon: ({ color, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") icon = "home";
          if (route.name === "Calendar") icon = "calendar";
          if (route.name === "Coach") icon = "chatbubbles";
          if (route.name === "Couple") icon = "heart";
          if (route.name === "Settings") icon = "settings";

          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Coach" component={CoachScreen} />
      <Tab.Screen name="Couple" component={CoupleScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
  
    </Tab.Navigator>
  );
};
