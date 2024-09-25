import CustomHeader from '@/components/CustomHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import InfoComponent from '@/app/(animal)/InfoComponent';
// import AtributosComponent from '@/app/(animal)/AtributosComponent';
import LinajeComponent from '@/app/(animal)/LinajeComponent';
import ArbolGenealogicoComponent from '@/app/(animal)/ArbolGenealogicoComponent';
import type { AnimalPostOut, AnimalFamily } from '@/api/domain';
import { useAutoAPI } from '@/hooks/useAutoAPI';
import { animalInstance } from '@/api/loader';

const profileTabs = [
  { name: 'Información', component: InfoComponent },
  { name: 'Linaje', component: LinajeComponent },
  { name: 'Familia', component: ArbolGenealogicoComponent },
  // { name: 'Atributos', component: AtributosComponent },
];

const Animal = () => {
  const { id } = useLocalSearchParams();

  const { loading, error, getAnimal } = useAutoAPI(animalInstance);
  const [animal, setAnimal] = useState<AnimalPostOut | null>(null);
  const [family, setFamily] = useState<AnimalFamily | null>(null);
  const [selectedTab, setSelectedTab] = useState(profileTabs[0]);

  useEffect(() => {
    const fetchAnimal = async () => {
      const data = await getAnimal(Number(id));
      setAnimal(data);
      const familyData = await animalInstance.getFamily(Number(id));
      setFamily(familyData);
    };
    fetchAnimal();
  }, [id]);

  if (loading || !animal) {
    return (
      <SafeAreaView
        className={'bg-gray-200 h-full justify-center items-center'}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className={'bg-gray-200 h-full justify-center items-center'}
      >
        <Text>Error al cargar los datos del animal</Text>
      </SafeAreaView>
    );
  }

  const screenHeight = Dimensions.get('window').height;
  const imageHeight = screenHeight * 0.3;

  const images = [
    animal.thumbnail_profile_image_url || 'https://via.placeholder.com/600',
    // Puedes agregar más imágenes si están disponibles en el objeto `animal`
  ];

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
              className={`${
                animal.status === 'alive' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {animal.status}
            </Text>
          </Text>
        </View>
      </View>

      {/* TABS */}
      <View className={'bg-white p-2'}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {profileTabs.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedTab(item)}>
              <View
                className={`flex-row p-2 px-5 mr-2 rounded-lg min-w-[100px] ${
                  selectedTab.name === item.name ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <Text className={'text-white font-montserrat mx-auto'}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CONTENT */}
      <ScrollView className={'px-4 py-5'}>
        <selectedTab.component animal={animal} family={family} />
      </ScrollView>
      <StatusBar style={'dark'} />
    </SafeAreaView>
  );
};

export default Animal;
