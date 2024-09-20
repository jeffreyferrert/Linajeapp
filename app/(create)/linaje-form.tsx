// Path: ./app/(create)/linaje-form.tsx
import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

import type { Brood } from '@/types/animalExtraTypes';

type LinajeFormProps = {
  brood: Brood;
  broodIndex: number;
  lineages: Brood['lineages'];
  handleSaveLinajes: (
    broodIndex: number,
    selectedLinajes: Brood['lineages'],
  ) => void;
};

const LinajeForm = ({
  brood,
  broodIndex,
  lineages,
  handleSaveLinajes,
}: LinajeFormProps) => {
  const [selectedLineages, setSelectedLineages] = useState<Brood['lineages']>(
    brood.lineages || [],
  );

  const handleCheckboxChange = (lineage: Brood['lineages'][0]) => {
    const updatedLinajes = selectedLineages.some(
      (item) => item.id === lineage.id,
    )
      ? selectedLineages.filter((item) => item.id !== lineage.id)
      : [...selectedLineages, lineage];

    setSelectedLineages(updatedLinajes);
    handleSaveLinajes(broodIndex, updatedLinajes);
  };

  const isLineageSelected = (lineageId: number) =>
    selectedLineages.some((item) => item.id === lineageId);

  return (
    <View>
      <Text className={'text-lg font-bold'}>
        Asignar linajes a la camada {broodIndex + 1} ({brood.offsprings.length}{' '}
        animales)
      </Text>

      <View className={'bg-white p-5 rounded-xl my-5'}>
        <Text className={'text-base font-bold underline'}>Linaje</Text>

        {lineages &&
          lineages.map((lineage, index) => (
            <View
              key={index}
              className={'flex-row items-center justify-between mt-2'}
            >
              <Text className={'ml-2'}>{lineage.name}</Text>
              <Checkbox
                value={isLineageSelected(lineage.id)}
                onValueChange={() => handleCheckboxChange(lineage)}
              />
            </View>
          ))}
        {!lineages ||
          (lineages.length === 0 && <Text>No hay linajes en tu cuenta</Text>)}
      </View>
    </View>
  );
};

export default LinajeForm;
