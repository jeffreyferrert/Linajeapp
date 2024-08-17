import { TouchableOpacity, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  rightIcon = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles}`}
    >
      <Text className={`text-primary font-semibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {rightIcon && (
        <Pressable onPress={() => router.back()} className={' ml-auto'}>
          <AntDesign name="right" size={25} color="black" />
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
