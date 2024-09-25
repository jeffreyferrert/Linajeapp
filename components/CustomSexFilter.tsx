import { useState } from 'react';
import { View, Text } from 'react-native';
import CustomSexSelector from '@/components/CustomSexSelector';
import CustomButton from '@/components/CustomButton';

type SexFilterProps = {
  onFilter: (selectedSex: 'male' | 'female' | '') => void;
  onClear: () => void;
  appliedSexFilter: boolean;
};

const SexFilter = ({ onFilter, onClear, appliedSexFilter }: SexFilterProps) => {
  const [selectedSex, setSelectedSex] = useState<'male' | 'female' | ''>('');

  const handleFilter = () => {
    if (selectedSex) {
      onFilter(selectedSex);
    } else {
      // Mostrar alguna notificación o alerta si no se ha seleccionado un sexo
    }
  };

  return (
    <View className="">
      <CustomSexSelector
        selectedSex={selectedSex}
        onSexChange={setSelectedSex}
      />

      <View className="mt-10 flex-row justify-between">
        <CustomButton
          title="Filtrar"
          handlePress={handleFilter}
          containerStyles={`bg-primary ${appliedSexFilter ? 'w-3/5' : 'w-full'}`}
          textStyles="text-white"
        />

        {appliedSexFilter && (
          <CustomButton
            title="Limpiar"
            handlePress={onClear}
            containerStyles="bg-gray-500 w-1/3"
            textStyles="text-white"
          />
        )}
      </View>
    </View>
  );
};

export default SexFilter;
