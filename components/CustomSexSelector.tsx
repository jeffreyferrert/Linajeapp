import React from 'react';
import { View, Pressable } from 'react-native';
import { Foundation } from '@expo/vector-icons';

interface CustomSexSelectorProps {
  selectedSex: 'male' | 'female' | '';
  onSexChange: (sex: 'male' | 'female') => void;
}

const CustomSexSelector: React.FC<CustomSexSelectorProps> = ({
  selectedSex,
  onSexChange,
}) => {
  return (
    <View className={'flex-row justify-between pt-3 items-center mx-auto'}>
      {/* Botón para sexo masculino */}
      <Pressable
        onPress={() => onSexChange('male')}
        className={`w-16 h-16 ${
          selectedSex === 'male' ? 'bg-blue-200' : 'bg-white'
        } p-2 rounded-2xl justify-center items-center mx-3`}
      >
        <Foundation name="male-symbol" size={30} color="darkblue" />
      </Pressable>

      {/* Botón para sexo femenino */}
      <Pressable
        onPress={() => onSexChange('female')}
        className={`w-16 h-16 ${
          selectedSex === 'female' ? 'bg-red-200' : 'bg-white'
        } p-2 rounded-2xl justify-center items-center`}
      >
        <Foundation name="female-symbol" size={30} color="fuchsia" />
      </Pressable>
    </View>
  );
};

export default CustomSexSelector;
