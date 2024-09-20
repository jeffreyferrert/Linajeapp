import { View } from 'react-native';

type CustomProgressBarProps = {
  stage: number;
};

const CustomProgressBar = ({ stage }: CustomProgressBarProps) => {
  return (
    <View className={'flex-row justify-center mb-6 w-72 mx-auto'}>
      <View
        className={`h-2 w-1/4 rounded-l-xl ${stage >= 1 ? 'bg-primary' : 'bg-white'}`}
      />
      <View className={`h-2 w-1/4 ${stage >= 2 ? 'bg-primary' : 'bg-white'}`} />
      <View className={`h-2 w-1/4 ${stage >= 3 ? 'bg-primary' : 'bg-white'}`} />
      <View
        className={`h-2 w-1/4 rounded-r-xl ${stage >= 4 ? 'bg-primary' : 'bg-white'}`}
      />
    </View>
  );
};

export default CustomProgressBar;
