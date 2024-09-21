import { useState } from 'react';
import { View, Text } from 'react-native';
import CustomDatePicker from '@/components/CustomDatePicker';
import CustomButton from '@/components/CustomButton';

type DateRangeFilterProps = {
  onFilter: (startDate: string, endDate: string) => void;
  onClear: () => void;
  appliedDateFilter: boolean;
};

const DateRangeFilter = ({
  onFilter,
  onClear,
  appliedDateFilter,
}: DateRangeFilterProps) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleFilter = () => {
    if (startDate && endDate) {
      onFilter(startDate, endDate);
    } else {
      // Mostrar alguna notificación o alerta si las fechas no están completas
      console.log('Por favor selecciona ambas fechas');
    }
  };

  return (
    <View className="p-4 bg-white rounded-lg shadow-md">
      <CustomDatePicker
        title="Fecha Inicial"
        value={startDate}
        handleChange={setStartDate}
        otherStyles="w-full"
      />

      <CustomDatePicker
        title="Fecha Final"
        value={endDate}
        handleChange={setEndDate}
        otherStyles="mt-6 w-full"
      />

      <View className="mt-10 flex-row justify-between">
        <CustomButton
          title="Filtrar"
          handlePress={handleFilter}
          containerStyles={`bg-primary ${appliedDateFilter ? 'w-3/5' : 'w-full'}`}
          textStyles="text-white"
        />

        {appliedDateFilter && (
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

export default DateRangeFilter;
