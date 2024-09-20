import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/context/AuthProvider';
import DataProvider from '@/context/DataProvider';

const HomeLayout = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <DataProvider>
      <Stack>
        <Stack.Screen
          name={'index'}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack>
    </DataProvider>
  );
};

export default HomeLayout;
