import { Stack } from 'expo-router';
import { Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useSession } from '@/context/AuthProvider';

const ProfileLayout = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Stack>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
      <Stack.Screen name={'personal-info'} options={{ headerShown: false }} />
      <Stack.Screen
        name={'terms-conditions'}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'contact-us'} options={{ headerShown: false }} />
    </Stack>
  );
};

export default ProfileLayout;
