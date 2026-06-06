import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { Platform } from 'react-native';

if (Platform.OS !== 'web') {
  SplashScreen.setOptions({
    duration: 250,
    fade: true,
  });

  SplashScreen.preventAutoHideAsync().catch(() => {});
}

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerShown: false,
      }}
    />
  );
}
