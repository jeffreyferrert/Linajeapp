import { TouchableOpacity, Text, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  rightIcon?: boolean;
  disabled?: boolean;
};

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  rightIcon = false,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
      className={`rounded-xl min-h-[62px] flex flex-row justify-center items-center ${
        disabled ? 'bg-[#a9b4c2]' : 'bg-primary'
      } ${containerStyles}`}
    >
      <Text
        className={`font-semibold text-lg ${
          disabled ? 'text-gray-500' : 'text-primary'
        } ${textStyles}`}
      >
        {title}
      </Text>

      {rightIcon && (
        <Pressable onPress={() => router.back()} className={'ml-auto'}>
          <AntDesign
            name="right"
            size={25}
            color={disabled ? '#d1d5db' : 'black'}
            className={`${textStyles}`}
          />
        </Pressable>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
