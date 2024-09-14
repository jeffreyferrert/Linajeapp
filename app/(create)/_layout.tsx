import { Stack } from 'expo-router';
import { Text } from 'react-native';
import { Redirect } from 'expo-router';
import { useSession } from '@/context/AuthProvider';

const CreateLayout = () => {

  return (
    <Stack>
      <Stack.Screen name={'index'} options={{ headerShown: false }} />
    </Stack>
  );
};

export default CreateLayout;
