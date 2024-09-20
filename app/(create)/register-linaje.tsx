// Path: ./app/(create)/register-linaje.tsx
import { View, Text } from 'react-native';
import CustomProgressBar from '@/components/CustomProgressBar';
import LinajeForm from '@/app/(create)/linaje-form';
import type { Brood } from '@/types/animalExtraTypes';
import type { LineagePostOut } from '@/api/domain';

type RegisterLinajeProps = {
  broods: Brood[];
  setBroods: (value: Brood[]) => void;
  serverLineages: LineagePostOut[];
};

const RegisterLinaje = ({
  broods,
  setBroods,
  serverLineages,
}: RegisterLinajeProps) => {
  const lineages: Brood['lineages'] = serverLineages.map((lineage) => ({
    id: lineage.id,
    name: lineage.name,
    animal_type: lineage.animal_type,
    created_at: lineage.created_at,
    updated_at: lineage.updated_at,
    owner_id: lineage.owner_id,
    percentage: 0,
  }));

  const handleSaveLinajes = (
    broodIndex: number,
    selectedLineages: Brood['lineages'],
  ) => {
    const newData = [...broods];
    newData[broodIndex].lineages = selectedLineages;
    setBroods(newData);
  };

  return (
    <View className={'mb-16'}>
      <View className={'my-5 px-6'}>
        <CustomProgressBar stage={2} />
        <Text className={'font-semibold text-2xl'}>Linaje del animal</Text>
        <Text className={'text-base py-1 text-gray-500'}>
          Escoge el linaje que tiene tu camada o animal.
        </Text>

        {broods.map((brood: Brood, broodIndex: number) => (
          <LinajeForm
            key={broodIndex}
            brood={brood}
            broodIndex={broodIndex}
            lineages={lineages}
            handleSaveLinajes={handleSaveLinajes}
          />
        ))}
      </View>
    </View>
  );
};

export default RegisterLinaje;
