module.exports = {
  preset: "jest-expo",
  testMatch: ["**/__tests__/**/*.(test|spec).(ts|tsx|js)", "**/?(*.)+(test|spec).(ts|tsx|js)"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?/.*|expo-router|react-native-reanimated|react-native-gesture-handler|react-native-safe-area-context|react-native-screens|react-native-worklets)/",
  ],
};
