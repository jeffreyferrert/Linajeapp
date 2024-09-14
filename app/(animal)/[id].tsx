import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useDataContext } from '@/context/DataProvider';
import { useState } from 'react';
import InfoComponent from '@/app/(animal)/InfoComponent';
import AtributosComponent from '@/app/(animal)/AtributosComponent';
import LinajeComponent from '@/app/(animal)/LinajeComponent';
import ArbolGenealogicoComponent from '@/app/(animal)/ArbolGenealogicoComponent';

const profileTabs = [
  { name: 'Información', component: InfoComponent },
  { name: 'Linaje', component: LinajeComponent },
  { name: 'Familia ', component: ArbolGenealogicoComponent },
  { name: 'Atributos', component: AtributosComponent },
];

const Animal = () => {
  const { id } = useLocalSearchParams();
  const { forms } = useDataContext();
  const animal = forms.find((form) => form.id === Number(id));
  console.log('Animal', animal);
  if (!animal) {
    return <Text>Animal no encontrado</Text>;
  }
  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.3;

  const images = [
    'https://via.placeholder.com/600',
    'https://via.placeholder.com/600',
    'https://via.placeholder.com/600',
  ];

  const [selectedTab, setSelectedTab] = useState(profileTabs[0]);

  return (
    <SafeAreaView className={'bg-gray-200 h-full'}>
      <View className={'relative'}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: image }}
              style={{
                height: imageHeight,
                width: Dimensions.get('window').width,
              }}
            />
          ))}
        </ScrollView>

        <View
          className={
            'absolute top-0 w-full px-4 py-5 flex flex-row items-center justify-between'
          }
        >
          <CustomHeader noText={true} arrowColor={'white'} />
          <Text className={'text-md font-semibold text-white'}>
            Su estado:{' '}
            <Text
              className={`${animal.status === 'Vivo' ? 'text-green-500' : 'text-red-500'}`}
            >
              {animal.status}
            </Text>
          </Text>
        </View>
      </View>

      {/* ALTERNATIVES */}
      <View className={'bg-white p-2'}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {profileTabs.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedTab(item)}>
              <View
                className={
                  'flex-row bg-primary p-2 px-5 mr-2 rounded-lg min-w-[100px]'
                }
              >
                <Text className={'text-white font-montserrat mx-auto'}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CARD  PER SE */}

      <ScrollView className={'px-4 py-5'}>
        <selectedTab.component animal={animal} />
      </ScrollView>
      <StatusBar style={'dark'} />
    </SafeAreaView>
  );
};

export default Animal;
