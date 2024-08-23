import CustomHeader from '@/components/CustomHeader';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import CustomProgressBar from '@/components/CustomProgressBar';
import { useDataContext } from '@/context/DataProvider';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import RegisterAnimal from '@/app/(create)/register-animal';

const Create = () => {
  // const { forms, setForms } = useDataContext();
  // const { createForm } = useDataContext()
  const [isStepOneComplete, setIsStepOneComplete] = useState(false);
  const [isStepTwoComplete, setIsStepTwoComplete] = useState(false);

  const [data, setData] = useState([
    {
      father: '',
      mother: '',
      birthDate: '',
      animals: [{ plaque: '', sex: '', linaje: {}, status: '' }],
    },
  ]);

  return (
    <SafeAreaView className={'bg-gray-200 h-full py-10'}>
      <ScrollView className={'px-4 '}>
        <CustomHeader />
        <RegisterAnimal data={data} setData={setData} />
      </ScrollView>

      <View className="absolute bottom-0 w-full h-[100px] justify-center shadow bg-white rounded-tl-xl rounded-tr-xl ">
        <CustomButton
          title="Agregar animal o camada"
          handlePress={() => router.push('../(create)')}
          containerStyles={`bg-primary w-80 mx-auto mb-1`}
          textStyles="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default Create;
