import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '@/components/CustomHeader';
import { useAutoAPI } from '@/hooks/useAutoAPI';
import { userInstance } from '@/api/loader';
import { useEffect, useState } from 'react';
import type { User } from '@/api/domain';
import CustomFormField from '@/components/CustomFormField'; // Asegúrate de que el path sea correcto
import CustomSeparator from '@/components/CustomSeparator';

const PersonalInformation = () => {
  const { loading, results, getCurrentUser } = useAutoAPI(userInstance);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]); // Agregar dependencia para evitar loop infinito

  useEffect(() => {
    if (results?.getCurrentUser) {
      console.log(results.getCurrentUser);
      setUser(results.getCurrentUser);
    }
  }, [results]);

  if (loading || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className={'bg-gray-200 h-full px-4 py-10'}>
      <ScrollView>
        <CustomHeader noText={true} />

        <View className={'my-10'}>
          <Text className={'text-center font-semibold text-lg'}>
            Información Personal
          </Text>
        </View>

        {/* Información Personal */}
        <CustomFormField
          title="Nombres"
          placeholder="Nombre"
          value={user.first_name}
          handleChange={() => {}}
          readOnly={true}
          otherStyles="mb-5"
        />

        <CustomFormField
          title="Apellidos"
          placeholder="Apellido"
          value={user.last_name}
          handleChange={() => {}}
          readOnly={true}
          otherStyles="mb-5"
        />

        <CustomFormField
          title="Correo electrónico"
          placeholder="Correo electrónico"
          value={user.email}
          handleChange={() => {}}
          readOnly={true}
          type="email"
          otherStyles="mb-5"
        />

        <CustomFormField
          title="Celular"
          placeholder="Celular"
          value={user.phone}
          handleChange={() => {}}
          readOnly={true}
          otherStyles="mb-5"
        />

        <CustomFormField
          title="Fecha de nacimiento"
          placeholder="Fecha de nacimiento"
          value={user.birthdate}
          handleChange={() => {}}
          readOnly={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformation;
