// Path: ./components/CustomHeaderSteps.tsx
import { Pressable, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';

type CustomHeaderStepsProps = {
  noText?: boolean;
  arrowColor?: string;
  showBackArrow?: boolean;
  current_step?: number;
  set_current_step?: (step: number) => void;
};

const CustomHeaderSteps = ({
  noText = false,
  arrowColor = 'black',
  showBackArrow = true,
  current_step = 1,
  set_current_step = () => {},
}: CustomHeaderStepsProps) => {
  const redirect = () => {
    if (current_step && current_step > 1) {
      set_current_step(current_step - 1);
    } else {
      // Redirect to previous page
      router.back();
    }
  };

  return (
    <View className={'flex flex-row items-center'}>
      {showBackArrow && (
        <Pressable onPress={redirect} className={''}>
          <AntDesign name="left" size={25} color={arrowColor} />
        </Pressable>
      )}
      {!noText && (
        <Text className={'flex-1 text-center text-4xl font-montserrat'}>
          Linajeapp
        </Text>
      )}
    </View>
  );
};

export default CustomHeaderSteps;
