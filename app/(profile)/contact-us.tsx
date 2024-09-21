import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import CustomFormField from '@/components/CustomFormField';

const ContactUs = () => {
  return (
    <SafeAreaView className={'bg-gray-200 h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader noText={true} />

        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>
            Contáctamos
          </Text>
        </View>

        <CustomFormField
          title="Correo electrónico"
          placeholder="Correo electrónico"
          value="sebastian@linageapp.com"
          handleChange={() => {}}
          readOnly={true}
          otherStyles="mb-5"
        />

        <CustomFormField
          title="Celular"
          placeholder="+51 994 077 282"
          value="+51 994 077 282"
          handleChange={() => {}}
          readOnly={true}
          otherStyles="mb-5"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;
