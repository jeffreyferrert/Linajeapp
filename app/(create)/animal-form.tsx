import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import CustomFormField from '@/components/CustomFormField';
import { AntDesign, Foundation } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton';
import CustomSeparator from '@/components/CustomSeparator';

const AnimalForm = ({
  form,
  formIndex,
  handleChangeValue,
  addPlaque,
  data,
  setData,
}) => {
  return (
    <View key={formIndex} className={''}>
      <View className={'flex flex-row'}>
        <CustomFormField
          title={'Placa padre'}
          placeholder={'Placa padre'}
          value={form.father}
          handleChange={(value) => {
            const newData = [...data];
            newData[formIndex].father = value;
            setData(newData);
          }}
          otherStyles={'w-36 bg-white'}
        />

        <CustomFormField
          title={'Placa madre'}
          placeholder={'Placa madre'}
          value={form.mother}
          handleChange={(value) => {
            const newData = [...data];
            newData[formIndex].mother = value;
            setData(newData);
          }}
          otherStyles={'w-36 bg-white'}
        />
      </View>

      <View className={'pt-3'}>
        <CustomFormField
          title={'Fecha de nacimiento'}
          placeholder={'Fecha de nacimiento'}
          value={form.birthDate}
          handleChange={(value) => {
            const newData = [...data];
            newData[formIndex].birthDate = value;
            setData(newData);
          }}
          otherStyles={'bg-white w-80'}
        />
      </View>

      <View className={'flex flex-col '}>
        {form.animals.map((animal, animalIndex) => (
          <PlaqueComponent
            key={animalIndex}
            animal={animal}
            formIndex={formIndex}
            animalIndex={animalIndex}
            handleChangeValue={handleChangeValue}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => addPlaque(formIndex)}
        className={'flex flex-row my-3 px-6 items-center'}
      >
        <AntDesign name="pluscircleo" size={18} color="blue" />
        <Text className={'text-base font-montserrat'}> Agregar otra placa</Text>
      </TouchableOpacity>

      <CustomButton
        title={'Guardar'}
        handlePress={() => console.log('Save')}
        containerStyles={'bg-primary w-80 mx-auto mt-3'}
        textStyles={'text-white'}
      />

      <CustomSeparator />
    </View>
  );
};

export default AnimalForm;

const PlaqueComponent = ({
  animal,
  formIndex,
  animalIndex,
  handleChangeValue,
}: {
  animal: any;
  formIndex: number;
  animalIndex: number;
  handleChangeValue: (
    formIndex: number,
    animalIndex: number,
    field: string,
    value: any,
  ) => void;
}) => (
  <View className={'flex-row justify-between pt-3 items-center mx-auto'}>
    <CustomFormField
      title={'Nº de placa'}
      placeholder={'Nº de placa'}
      value={animal.plaque}
      handleChange={(value) =>
        handleChangeValue(formIndex, animalIndex, 'plaque', value)
      }
      otherStyles={'w-40 bg-white'}
    />

    <Pressable
      onPress={() => handleChangeValue(formIndex, animalIndex, 'sex', 'male')}
      className={`w-16 h-16 ${animal.sex === 'male' ? 'bg-blue-200' : 'bg-white'} p-2 rounded-2xl justify-center items-center mx-3`}
    >
      <Foundation name="male-symbol" size={30} color="darkblue" />
    </Pressable>

    <Pressable
      onPress={() => handleChangeValue(formIndex, animalIndex, 'sex', 'female')}
      className={`w-16 h-16 ${animal.sex === 'female' ? 'bg-red-200' : 'bg-white'} p-2 rounded-2xl justify-center items-center`}
    >
      <Foundation name="female-symbol" size={30} color="fuchsia" />
    </Pressable>
  </View>
);
