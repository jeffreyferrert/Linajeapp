import { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomProgressBar from '@/components/CustomProgressBar';
import { AntDesign } from '@expo/vector-icons';
import AnimalForm from '@/app/(create)/animal-form';
import type { Brood } from '@/types/animalExtraTypes';

const blankBrood: Brood = {
  father_code: '',
  mother_code: '',
  birthdate: '',
  offsprings: [
    {
      code: '',
      sex: '',
    },
  ],
  lineages: [
    {
      id: 0,
      name: '',
      animal_type: 1,
      created_at: '',
      updated_at: '',
      owner_id: 0,
      percentage: 0,
    },
  ],
  isSaved: false,
};

type RegisterBroodsProps = {
  broods: Brood[];
  setBroods: (value: Brood[]) => void;
  enableButton: boolean;
  setEnableButton: (value: boolean) => void;
};

const RegisterBroods = ({
  broods,
  setBroods,
  enableButton,
  setEnableButton,
}: RegisterBroodsProps) => {
  const handleBroodChange = (index: number, updatedBrood: Brood) => {
    const updatedBroods = [...broods];
    updatedBroods[index] = updatedBrood;
    setBroods(updatedBroods);
  };

  const handleDelete = (broodIndex: number) => {
    const updatedBroods = broods.filter((_, index) => index !== broodIndex);
    if (updatedBroods.length === 0) {
      updatedBroods.push(blankBrood);
    }
    setBroods(updatedBroods);
  };

  const addAnimalForm = () => {
    setBroods([...broods, blankBrood]);
  };

  const verifyBlankBrood = (broods: Brood[]) => {
    const isFirstBroodInvalid = () => {
      const { father_code, mother_code, birthdate, offsprings, isSaved } =
        broods[0];

      const isFirstBroodEmpty =
        !father_code &&
        !mother_code &&
        !birthdate &&
        offsprings.every((offspring) => !offspring.code && !offspring.sex);

      return isFirstBroodEmpty || !isSaved;
    };

    const hasIncompleteBrood = broods.slice(1).some((brood) => {
      const { father_code, mother_code, birthdate, offsprings, isSaved } =
        brood;

      const isBroodEmpty =
        !father_code &&
        !mother_code &&
        !birthdate &&
        offsprings.every((offspring) => !offspring.code && !offspring.sex);

      if (isBroodEmpty) {
        return false;
      }

      return !isSaved;
    });

    const shouldEnableButton = !isFirstBroodInvalid() && !hasIncompleteBrood;
    setEnableButton(shouldEnableButton);
  };

  useEffect(() => {
    verifyBlankBrood(broods);
  }, [broods]);

  return (
    <View className={'mb-16'}>
      <View className={'my-5 px-6'}>
        <CustomProgressBar stage={1} />
        <Text className={'font-semibold text-2xl'}>
          Registra el perfil del animal
        </Text>
        <Text className={'text-base py-1 text-gray-500'}>
          Agrega tus mascotas para registrarlos en la plataforma.
        </Text>
      </View>

      {broods.map((brood, index) => (
        <AnimalForm
          key={index}
          broodsIndex={index}
          brood={brood}
          handleBroodChange={handleBroodChange}
          handleDelete={() => handleDelete(index)}
        />
      ))}

      <TouchableOpacity
        onPress={addAnimalForm}
        className={'w-80 p-16 justify-center items-center mx-auto'}
        style={{
          borderWidth: 2,
          borderColor: '#ccc',
          borderStyle: 'dashed',
          borderRadius: 1,
          backgroundColor: '#f0f0f0',
        }}
      >
        <AntDesign name="pluscircleo" size={20} color="blue" />
        <Text className={'text-base font-montserrat text-center mt-2'}>
          Agregar otro animal
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterBroods;
