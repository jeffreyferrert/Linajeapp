import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import CustomProgressBar from '@/components/CustomProgressBar';
import { useState } from 'react';
import CustomFormField from '@/components/CustomFormField';
import { AntDesign, Foundation } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import CustomSeparator from '@/components/CustomSeparator';
import AnimalForm from '@/app/(create)/animal-form';

type RegisterAnimalProps = {
  data: any;
  setData: (value: any) => void;
};

const RegisterAnimal = ({ data, setData }: RegisterAnimalProps) => {
  const handleChangeValue = (
    formIndex: number,
    animalIndex: number,
    field: string,
    value: any,
  ) => {
    const newData = [...data];
    newData[formIndex].animals[animalIndex][field] = value;
    setData(newData);
  };

  const addPlaque = (formIndex: number) => {
    setData((currentForm: any[]) => {
      const newAnimals = [
        ...currentForm[formIndex].animals,
        { plaque: '', sex: '', linaje: {}, status: '' },
      ];
      const newData = [...currentForm];
      newData[formIndex].animals = newAnimals;
      return newData;
    });
  };

  const addForm = () => {
    setData((currentForm: any[]) => [
      ...currentForm,
      {
        father: '',
        mother: '',
        birthDate: '',
        animals: [{ plaque: '', sex: '', linaje: {}, status: '' }],
      },
    ]);
  };

  console.log(JSON.stringify(data));

  return (
    <View className={'mb-16'}>
      <View className={'my-5 px-6'}>
        <CustomProgressBar stage={1} />
        <Text className={'font-semibold text-2xl'}>
          Registra el perfil del animal
        </Text>
        <Text className={'text-base py-1'}>
          Sube datos, fotos y videos para que toda comunidad lo pueda ver.
        </Text>
      </View>

      {data.map((form, formIndex) => (
        <AnimalForm
          key={formIndex}
          form={form}
          formIndex={formIndex}
          handleChangeValue={handleChangeValue}
          addPlaque={addPlaque}
          data={data}
          setData={setData}
        />
      ))}

      <TouchableOpacity
        onPress={addForm}
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
          {' '}
          Agregar otro cruce o camada
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterAnimal;
