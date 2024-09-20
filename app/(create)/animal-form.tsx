import { useEffect, useState } from 'react';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';
import CustomFormField from '@/components/CustomFormField';
import { AntDesign, Feather, Foundation } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import CustomSeparator from '@/components/CustomSeparator';
import CustomDatePicker from '@/components/CustomDatePicker';
import type { Brood } from '@/types/animalExtraTypes';
import { useAutoAPI } from '@/hooks/useAutoAPI';
import { animalInstance } from '@/api/loader';
import { AnimalPostOut } from '@/api/domain';

type AnimalFormProps = {
  brood: Brood;
  broodsIndex: number;
  handleBroodChange: (index: number, updatedBrood: Brood) => void;
  handleDelete: (animalIndex: number) => void;
};

const AnimalForm = ({
  brood,
  broodsIndex,
  handleBroodChange,
  handleDelete,
}: AnimalFormProps) => {
  const { loading, getAnimalByCode } = useAutoAPI(animalInstance);

  const handleLocalChange = <K extends keyof Brood>(
    field: K, // Aseguramos que field sea una clave válida de Brood
    value: Brood[K], // Aseguramos que value sea del tipo correcto para esa clave
    offspringIndex: number | null = null,
  ) => {
    let updatedBrood: Brood = { ...brood };

    if (offspringIndex !== null) {
      const updatedoffspring = [...brood.offsprings];
      updatedoffspring[offspringIndex] = {
        ...updatedoffspring[offspringIndex],
        [field]: value, // Aquí estamos asegurando que field sea una clave válida de Brood
      };
      updatedBrood.offsprings = updatedoffspring;
    } else {
      updatedBrood[field] = value; // Esto ya no causará error porque field y value están bien tipados
    }

    handleBroodChange(broodsIndex, updatedBrood);
  };

  const clear_blank_offsprings = () => {
    const updatedOffsprings = brood.offsprings.filter(
      (offspring) => offspring.code !== '' || offspring.sex !== '',
    );

    // Si se eliminan todos los offsprings, agregar uno vacío
    if (updatedOffsprings.length === 0) {
      updatedOffsprings.push({ code: '', sex: '' });
    }

    return updatedOffsprings;
  };

  const validateBrood = async (
    offspringsToValidate: typeof brood.offsprings,
  ) => {
    const validBirthdate = brood.birthdate !== '';
    const validOffsprings = offspringsToValidate.every(
      (offspring) => offspring.code !== '' && offspring.sex !== '',
    );
    return validBirthdate && validOffsprings;
  };

  const saveAnimalForm = async () => {
    let dbMotherData: AnimalPostOut | null = null;
    let dbFatherData: AnimalPostOut | null = null;
    if (brood.father_code !== '') {
      try {
        dbFatherData = await getAnimalByCode(brood.father_code);
      } catch (error) {
        Alert.alert('Error', 'La placa ' + brood.father_code + ' no existe');
        return;
      }
    }
    if (brood.mother_code !== '') {
      try {
        dbMotherData = await getAnimalByCode(brood.mother_code);
      } catch (error) {
        Alert.alert('Error', 'La placa ' + brood.mother_code + ' no existe');
        return;
      }
    }
    try {
      const cleanedOffsprings = clear_blank_offsprings();

      const validate = await validateBrood(cleanedOffsprings);

      if (!validate) {
        return Alert.alert('Error', 'Por favor, completa todos los campos');
      }

      const updatedBrood = {
        ...brood,
        mother_id: dbMotherData?.id,
        father_id: dbFatherData?.id,
        offsprings: cleanedOffsprings,
        isSaved: true,
      };

      handleBroodChange(broodsIndex, updatedBrood);
    } catch (error) {
      console.error('Error al guardar el animal:', error);
    }
  };

  const handleOffspringChange = (
    field: keyof Brood['offsprings'][0], // Limitado a 'code' y 'sex'
    value: Brood['offsprings'][0][typeof field],
    offspringIndex: number,
  ) => {
    let updatedBrood: Brood = { ...brood };
    const updatedoffspring = [...brood.offsprings];
    updatedoffspring[offspringIndex] = {
      ...updatedoffspring[offspringIndex],
      [field]: value,
    };
    updatedBrood.offsprings = updatedoffspring;
    handleBroodChange(broodsIndex, updatedBrood);
  };

  const deleteAnimalForm = () => {
    handleDelete(broodsIndex);
  };

  if (brood.isSaved) {
    return (
      <View className={'mx-4'}>
        <Pressable
          onPress={() =>
            handleBroodChange(broodsIndex, {
              ...brood,
              isSaved: false,
            })
          }
          className={'flex-row justify-end pb-3 pr-2 items-center'}
        >
          <Feather name="edit" size={20} color="blue" />
          <Text> Editar Animal</Text>
        </Pressable>

        <View className={'bg-white p-5 rounded-xl'}>
          <Text className={'text-lg font-bold'}>
            Detalles del Animal Nº{broodsIndex + 1}
          </Text>

          <CustomSeparator sx={'my-3'} />

          <View className={'flex-row justify-between'}>
            <Text className={'font-semibold'}>Placa Padre</Text>
            <Text>{brood.father_code || 'No asignado'}</Text>
          </View>

          <View className={'flex-row justify-between'}>
            <Text className={'font-semibold'}>Placa Madre</Text>
            <Text>{brood.mother_code || 'No asignado'}</Text>
          </View>

          <View className={'flex-row justify-between'}>
            <Text className={'font-semibold'}>Fecha de Nacimiento</Text>
            <Text>{brood.birthdate}</Text>
          </View>

          <View>
            <Text className={'font-semibold'}>Placas de los animales</Text>
            {brood.offsprings.map((animal, index) => (
              <View key={index} className={'flex-row justify-between'}>
                <Text>{animal.code}</Text>
                {/* Cambiar male y female por Hembra y Macho */}
                <Text>{animal.sex === 'male' ? 'Macho' : 'Hembra'}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={deleteAnimalForm} className={'mt-2'}>
            <Text style={{ color: 'red', textAlign: 'center' }}>
              Eliminar Animal
            </Text>
          </TouchableOpacity>
        </View>

        <CustomSeparator />
      </View>
    );
  }

  return (
    <View key={broodsIndex} className={''}>
      <View className={'flex flex-row  justify-between mx-3'}>
        <CustomFormField
          title={'Placa padre'}
          placeholder={'Placa padre'}
          value={brood.father_code}
          handleChange={(value) => handleLocalChange('father_code', value)}
          otherStyles={'w-36 bg-white'}
        />

        <CustomFormField
          title={'Placa madre'}
          placeholder={'Placa madre'}
          value={brood.mother_code}
          handleChange={(value) => handleLocalChange('mother_code', value)}
          otherStyles={'w-36 bg-white'}
        />
      </View>

      <View className={'pt-3 '}>
        <CustomDatePicker
          title="Nacimiento"
          handleChange={(value) => handleLocalChange('birthdate', value)}
          otherStyles={'w-80 bg-white'}
          value={brood.birthdate}
        />
      </View>

      <View className={'flex flex-col mx-auto'}>
        {brood.offsprings.map((offspring, offspringIndex) => (
          <PlaqueComponent
            key={offspringIndex}
            offspring={offspring}
            offspringIndex={offspringIndex}
            handleChangeValue={handleOffspringChange}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          handleBroodChange(broodsIndex, {
            ...brood,
            offsprings: [
              ...brood.offsprings,
              {
                code: '',
                sex: '',
              },
            ],
          });
        }}
        className={'flex flex-row my-3 px-6 items-center'}
      >
        <AntDesign name="pluscircleo" size={18} color="blue" />
        <Text className={'text-base font-montserrat'}>
          {' '}
          Agregar otro animal
        </Text>
      </TouchableOpacity>

      <CustomButton
        title={(loading && 'Guardando...') || 'Guardar'}
        handlePress={saveAnimalForm}
        containerStyles={'bg-primary w-80 mx-auto mt-3'}
        textStyles={'text-white'}
      />

      <CustomSeparator />
    </View>
  );
};

export default AnimalForm;

const PlaqueComponent = ({
  offspring,
  offspringIndex,
  handleChangeValue,
}: {
  offspring: Brood['offsprings'][0];
  offspringIndex: number;
  handleChangeValue: (
    field: keyof Brood['offsprings'][0],
    value: any,
    offspringIndex: number,
  ) => void;
}) => (
  <View className={'flex-row justify-between pt-3 items-center mx-auto'}>
    <CustomFormField
      title={'Nº de placa'}
      placeholder={'Nº de placa'}
      value={offspring.code}
      handleChange={(value) => handleChangeValue('code', value, offspringIndex)}
      otherStyles={'w-40 bg-white'}
    />

    <Pressable
      onPress={() => handleChangeValue('sex', 'male', offspringIndex)}
      className={`w-16 h-16 ${
        offspring.sex === 'male' ? 'bg-blue-200' : 'bg-white'
      } p-2 rounded-2xl justify-center items-center mx-3`}
    >
      <Foundation name="male-symbol" size={30} color="darkblue" />
    </Pressable>

    <Pressable
      onPress={() => handleChangeValue('sex', 'female', offspringIndex)}
      className={`w-16 h-16 ${
        offspring.sex === 'female' ? 'bg-red-200' : 'bg-white'
      } p-2 rounded-2xl justify-center items-center`}
    >
      <Foundation name="female-symbol" size={30} color="fuchsia" />
    </Pressable>
  </View>
);
