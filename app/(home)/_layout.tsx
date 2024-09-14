import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from '@/context/AuthProvider';

const HomeLayout = () => {
  const { session, isLoading } = useSession();
  console.log('HomeLayout', session, isLoading);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (!session) {
    console.log('Redirecting to sign-in');
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack>
  );
};

export default HomeLayout;
