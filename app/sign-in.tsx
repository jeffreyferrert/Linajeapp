import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View, Text, Alert } from 'react-native';
import CustomHeader from '@/components/CustomHeader';
import { Link, Redirect, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomFormField from '@/components/CustomFormField';
import { authInstance } from '@/api/loader'; // Importa el AppLoader
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useSession } from '@/context/AuthProvider';

const SignIn = () => {
  const { session, signIn } = useSession();
  const navigation = useNavigation();

  useEffect(() => {
    // Desactivar gestos de retroceso
    navigation.setOptions({
      gestureEnabled: false,
    });
  }, [navigation]);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false); // Para manejar el estado de carga

  if (session) {
    return <Redirect href="/(home)" />;
  }

  const submitForm = async () => {
    setLoading(true);
    try {
      await signIn(form);
      router.push('../(home)');
    } catch (error) {
      Alert.alert(
        'Error',
        'Error al iniciar sesión. Verifica tus credenciales.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className={'bg-white h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader arrow_redirec_to={'/'} />

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

        <Link href={'/forgot-password'} className={'my-5'}>
          <Text className={'text-center font-semibold text-base'}>
            ¿Has olvidado tu contraseña?
          </Text>
        </Link>

        {/* BOTÓN DE SUBMIT */}
        <CustomButton
          title={loading ? 'Cargando...' : 'Ingresar'}
          handlePress={submitForm}
          containerStyles={'bg-primary w-80 mx-auto'}
          textStyles={'text-white'}
          disabled={loading} // Deshabilitar el botón mientras carga
        />

        <View className={'flex flex-row justify-center my-5'}>
          <Text className={'text-center text-base '}>¿No tienes cuenta? </Text>
          <Link href={'/sign-up'}>
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
