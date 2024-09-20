import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import { useAutoAPI } from '@/hooks/useAutoAPI';
import { userInstance } from '@/api/loader';
import { useEffect, useState } from 'react';
import type { User } from '@/api/domain';

const PersonalInformation = () => {
  const { loading, results, getCurrentUser } = useAutoAPI(userInstance);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser();
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (results?.getCurrentUser) {
    setUser(results.getCurrentUser);
  }
  return (
    <SafeAreaView className={'bg-gray-200 h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader noText={true} />

        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>
            Información Personal
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
