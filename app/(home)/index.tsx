import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import FilterCard, { IconName } from '@/components/CustomFilterCard';
import { BlurView } from 'expo-blur';
// import AccessCard from '@/components/CustomAccessCard';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomSearchBar from '@/components/CustomSearchBar';
import { useDataContext } from '@/context/DataProvider';
import CustomAnimalCard from '@/components/CustomAnimalCard';
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import DateRangeFilter from '@/components/DateRangeFilter';
import { useState, useEffect } from 'react';
import { useAutoAPI } from '@/hooks/useAutoAPI';
import { animalInstance } from '@/api/loader';
import { AnimalPostOut, PagedAnimalPostOut } from '@/api/domain';

const filterData = [
  { name: 'Fecha', icon: 'calendar' as IconName },
  { name: 'Sexo', icon: 'team' as IconName },
  // { name: 'Resultados', icon: 'barschart' as IconName },
  { name: 'Linaje', icon: 'yuque' as IconName },
];

// const accessData = [
//   { name: 'Favoritos', icon: 'heart' as IconName },
//   { name: 'Último peleadores', icon: 'contacts' as IconName },
//   { name: 'Videoteca', icon: 'videocamera' as IconName },
// ];
const Home = () => {
  const [animals, setAnimals] = useState([] as AnimalPostOut[]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const { getAnimals, filterAnimals, loading, results, error } =
    useAutoAPI(animalInstance);
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [dateFilter, setDateFilter] = useState({ startDate: '', endDate: '' });
  const [appliedDateFilter, setAppliedDateFilter] = useState<boolean>(false);

  const loadMoreAnimals = async () => {
    if (loadingMore || !hasMore) return;
    let response: PagedAnimalPostOut = { count: 0, items: [] };
    let filters = {
      startDate: '',
      endDate: '',
      search: '',
      lineages_id: [],
    };
    setLoadingMore(true);
    const nextPage = page + 1;
    if (appliedDateFilter) {
      filters.startDate = dateFilter.startDate;
      filters.endDate = dateFilter.endDate;
    }
    if (!appliedDateFilter) {
      response = await getAnimals(nextPage);
      console.log('===========Filtrando con getAnimals===========');
    } else {
      try {
        console.log('===========Filtrando con filterAnimals===========');
        response = await filterAnimals(
          nextPage,
          filters.startDate,
          filters.endDate,
          filters.search,
          filters.lineages_id,
        );
        console.log('===========Filtrando con filterAnimals===========');
        console.log('Filtros:', filters);
      } catch (err) {
        console.error('Error al filtrar:', err);
      }
    }

    if (response && response.items) {
      // Primero actualiza la lista de animales y luego calcula `hasMore`
      setAnimals((prevAnimals) => {
        const updatedAnimals = [...prevAnimals, ...response.items];
        setHasMore(response.count > updatedAnimals.length); // Usamos `updatedAnimals` para calcular `hasMore`
        return updatedAnimals; // Devuelve la nueva lista de animales
      });

      setPage(nextPage);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  };

  useEffect(() => {
    const fetchInitialAnimals = async () => {
      const response = await getAnimals(1);
      if (response && response.items) {
        setAnimals(response.items);
        setHasMore(response.count > response.items.length);
        setPage(1);
      } else {
        setAnimals([]);
        setHasMore(false);
      }
    };
    fetchInitialAnimals();
  }, []);

  // Manejar el filtro de fechas
  const handleDateFilter = async (startDate: string, endDate: string) => {
    try {
      const filterResult = await filterAnimals(1, startDate, endDate);
      if (filterResult && filterResult.items) {
        setAnimals([]);
        console.log('Filtrado:', filterResult);
        setAnimals(filterResult.items);
        setHasMore(filterResult.count > filterResult.items.length);
        setAppliedDateFilter(true);
        setDateFilter({ startDate, endDate });
        setPage(1);
      } else {
        setAnimals([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error al filtrar:', err);
    }
    setShowDateFilter(false);
  };

  // Manejar la limpieza del filtro de fechas
  const handleClearDateFilter = async () => {
    try {
      const response = await getAnimals(1);
      if (response && response.items) {
        setAnimals(response.items);
        setHasMore(response.count > response.items.length);
        setPage(1);
      } else {
        setAnimals([]);
        setHasMore(false);
      }
      setAppliedDateFilter(false);
      setDateFilter({ startDate: '', endDate: '' });
    } catch (err) {
      console.error('Error al obtener los animales:', err);
    }
    setShowDateFilter(false);
  };

  const handleFilterPress = (filterName: string) => {
    if (filterName === 'Fecha') {
      setShowDateFilter(!showDateFilter); // Mostrar el filtro de fecha
    }
  };

  // Renderizar el footer para el FlatList (indicación de carga)
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
            keyExtractor={(item) => item.name} // Clave única basada en el nombre del filtro
            renderItem={({ item }) => (
              <FilterCard
                title={item.name}
                icon={item.icon}
                onPress={() => handleFilterPress(item.name)} // Maneja el clic en la tarjeta de filtro
              />
            )}
          />
        </View>

        {/* MODAL PARA EL FILTRO DE FECHA */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDateFilter}
          onRequestClose={() => setShowDateFilter(false)}
        >
          {/* Fondo difuminado */}
          <View style={{ flex: 1 }}>
            <BlurView
              intensity={70}
              tint="dark"
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            />

            {/* Contenido del Modal */}
            <View className="flex-1 justify-center items-center">
              <View className="bg-white p-6 rounded-lg w-80 shadow-lg">
                <View className="flex-row justify-between">
                  <Text className="text-lg font-semibold mb-4">
                    Filtrar por Fecha
                  </Text>
                  <Pressable onPress={() => setShowDateFilter(false)}>
                    <AntDesign name="close" size={24} color="black" />
                  </Pressable>
                </View>

                <DateRangeFilter
                  onFilter={handleDateFilter}
                  onClear={handleClearDateFilter}
                  appliedDateFilter={appliedDateFilter}
                />
              </View>
            </View>
          </View>
        </Modal>

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
              cant. <Text className="font-semibold">{animals.length}</Text>
            </Text>
          </View>

          <FlatList
            data={animals}
            keyExtractor={(item) => item.id.toString()} // Usar `id` como clave única
            renderItem={({ item }) => <CustomAnimalCard animal={item} />}
            onEndReached={() => {
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
