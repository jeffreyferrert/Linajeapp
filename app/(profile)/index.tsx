import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const Profile = () => {
  return (
    <SafeAreaView className={'bg-gray-200 h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader noText={true} />

        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>Mi perfil</Text>
        </View>

        <CustomButton
          title={'Información Personal'}
          handlePress={() => router.push('/personal-info')}
          containerStyles={'mb-5 px-5 w-80 mx-auto'}
          textStyles={'text-black'}
          rightIcon={true}
        />

        <CustomButton
          title={'Términos y Condiciones'}
          handlePress={() => router.push('/terms-conditions')}
          containerStyles={'mb-5 px-5 w-80 mx-auto'}
          textStyles={'text-black'}
          rightIcon={true}
        />

        <CustomButton
          title={'Contáctanos'}
          handlePress={() => router.push('/contact-us')}
          containerStyles={'mb-5 px-5 w-80 mx-auto'}
          textStyles={'text-black'}
          rightIcon={true}
        />

        <CustomButton
          title={'Cerrar Sesión'}
          handlePress={() => router.push('./(auth)/sign-in')} // TODO: Implement logout
          containerStyles={'mt-20 px-5 w-80 mx-auto bg-primary'}
          textStyles={'text-white'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
