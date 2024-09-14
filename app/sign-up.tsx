import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomFormField from '@/components/CustomFormField';
import CustomDatePicker from '@/components/CustomDatePicker';
import { authInstance } from '@/api/loader';
import { CountryCode } from 'libphonenumber-js';
import { useSession } from '@/context/AuthProvider';
import { Redirect } from 'expo-router';


const SignUp = () => {
  const { signIn, session } = useSession();
  const [form, setForm] = useState({
    names: '',
    lastNames: '',
    email: '',
    cellphone: '',
    birthdate: '',
    country: 'PE' as CountryCode,
    password: '',
  });
  const [loading, setLoading] = useState(false);
  if (session) {
    return <Redirect href="/(home)" />;
  }

  const submitForm = async () => {
    setLoading(true);
    // TODO: Hacer el username opcional
    try {
      const user = await authInstance.register({
        first_name: form.names,
        last_name: form.lastNames,
        username: form.names + form.lastNames,
        email: form.email,
        phone: form.cellphone,
        birthdate: form.birthdate,
        country: form.country,
        password: form.password,
      });
      console.log(user);
      await signIn({ email: form.email, password: form.password });
      console.log('Logged in');
      return <Redirect href="/(home)" />;
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
          title={'Contraseña'}
          placeholder={'Contraseña'}
          value={form.password}
          handleChange={(value) => setForm({ ...form, password: value })}
          otherStyles={'mt-5'}
          type={'password'}
        />

        <CustomFormField
          title={'Celular'}
          placeholder={'Celular'}
          value={form.cellphone}
          handleChange={(value) => setForm({ ...form, cellphone: value })}
          otherStyles={'mt-5'}
        />

        <CustomDatePicker
          title={'Fecha de Nacimiento'}
          value={form.birthdate}
          handleChange={(value) => setForm({ ...form, birthdate: value })}
          otherStyles={'mt-5 mb-5'}
        />
        {/* <CustomFormField
          title={'País'}
          placeholder={'País'}
          value={form.country}
          handleChange={(value) => setForm({ ...form, country: value })}
          otherStyles={'my-5'}
        /> */}

        {/* SUBMIT BUTTON */}

        <CustomButton
          title={loading ? 'Cargando...' : 'Ingresar'}
          handlePress={submitForm}
          containerStyles={'bg-primary w-80 mx-auto'} // TODO: Change bg-primary to bg-title based on fields population
          textStyles={'text-white'}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
