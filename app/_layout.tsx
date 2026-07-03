import { useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors, fonts } from '../constants/theme';
import WelcomeOverlay from '../components/WelcomeOverlay';

export default function RootLayout() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <SafeAreaProvider>
      <StatusBar style={showWelcome ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontFamily: fonts.heading, fontWeight: 'bold' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
      {showWelcome && <WelcomeOverlay onDone={() => setShowWelcome(false)} />}
    </SafeAreaProvider>
  );
}
