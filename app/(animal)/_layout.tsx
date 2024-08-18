import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const AnimalLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="[id]" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AnimalLayout;
