import CustomHeader from '@/components/CustomHeader';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Create = () => {
  return (
    <SafeAreaView className={'bg-white h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader />

        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>
            Registra el perfil del animal
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
