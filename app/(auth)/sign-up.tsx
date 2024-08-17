import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomFormField from '@/components/CustomFormField';

const SignUp = () => {
  const [form, setForm] = useState({
    names: '',
    lastNames: '',
    email: '',
    cellphone: '',
    birthdate: '',
    country: '',
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
            Registrate
          </Text>
        </View>

        {/* FIELDS */}

        <CustomFormField
          title={'Nombres'}
          placeholder={'Nombres'}
          value={form.names}
          handleChange={(value) => setForm({ ...form, names: value })}
        />

        <CustomFormField
          title={'Apellidos'}
          placeholder={'Apellidos'}
          value={form.lastNames}
          handleChange={(value) => setForm({ ...form, lastNames: value })}
          otherStyles={'mt-5'}
        />

        <CustomFormField
          title={'Correo Electrónico'}
          placeholder={'Correo Electrónico'}
          value={form.email}
          handleChange={(value) => setForm({ ...form, email: value })}
          otherStyles={'mt-5'}
        />

        <CustomFormField
          title={'Celular'}
          placeholder={'Celular'}
          value={form.cellphone}
          handleChange={(value) => setForm({ ...form, cellphone: value })}
          otherStyles={'mt-5'}
        />

        <CustomFormField
          title={'Fecha de Nacimiento'}
          placeholder={'Fecha de Nacimiento'}
          value={form.birthdate}
          handleChange={(value) => setForm({ ...form, birthdate: value })}
          otherStyles={'mt-5'}
        />

        <CustomFormField
          title={'País'}
          placeholder={'País'}
          value={form.country}
          handleChange={(value) => setForm({ ...form, country: value })}
          otherStyles={'my-5'}
        />

        {/* SUBMIT BUTTON */}

        <CustomButton
          title={'Ingresar'}
          handlePress={submitForm}
          containerStyles={'bg-primary w-80 mx-auto'} // TODO: Change bg-primary to bg-title based on fields population
          textStyles={'text-white'}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
