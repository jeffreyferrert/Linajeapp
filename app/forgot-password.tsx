import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, Text, View } from 'react-native';
import CustomFormField from '@/components/CustomFormField';
import { useState } from 'react';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
// @ts-ignore
import BuzonImage from '@/assets/images/buzon.png';

const ForgotPassword = () => {
  const [resetPassword2, setresetPassword2] = useState(false);
  const [form, setForm] = useState({
    email: '',
  });

  const submitForm = () => {
    setresetPassword2(true);
  };

  if (resetPassword2) {
    return (
      <SafeAreaView className={'bg-white h-full px-4 py-10'}>
        <ScrollView>
          <CustomHeader />

          <Image source={BuzonImage} className={'my-10 mx-auto w-32'} />

          <View className={''}>
            <Text className={'text-center font-semibold text-2xl'}>
              Verifica tu correo
            </Text>
          </View>

          <Text className={'text-center  text-base px-5 my-5'}>
            Llegara un código de verificación a tu correo electrónico para poder
            cambiar tu contraseña
          </Text>

          <CustomButton
            title={'Ingresar código'}
            handlePress={() => router.push('./forgot-password-2')}
            containerStyles={'bg-primary w-80 mx-auto'} // TODO: Change bg-primary to bg-title based on fields population
            textStyles={'text-white'}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className={'bg-white h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader />
        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>
            ¿Olvidaste tu contraseña?
          </Text>
        </View>

        <CustomFormField
          title={'Correo Electrónico'}
          placeholder={'Correo Electrónico'}
          value={form.email}
          handleChange={(value) => setForm({ ...form, email: value })}
          otherStyles={'mb-5'}
        />

        <CustomButton
          title={'Enviar'}
          handlePress={submitForm}
          containerStyles={'bg-primary w-80 mx-auto'} // TODO: Change bg-primary to bg-title based on fields population
          textStyles={'text-white'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
