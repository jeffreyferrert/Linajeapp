import { Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

type Lineage = {
  id: number;
  name: string;
};

type LineageFilterProps = {
  availableLineages: Lineage[];
  selectedLineages: Lineage[];
  handleApplyLineageFilter: (selectedLineages: Lineage[]) => void;
};

const LineageFilter = ({
  availableLineages,
  selectedLineages,
  handleApplyLineageFilter,
}: LineageFilterProps) => {
  const [selectedLinajes, setSelectedLinajes] = useState<Lineage[]>(
    selectedLineages || [],
  );

  const handleCheckboxChange = (lineage: Lineage) => {
    const updatedLinajes = selectedLinajes.some(
      (item) => item.id === lineage.id,
    )
      ? selectedLinajes.filter((item) => item.id !== lineage.id)
      : [...selectedLinajes, lineage];

    setSelectedLinajes(updatedLinajes);
    handleApplyLineageFilter(updatedLinajes);
  };

  const isLineageSelected = (lineageId: number) =>
    selectedLinajes.some((item) => item.id === lineageId);

  return (
    <View>
      <View className={'bg-white p-5 rounded-xl my-5'}>
        {availableLineages &&
          availableLineages.map((lineage, index) => (
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

        {!availableLineages ||
          (availableLineages.length === 0 && (
            <Text>No hay linajes disponibles</Text>
          ))}
      </View>
    </View>
  );
};

export default LineageFilter;
