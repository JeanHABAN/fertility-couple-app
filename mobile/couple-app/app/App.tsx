import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigation/RootNavigator";
import { CycleProvider } from "../hooks/useCycle";
import { ProfileProvider } from "@/hooks/useProfile";

export default function App() {
  return (
     <NavigationContainer>
      <ProfileProvider>
        <CycleProvider>
          <RootNavigator />
        </CycleProvider>
      </ProfileProvider>
    </NavigationContainer>
  );
}
