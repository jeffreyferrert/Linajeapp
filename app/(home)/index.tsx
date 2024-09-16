import { Text, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import FilterCard, { IconName } from '@/components/CustomFilterCard';
import AccessCard from '@/components/CustomAccessCard';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomSearchBar from '@/components/CustomSearchBar';
import { useDataContext } from '@/context/DataProvider';
import CustomAnimalCard from '@/components/CustomAnimalCard';
import { FlatList } from 'react-native';

const filterData = [
  { name: 'Fecha', icon: 'calendar' as IconName },
  { name: 'Sexo', icon: 'team' as IconName },
  // { name: 'Resultados', icon: 'barschart' as IconName },
  { name: 'Linaje', icon: 'yuque' as IconName },
];

const accessData = [
  { name: 'Favoritos', icon: 'heart' as IconName },
  { name: 'Último peleadores', icon: 'contacts' as IconName },
  { name: 'Videoteca', icon: 'videocamera' as IconName },
];

const Home = () => {
  const { forms, loading, error, loadMoreAnimals, loadingMore, hasMore } =
    useDataContext();

  if (loading) {
    return (
      <SafeAreaView
        className={'bg-gray-200 h-full justify-center items-center'}
      >
        <Text>Cargando...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        className={'bg-gray-200 h-full justify-center items-center'}
      >
        <Text>Error al cargar los datos</Text>
      </SafeAreaView>
    );
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  return (
    <SafeAreaView className={'bg-gray-200 h-full'}>
      <View className={'h-full p-5 mb-10'}>
        <View className="flex-row justify-around items-center mb-5">
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

          <FlatList
            data={filterData}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <FilterCard title={item.name} icon={item.icon} />
            )}
          />
        </View>

        {/* ACCESO DIRECTO
        <View>
          <Text className="font-semibold text-lg">Accesos directos</Text>

          <View className="flex-row my-4">
            <FlatList
              data={accessData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <AccessCard title={item.name} icon={item.icon} />
              )}
            />
          </View>
        </View> */}

        {/* ANIMALES */}
        <View style={{ flex: 1 }}>
          <View className={'flex-row items-center justify-between mb-4'}>
            <Text className="font-semibold text-lg">Mis animales</Text>
            <Text>
              cant. <Text className="font-semibold">{forms.length}</Text>
            </Text>
          </View>

          <FlatList
            data={forms}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CustomAnimalCard animal={item} />}
            onEndReached={() => {
              console.log('onEndReached');
              if (hasMore) {
                loadMoreAnimals();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      </View>

      {/* BOTÓN DE CREACIÓN */}
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
