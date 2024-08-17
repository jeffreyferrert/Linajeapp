import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import FilterCard, { IconName } from '@/components/CustomFilterCard';
import AccessCard from '@/components/CustomAccessCard';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomSearchBar from '@/components/CustomSearchBar';

const filterData = [
  { name: 'Fecha', icon: 'calendar' as IconName },
  { name: 'Género', icon: 'team' as IconName },
  { name: 'Resultados', icon: 'barschart' as IconName },
  { name: 'Linaje', icon: 'yuque' as IconName },
];

const accessData = [
  { name: 'Favoritos', icon: 'heart' as IconName },
  { name: 'Último peleadores', icon: 'contacts' as IconName },
  { name: 'Videoteca', icon: 'videocamera' as IconName },
];

const Home = () => {
  return (
    <SafeAreaView className={'bg-gray-200 h-full '}>
      <ScrollView>
        <View className={'h-full px-4 py-10'}>
          <View className="flex-row justify-around items-center">
            {/*<SearchInput initialQuery={""}/>*/}
            <CustomSearchBar placeholder="Buscar" value={''} />
            <View
              className={
                'bg-primary w-12 h-12 rounded-full justify-center items-center'
              }
            >
              <Link href={'../(profile)'}>
                <AntDesign name="user" size={24} color="white" />
              </Link>
            </View>
          </View>

          {/* FILTROS */}
          <View className="flex-row py-6">
            <Text>
              <AntDesign name="filter" size={20} color="darkblue" />
              Filtrar por:{' '}
            </Text>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {filterData.map((item, index) => (
                <FilterCard key={index} title={item.name} icon={item.icon} />
              ))}
            </ScrollView>
          </View>

          {/* ACCESO DIRECTO */}
          <View>
            <Text className="font-semibold text-lg">Acceso directos</Text>

            <View className="flex-row my-4">
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {accessData.map((item, index) => (
                  <AccessCard key={index} title={item.name} icon={item.icon} />
                ))}
              </ScrollView>
            </View>
          </View>

          {/* ANIMALES */}
          <View>
            <View className={'flex-row items-center justify-between '}>
              <Text className="font-semibold text-lg">Mis animales</Text>
              <Text>
                cant. <Text className="font-semibold">100</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* CREATION BUTTON */}
      <View className="absolute bottom-0 w-full h-[100px] justify-center shadow bg-white rounded-tl-xl rounded-tr-xl ">
        <CustomButton
          title="Agregar animal o camada"
          handlePress={() => router.push('../(create)')}
          containerStyles="bg-primary w-80 mx-auto mb-1"
          textStyles="text-white"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
