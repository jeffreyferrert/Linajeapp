import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useSession } from '@/context/AuthProvider';

import { Redirect, Slot } from 'expo-router';
import { SessionProvider } from '@/context/AuthProvider';

import { Text } from 'react-native';
// SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded) return null;

  return (
    <SessionProvider>
      <AppContent />
    </SessionProvider>
  );
};

export default RootLayout;

const AppContent = () => {
  const { isLoading, session } = useSession();

  console.log('AppContent', isLoading);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  return <Slot />;
};
