import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export type IconName =
  | 'key'
  | 'filter'
  | 'find'
  | 'link'
  | 'stepforward'
  | 'stepbackward'
  | 'forward'
  | 'banckward'
  | 'caretright'
  | 'caretleft'
  | 'caretdown'
  | 'caretup'
  | 'rightcircle'
  | 'leftcircle'
  | 'heart'
  | 'contacts'
  | 'videocamera';

type FilterCardProps = {
  title: string;
  icon: IconName;
  onPress: () => void;
};

const FilterCard = ({ title, icon, onPress }: FilterCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={'flex-row items-center bg-white p-1 mr-2 rounded-md'}>
        <AntDesign name={icon} size={20} color="darkblue" />
        <Text> {title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilterCard;
