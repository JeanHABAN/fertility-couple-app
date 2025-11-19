import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "./navigation/RootNavigator";
import { CycleProvider } from "../hooks/useCycle";

export default function App() {
  return (
    <CycleProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </CycleProvider>
  );
}
