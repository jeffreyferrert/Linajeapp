import { View } from 'react-native';

type CustomProgressBarProps = {
  stage: number;
};

const CustomProgressBar = ({ stage }: CustomProgressBarProps) => {
  if (stage === 1) {
    return (
      <View className={'flex-row justify-center mb-6 w-72 mx-auto'}>
        <View className={'bg-primary h-2 w-1/4 rounded-xl'} />
        <View className={'bg-white h-2 w-1/4 rounded-r-xl mr-1'} />

        <View className={'bg-white h-2 w-1/4 rounded-l-xl ml-1'} />
        <View className={'bg-white h-2 w-1/4 rounded-r-xl'} />
      </View>
    );
  }
  return (
    <View className={'flex-row justify-center mb-6 w-72 mx-auto'}>
      <View className={'bg-primary h-2 w-1/4 rounded-l-xl'} />
      <View className={'bg-primary h-2 w-1/4 rounded-r-xl mr-1'} />

      <View className={'bg-primary h-2 w-1/4 rounded-xl ml-1'} />
      <View className={'bg-white h-2 w-1/4 rounded-r-xl'} />
    </View>
  );
};

export default CustomProgressBar;
