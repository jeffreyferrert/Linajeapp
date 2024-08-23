import React from 'react';
import { View } from 'react-native';

const CustomSeparator = ({ sx }: { sx?: any }) => {
  return (
    <View className={`my-6 border border-dashed border-inputgray ${sx}`} />
  );
};

export default CustomSeparator;
