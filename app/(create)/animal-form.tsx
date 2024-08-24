import { useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomFormField from '@/components/CustomFormField';
import { AntDesign, Feather, Foundation } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import CustomSeparator from '@/components/CustomSeparator';

type AnimalFormProps = {
  form: any;
  formIndex: number;
  handleSave: (updatedForm: any) => void;
};

const AnimalForm = ({ form, formIndex, handleSave }: AnimalFormProps) => {
  const [localForm, setLocalForm] = useState(form);

  const handleLocalChange = (field, value, animalIndex = null) => {
    if (animalIndex !== null) {
      const updatedAnimals = [...localForm.animals];
      updatedAnimals[animalIndex] = {
        ...updatedAnimals[animalIndex],
        [field]: value,
      };
      setLocalForm((prev) => ({
        ...prev,
        animals: updatedAnimals,
      }));
    } else {
      setLocalForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const saveForm = () => {
    const updatedForm = { ...localForm, isSaved: true };
    setLocalForm(updatedForm);
    handleSave(updatedForm);
  };

  if (localForm.isSaved) {
    return (
      <View className="summary-section">
        <Pressable
          onPress={() => setLocalForm((prev) => ({ ...prev, isSaved: false }))}
          className={'flex-row justify-end pb-3 pr-2'}
        >
          <Feather name="edit" size={20} color="blue" />
          <Text> Editar Camada</Text>
        </Pressable>

        <View className={'bg-white p-5 rounded-xl'}>
          <Text className={'text-lg font-bold'}>
            Detalles de la camada Nº{formIndex + 1}
          </Text>

          <CustomSeparator sx={'my-3'} />

          <View className={'flex-row justify-between'}>
            <Text className={'font-semibold'}>Nª de placa Padre</Text>
            <Text>{localForm.father}</Text>
          </View>

          <View className={'flex-row justify-between'}>
            <Text className={'font-semibold'}>Nª de placa Madre</Text>
            <Text>{localForm.mother}</Text>
          </View>

          <View className={'flex-row justify-between'}>
            <Text className={'font-semibold'}>Edad</Text>
            <Text>{localForm.birthDate}</Text>
          </View>

          <View>
            <Text className={'font-semibold'}>Placa de la camada</Text>
            {localForm.animals.map((animal, index) => (
              <View key={index} className={'flex-row justify-between'}>
                <Text>{animal.plaque}</Text>
                <Text>{animal.sex}</Text>
              </View>
            ))}
          </View>
        </View>

        <CustomSeparator />
      </View>
    );
  }

  return (
    <View key={formIndex} className={''}>
      <View className={'flex flex-row'}>
        <CustomFormField
          title={'Placa padre'}
          placeholder={'Placa padre'}
          value={localForm.father}
          handleChange={(value) => handleLocalChange('father', value)}
          otherStyles={'w-36 bg-white'}
        />

        <CustomFormField
          title={'Placa madre'}
          placeholder={'Placa madre'}
          value={localForm.mother}
          handleChange={(value) => handleLocalChange('mother', value)}
          otherStyles={'w-36 bg-white'}
        />
      </View>

      <View className={'pt-3'}>
        <CustomFormField
          title={'Fecha de nacimiento'}
          placeholder={'Fecha de nacimiento'}
          value={localForm.birthDate}
          handleChange={(value) => handleLocalChange('birthDate', value)}
          otherStyles={'bg-white w-80'}
        />
      </View>

      <View className={'flex flex-col'}>
        {localForm.animals.map((animal, animalIndex) => (
          <PlaqueComponent
            key={animalIndex}
            animal={animal}
            formIndex={formIndex}
            animalIndex={animalIndex}
            handleChangeValue={handleLocalChange}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => {
          setLocalForm((prev) => ({
            ...prev,
            animals: [
              ...prev.animals,
              { plaque: '', sex: '', linaje: {}, status: '' },
            ],
          }));
        }}
        className={'flex flex-row my-3 px-6 items-center'}
      >
        <AntDesign name="pluscircleo" size={18} color="blue" />
        <Text className={'text-base font-montserrat'}> Agregar otra placa</Text>
      </TouchableOpacity>

      <CustomButton
        title={'Guardar'}
        handlePress={saveForm}
        containerStyles={'bg-primary w-80 mx-auto mt-3'}
        textStyles={'text-white'}
      />

      <CustomSeparator />
    </View>
  );
};

export default AnimalForm;

const PlaqueComponent = ({ animal, animalIndex, handleChangeValue }) => (
  <View className={'flex-row justify-between pt-3 items-center mx-auto'}>
    <CustomFormField
      title={'Nº de placa'}
      placeholder={'Nº de placa'}
      value={animal.plaque}
      handleChange={(value) => handleChangeValue('plaque', value, animalIndex)}
      otherStyles={'w-40 bg-white'}
    />

    <Pressable
      onPress={() => handleChangeValue('sex', 'male', animalIndex)}
      className={`w-16 h-16 ${
        animal.sex === 'male' ? 'bg-blue-200' : 'bg-white'
      } p-2 rounded-2xl justify-center items-center mx-3`}
    >
      <Foundation name="male-symbol" size={30} color="darkblue" />
    </Pressable>

    <Pressable
      onPress={() => handleChangeValue('sex', 'female', animalIndex)}
      className={`w-16 h-16 ${
        animal.sex === 'female' ? 'bg-red-200' : 'bg-white'
      } p-2 rounded-2xl justify-center items-center`}
    >
      <Foundation name="female-symbol" size={30} color="fuchsia" />
    </Pressable>
  </View>
);
