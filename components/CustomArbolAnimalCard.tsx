import { View, Text, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

type CustomArbolAnimalCardProps = {
  title: string;
  code: string;
  thumbnail_profile_image_url: string;
  id: number;
};

const CustomArbolAnimalCard = ({
  title,
  code,
  thumbnail_profile_image_url,
  id,
}: CustomArbolAnimalCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        return router.push(`./${id}`);
      }}
      style={{ marginRight: 10 }}
    >
      <Text className={'font-montserrat text-base'}>{title}</Text>
      <View className={'w-fit flex flex-col rounded-lg bg-gray-200'}>
        <Image
          source={{ uri: thumbnail_profile_image_url }}
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
