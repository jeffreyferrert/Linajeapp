import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomFormField from '@/components/CustomFormField';
import { useState } from 'react';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submitForm = () => {
    router.push('../(home)');
    console.log('Submit form');
  };

  return (
    <SafeAreaView className={'bg-white h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader />

        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>
            Iniciar Sesión
          </Text>
        </View>

        <CustomFormField
          title={'Correo Electrónico'}
          placeholder={'Correo Electrónico'}
          value={form.email}
          handleChange={(value) => setForm({ ...form, email: value })}
        />

        <CustomFormField
          title={'Contraseña'}
          placeholder={'Contraseña'}
          value={form.password}
          handleChange={(value) => setForm({ ...form, password: value })}
          otherStyles={'mt-5'}
          type={'password'}
        />

        <Link href={'/(auth)/forgot-password'} className={'my-5'}>
          <Link
            href={'/(auth)/forgot-password'}
            className={'text-center font-semibold text-base'}
          >
            ¿Has olvidado tu contraseña?
          </Link>
        </Link>

        {/* SUBMIT BUTTON */}

        <CustomButton
          title={'Ingresar'}
          handlePress={submitForm}
          containerStyles={'bg-primary w-80 mx-auto'} // TODO: Change bg-primary to bg-title based on fields population
          textStyles={'text-white'}
        />

        <View className={'flex flex-row justify-center my-5'}>
          <Text className={'text-center text-base '}>¿No tienes cuenta? </Text>
          <Link href={'/(auth)/sign-up'}>
            <Text className={'text-center font-semibold text-base underline'}>
              Regístrate
            </Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
