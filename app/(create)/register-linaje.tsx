import { View, Text } from 'react-native';
import CustomProgressBar from '@/components/CustomProgressBar';
import CustomButton from '@/components/CustomButton';
import LinajeForm from '@/app/(create)/linaje-form';

type RegisterLinajeProps = {
  data: any;
  setData: (value: any) => void;
  setIsStepTwoComplete: (value: boolean) => void;
};

const RegisterLinaje = ({
  data,
  setData,
  setIsStepTwoComplete,
}: RegisterLinajeProps) => {
  return (
    <View className={'mb-16'}>
      <View className={'my-5 px-6'}>
        <CustomProgressBar stage={1} />
        <Text className={'font-semibold text-2xl'}>Linaje del animal</Text>
        <Text className={'text-base py-1 text-gray-500'}>
          Escoge el linaje que tiene tu camada o animal.
        </Text>

        {data.map((form: any, index: number) => (
          <LinajeForm
            key={index}
            form={form}
            setForm={(value: any) => setData(value)}
          />
        ))}
      </View>
    </View>
  );
};

export default RegisterLinaje;
