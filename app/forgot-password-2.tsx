import CustomHeader from '@/components/CustomHeader';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import { useRef, useState } from 'react';
import CustomFormField from '@/components/CustomFormField';

const ForgotPassword2 = () => {
  const [resetPassword2, setResetPassword2] = useState(false);
  const [code, setCode] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const [form, setForm] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const submitForm = () => {
    router.push('../(home)');
  };

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      // @ts-ignore
      inputs.current[index + 1].focus();
    }
  };

  if (resetPassword2) {
    return (
      <SafeAreaView className={'bg-white h-full px-4 py-10'}>
        <ScrollView>
          <CustomHeader />
          <View className={'my-10'}>
            <Text className={'text-center font-semibold text-lg'}>
              Nueva contraseña
            </Text>
          </View>

          <CustomFormField
            title={'Contraseña'}
            placeholder={'Contraseña'}
            value={form.password}
            handleChange={(value) => setForm({ ...form, password: value })}
            otherStyles={'mt-5'}
            type={'password'}
          />

          <CustomFormField
            title={'Confirmar contraseña'}
            placeholder={'Confirmar contraseña'}
            value={form.passwordConfirmation}
            handleChange={(value) =>
              setForm({ ...form, passwordConfirmation: value })
            }
            otherStyles={'my-5'}
            type={'password'}
          />

          <CustomButton
            title={'Nueva Contraseña'}
            handlePress={submitForm}
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
            Ingrese el código de verificación
          </Text>
          <Text className={'text-center  text-base px-5 my-5'}>
            Ingrese el código que le hemos enviado a su correo electrónico
            samxxxxx@email.com
          </Text>

          {/*OTP CODE */}
          <View className={'flex flex-row justify-center my-5'}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                value={digit}
                onChangeText={(value) => handleChange(index, value)}
                maxLength={1}
                keyboardType={'numeric'}
                className={
                  'bg-secondary border w-14 h-14 text-center text-lg m-2 border-gray-500 rounded-xl focus:border-2 focus:border-primary'
                }
              />
            ))}
          </View>

          {/* SUBMIT BUTTON */}

          <CustomButton
            title={'Verificar'}
            handlePress={() => setResetPassword2(true)}
            containerStyles={'bg-primary w-80 mx-auto'} // TODO: Change bg-primary to bg-title based on fields population
            textStyles={'text-white'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword2;
