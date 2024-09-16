import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import DataProvider from '@/context/DataProvider';

const AnimalLayout = () => {
  return (
    <DataProvider>
      <Stack>
        <Stack.Screen name="[id]" options={{ headerShown: false }} />
      </Stack>
    </DataProvider>
  );
};

export default AnimalLayout;
