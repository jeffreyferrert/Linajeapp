import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

type IconName =
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

type AccessCardProps = {
  title: string;
  icon: IconName;
};

const AccessCard = ({ title, icon }: AccessCardProps) => {
  // @ts-ignore
  return (
    <TouchableOpacity
      onPress={() => Alert.alert('Acceso directo', `Direct access to ${title}`)}
    >
      <View
        className={' bg-skyblue rounded-xl w-28 h-28 justify-between p-2 mr-2'}
      >
        <View className="flex-row justify-between items-start">
          <View></View>
          <AntDesign name={icon} size={20} color="white" />
        </View>
        <Text className={'text-white font-semibold text-lg'}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AccessCard;
