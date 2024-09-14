import { Pressable, Text, View } from 'react-native';
import { router, useRouter } from 'expo-router'; // usa useRouter para obtener la ruta actual
import { AntDesign } from '@expo/vector-icons';
import type { Href } from 'expo-router';
import { Redirect } from 'expo-router';

type CustomHeaderProps = {
  noText?: boolean;
  arrowColor?: string;
  showBackArrow?: boolean;
  arrow_redirec_to?: Href<string> | null;
};

const CustomHeader = ({
  noText = false,
  arrowColor = 'black',
  showBackArrow = true, // Mostrar la flecha por defecto
  arrow_redirec_to = null,
}: CustomHeaderProps) => {
  const redirect = () => {
    if (arrow_redirec_to) {
      router.push(arrow_redirec_to);
    } else {
      router.back();
    }
  };
  return (
    <View className={'flex flex-row items-center'}>
      {showBackArrow && ( // Mostrar la flecha solo si `showBackArrow` es true
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

export default CustomHeader;
