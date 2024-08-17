import { Stack } from 'expo-router';

const ProfileLayout = () => {
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
