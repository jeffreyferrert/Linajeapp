import { View, Text, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { AnimalPostOut } from '@/api/domain';

type CustomAnimalCardProps = {
  animal: AnimalPostOut;
};

const CustomAnimalCard = ({ animal }: CustomAnimalCardProps) => {
  return (
    <TouchableOpacity onPress={() => router.push(`../(animal)/${animal.id}`)}>
      <View className={'flex-row h-14 items-center bg-white mb-4 rounded-xl'}>
        <Image
          source={{
            uri:
              animal.thumbnail_profile_image_url ||
              'https://via.placeholder.com/150',
          }}
          className={'w-14 h-14 rounded-l-xl'}
        />

        <View
          className={'flex-row w-72 items-center pl-5 pr-3 justify-between'}
        >
          <Text className={'text-lg'}>
            Placa: <Text className={'font-semibold'}>{animal.code}</Text>
          </Text>
          <AntDesign name="right" size={25} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomAnimalCard;
