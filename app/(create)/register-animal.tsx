import { Text, TouchableOpacity, View } from 'react-native';
import CustomProgressBar from '@/components/CustomProgressBar';
import { AntDesign } from '@expo/vector-icons';
import AnimalForm from '@/app/(create)/animal-form';

type RegisterAnimalProps = {
  data: any;
  setData: (value: any) => void;
  setIsStepOneComplete: (value: boolean) => void;
};

const RegisterAnimal = ({
  data,
  setData,
  setIsStepOneComplete,
}: RegisterAnimalProps) => {
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
        isSaved: false,
      },
    ]);
    setIsStepOneComplete(false);
  };

  console.log(JSON.stringify(data));

  const handleSave = (formIndex: number, updatedForm: any) => {
    const newData = [...data];
    newData[formIndex] = { ...updatedForm, isSaved: true };
    setData(newData);

    const allSaved = newData.every((form) => form.isSaved);
    setIsStepOneComplete(allSaved);
  };

  return (
    <View className={'mb-16'}>
      <View className={'my-5 px-6'}>
        <CustomProgressBar stage={1} />
        <Text className={'font-semibold text-2xl'}>
          Registra el perfil del animal
        </Text>
        <Text className={'text-base py-1 text-gray-500'}>
          Sube datos, fotos y videos para que toda comunidad lo pueda ver.
        </Text>
      </View>

      {data.map((form, formIndex) => (
        <AnimalForm
          key={formIndex}
          form={form}
          formIndex={formIndex}
          handleSave={(updatedForm: any) => handleSave(formIndex, updatedForm)}
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
