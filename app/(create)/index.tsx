import CustomHeader from '@/components/CustomHeader';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import CustomProgressBar from '@/components/CustomProgressBar';
import { useDataContext } from '@/context/DataProvider';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import RegisterAnimal from '@/app/(create)/register-animal';
import RegisterLinaje from '@/app/(create)/register-linaje';

const Create = () => {
  const { forms, setForms } = useDataContext();
  // const { createForm } = useDataContext()
  const [isStepOneComplete, setIsStepOneComplete] = useState(false);
  const [isStepTwoComplete, setIsStepTwoComplete] = useState(false);
  const [continueButton, setContinueButton] = useState(false);

  const [data, setData] = useState([
    {
      father: '',
      mother: '',
      birthDate: '',
      animals: [{ plaque: '', sex: '', linaje: {}, status: 'Vivo' }],
      isSaved: false,
    },
  ]);

  const handleContinue = () => {
    if (isStepOneComplete && !isStepTwoComplete) {
      setContinueButton(true);
    } else if (isStepOneComplete && isStepTwoComplete) {
      // setForms(data);
      router.push('../(home)');
    }
  };
  console.log(isStepOneComplete, isStepTwoComplete);
  return (
    <SafeAreaView className={'bg-gray-200 h-full py-10'}>
      <ScrollView className={'px-4 '}>
        <CustomHeader />
        {!continueButton && (
          <RegisterAnimal
            data={data}
            setData={setData}
            setIsStepOneComplete={setIsStepOneComplete}
          />
        )}
        {continueButton && (
          <RegisterLinaje
            data={data}
            setData={setData}
            setIsStepTwoComplete={setIsStepTwoComplete}
          />
        )}
      </ScrollView>

      <View className="absolute bottom-0 w-full h-[100px] justify-center shadow bg-white rounded-tl-xl rounded-tr-xl ">
        <CustomButton
          title="Continuar"
          handlePress={handleContinue}
          containerStyles={`${isStepOneComplete ? 'bg-primary' : 'bg-gray-200'} w-80 mx-auto mb-1`}
          textStyles="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default Create;
