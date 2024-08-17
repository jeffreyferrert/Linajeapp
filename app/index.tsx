import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView className={'bg-white h-full'}>
      <ScrollView>
        <View className={'w-full h-full px-4 justify-center items-center'}>
          <Text
            className={
              'text-center text-7xl text-primary font-montserrat mt-20'
            }
          >
            Linajeapp
          </Text>
          <Text className={'text-center text-xl mt-20 font-montserrat'}>
            Tradición Moderna
          </Text>
        </View>

        <CustomButton
          title={'Iniciar Sesion'}
          handlePress={() => router.push('/sign-in')}
          containerStyles={'w-80 mt-7 bg-primary mx-auto'}
          textStyles={'text-white'}
        />

        <CustomButton
          title="Regístrate"
          handlePress={() => router.push('/sign-up')}
          containerStyles="w-80 mt-7 bg-secondary mx-auto"
          textStyles=""
        />
      </ScrollView>
      <StatusBar style={'dark'} />
    </SafeAreaView>
  );
}
