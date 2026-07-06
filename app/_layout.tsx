import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { useFonts } from 'expo-font';
import { colors } from '../constants/theme';
import { useStore } from '../stores/useStore';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Geist-Regular': require('../assets/fonts/Geist-Regular.ttf'),
    'Geist-Medium': require('../assets/fonts/Geist-Medium.ttf'),
    'Geist-SemiBold': require('../assets/fonts/Geist-SemiBold.ttf'),
    'Geist-Bold': require('../assets/fonts/Geist-Bold.ttf'),
    'GeistMono-Regular': require('../assets/fonts/GeistMono-Regular.ttf'),
    'GeistMono-Medium': require('../assets/fonts/GeistMono-Medium.ttf'),
    'GeistMono-SemiBold': require('../assets/fonts/GeistMono-SemiBold.ttf'),
  });

  const [isReady, setIsReady] = useState(false);
  const initialize = useStore((state) => state.initialize);
  const isInitialized = useStore((state) => state.isInitialized);

  useEffect(() => {
    async function prepare() {
      try {
        await initialize();
      } catch (error) {
        console.warn('Initialization failed', error);
      } finally {
        setIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!fontsLoaded || !isReady || !isInitialized) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
        <Toasts />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
