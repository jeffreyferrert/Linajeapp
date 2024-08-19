import { ScrollView, Text, View } from 'react-native';
import CustomArbolAnimalCard from '@/components/CustomArbolAnimalCard';
import { useDataContext } from '@/context/DataProvider';

const ArbolGenealogicoComponent = ({ animal }) => {
  const { forms } = useDataContext();

  const hermanos = forms.filter(
    (form) =>
      form.father === animal.father &&
      form.mother === animal.mother &&
      form.id !== animal.id,
  );

  return (
    <View className={'mb-5'}>
      {/*  PADRES */}
      <View className={''}>
        <Text className={'font-bold text-lg'}>Padres</Text>
        <View className={'my-3 bg-white p-5 rounded-2xl flex flex-row '}>
          <CustomArbolAnimalCard title={'Padre'} plaque={animal.father} />
          <CustomArbolAnimalCard title={'Madre'} plaque={animal.mother} />
        </View>
      </View>

      {/*  ABUELOS */}
      <View className={''}>
        <Text className={'font-bold text-lg'}>Abuelos</Text>
        <View className={'my-3 bg-white p-5 rounded-2xl flex flex-row '}>
          <Text className={'font-montserrat text-base'}>
            No se encontraron registros
          </Text>
        </View>
      </View>

      {/*  HERMANOS */}
      <View className={''}>
        <Text className={'font-bold text-lg'}>Hermanos</Text>
        <ScrollView
          horizontal
          className={'my-3 bg-white p-5 rounded-2xl flex flex-row '}
          showsHorizontalScrollIndicator={false}
        >
          {hermanos.length === 0 ? (
            <Text className={'font-montserrat text-base'}>
              No se encontraron registros
            </Text>
          ) : (
            hermanos.map((hermano, index) => (
              <CustomArbolAnimalCard
                key={index}
                title={`Hermano ${index + 1}`}
                plaque={hermano.plaque}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ArbolGenealogicoComponent;
