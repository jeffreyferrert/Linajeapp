import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';

type CustomArbolAnimalCardProps = {
  title: string;
  plaque: number;
};

const CustomArbolAnimalCard = ({
  title,
  plaque,
}: CustomArbolAnimalCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => Alert.alert('Go to animal', `Placa del animal ${plaque}`)}
    >
      <Text className={'font-montserrat text-base'}>{title}</Text>
      <View className={'w-fit mr-3 flex flex-col rounded-lg bg-gray-200'}>
        <Image
          src={'https://via.placeholder.com/150'}
          className={'w-20 h-20 rounded-t-lg'}
        />
        <Text className={'w-full text-center text-sm rounded-b-lg border'}>
          {plaque}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomArbolAnimalCard;
