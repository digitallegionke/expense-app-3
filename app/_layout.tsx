import { useEffect, useState } from 'react';
import { View, LogBox } from 'react-native';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { useFonts as useChivoMono, ChivoMono_400Regular, ChivoMono_500Medium, ChivoMono_600SemiBold } from '@expo-google-fonts/chivo-mono';
import { useFonts as useNunito, Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { colors } from '../constants/theme';
import { useStore } from '../stores/useStore';
import { supabase } from '../lib/supabase';

// Suppress network error logs when Supabase is unreachable
LogBox.ignoreLogs(['Network request failed', 'AuthRetryableFetchError']);

export default function RootLayout() {
  const [chivoLoaded] = useChivoMono({
    ChivoMono_400Regular,
    ChivoMono_500Medium,
    ChivoMono_600SemiBold,
  });
  const [nunitoLoaded] = useNunito({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_700Bold,
  });
  const fontsLoaded = chivoLoaded && nunitoLoaded;

  const [isReady, setIsReady] = useState(false);
  const initialize = useStore((state) => state.initialize);
  const isInitialized = useStore((state) => state.isInitialized);

  useEffect(() => {
    async function prepare() {
      try {
        await initialize();
      } catch (error) {
        console.warn('Initialization completed with warnings (offline mode)');
      } finally {
        setIsReady(true);
      }
    }
    prepare();

    try {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        try {
          if (event === 'SIGNED_IN' && session) {
            await initialize();
          } else if (event === 'SIGNED_OUT') {
            const state = useStore.getState();
            if (state.user.isAuthenticated) {
              state.logout();
            }
          }
        } catch (error) {
          console.warn('Auth state change handled in offline mode');
        }
      });

      return () => {
        authListener?.subscription.unsubscribe();
      };
    } catch (error) {
      console.warn('Auth listener not available (offline mode)');
      return () => {};
    }
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
