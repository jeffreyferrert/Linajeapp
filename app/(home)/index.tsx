import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import FilterCard, { IconName } from '@/components/CustomFilterCard';
// import AccessCard from '@/components/CustomAccessCard';
import { Link, router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import CustomSearchBar from '@/components/CustomSearchBar';
import CustomAnimalCard from '@/components/CustomAnimalCard';
import { useAnimalFilter } from '@/hooks/useAnimalFilter';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import DateRangeFilter from '@/components/DateRangeFilter';
import CustomFilterModal from '@/components/CustomFilterModal';
import { useState } from 'react';
import { animalInstance } from '@/api/loader';
import CustomSexFilter from '@/components/CustomSexFilter';
import LineageFilter from '@/components/CustomLineajeFilter';

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
  const {
    animals,
    hasMore,
    loadingMore,
    loadMoreAnimals,
    applyFilter,
    clearFilter,
    filters,
    lineages,
  } = useAnimalFilter(animalInstance);

  const [showDateFilter, setShowDateFilter] = useState(false);
  const [showSexFilter, setShowSexFilter] = useState(false);
  const [showLineageFilter, setShowLineageFilter] = useState(false);
  const [selectedLineages, setSelectedLineages] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  const handleFilterPress = (filterName: string) => {
    if (filterName === 'Fecha') setShowDateFilter(!showDateFilter);
    if (filterName === 'Sexo') setShowSexFilter(!showSexFilter);
    if (filterName === 'Linaje') setShowLineageFilter(!showLineageFilter);
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
          <CustomSearchBar
            placeholder="Buscar"
            value={''}
            handleSearch={(query) => {
              if (query === '') {
                return;
              }
              applyFilter('search', query);
            }}
          />
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
              <FilterCard
                title={item.name}
                icon={item.icon}
                onPress={() => handleFilterPress(item.name)}
              />
            )}
          />
        </View>

        {/* MODAL PARA EL FILTRO DE FECHA */}
        <CustomFilterModal
          visible={showDateFilter}
          title="Filtrar por Fecha"
          onClose={() => setShowDateFilter(false)}
        >
          <DateRangeFilter
            onFilter={(startDate, endDate) =>
              applyFilter('dateRange', { startDate, endDate })
            }
            onClear={() => clearFilter('dateRange')}
            appliedDateFilter={
              !!(filters.dateRange.startDate || filters.dateRange.endDate)
            }
          />
        </CustomFilterModal>

        <CustomFilterModal
          visible={showSexFilter}
          title="Filtrar por Sexo"
          onClose={() => setShowSexFilter(false)}
        >
          <CustomSexFilter
            onFilter={(selectedSex) => applyFilter('sex', selectedSex)}
            onClear={() => clearFilter('sex')}
            appliedSexFilter={!!filters.sex}
          />
        </CustomFilterModal>

        <CustomFilterModal
          visible={showLineageFilter}
          title="Filtrar por Linaje"
          onClose={() => setShowLineageFilter(false)}
        >
          <LineageFilter
            availableLineages={lineages}
            selectedLineages={selectedLineages}
            handleApplyLineageFilter={(selectedLineages) => {
              setSelectedLineages(selectedLineages);
              applyFilter(
                'lineagesId',
                selectedLineages.map((lineage) => lineage.id),
              );
            }}
          />
        </CustomFilterModal>
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
            className="mb-20"
            windowSize={15}
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
