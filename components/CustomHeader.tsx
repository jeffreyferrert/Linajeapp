import { Pressable, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

type CustomHeaderProps = {
  noText?: boolean;
  arrowColor?: string;
};
const CustomHeader = ({
  noText = false,
  arrowColor = 'black',
}: CustomHeaderProps) => {
  return (
    <View className={'flex flex-row items-center'}>
      <Pressable onPress={() => router.back()} className={''}>
        <AntDesign name="left" size={25} color={arrowColor} />
      </Pressable>
      {!noText && (
        <Text className={'flex-1 text-center text-4xl font-montserrat'}>
          Linajeapp
        </Text>
      )}
    </View>
  );
};

export default CustomHeader;
