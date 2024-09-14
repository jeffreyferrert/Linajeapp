import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

type CustomArbolAnimalCardProps = {
  title: string;
  code: string;
  id: number;
};

const CustomArbolAnimalCard = ({
  title,
  code,
  id,
}: CustomArbolAnimalCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => router.push(`../(animal)/${id}`)}
      style={{ marginRight: 10 }}
    >
      <Text className={'font-montserrat text-base'}>{title}</Text>
      <View className={'w-fit flex flex-col rounded-lg bg-gray-200'}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          className={'w-20 h-20 rounded-t-lg'}
        />
        <Text className={'w-full text-center text-sm rounded-b-lg border'}>
          {code}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomArbolAnimalCard;
