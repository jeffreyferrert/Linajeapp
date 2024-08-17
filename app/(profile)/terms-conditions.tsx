import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';

const TermsAndConditions = () => {
  return (
    <SafeAreaView className={'bg-gray-200 h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader noText={true} />

        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>
            Términos y Condiciones
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;
