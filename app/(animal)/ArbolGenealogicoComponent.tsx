import { ScrollView, Text, View } from 'react-native';
import CustomArbolAnimalCard from '@/components/CustomArbolAnimalCard';
import { useState, useEffect } from 'react';
import { useDataContext } from '@/context/DataProvider';
import type { AnimalFamily, AnimalPostOut } from '@/api/domain';

type ArbolGenealogicoComponentProps = {
  animal: AnimalPostOut;
  family: AnimalFamily | null;
};

const ArbolGenealogicoComponent = ({
  animal,
  family,
}: ArbolGenealogicoComponentProps) => {
  const [padre, setPadre] = useState<AnimalPostOut | null>(null);
  const [madre, setMadre] = useState<AnimalPostOut | null>(null);
  const [hermanos, setHermanos] = useState<AnimalPostOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log('family', family);
    setPadre(family?.father || null);
    setMadre(family?.mother || null);
    setHermanos(family?.siblings || []);
    setLoading(false);
  }, []);

  return (
    <View className={'mb-5'}>
      {/* PADRES */}
      <View>
        <Text className={'font-bold text-lg'}>Padres</Text>
        <View className={'my-3 bg-white p-5 rounded-2xl flex flex-row '}>
          {padre ? (
            <CustomArbolAnimalCard
              title={'Padre'}
              thumbnail_profile_image_url={
                padre.thumbnail_profile_image_url || ''
              }
              code={padre.code}
              id={padre.id}
            />
          ) : (
            <Text>No hay datos del padre.</Text>
          )}
          {madre ? (
            <CustomArbolAnimalCard
              title={'Madre'}
              thumbnail_profile_image_url={
                madre.thumbnail_profile_image_url || ''
              }
              code={madre.code}
              id={madre.id}
            />
          ) : (
            <Text>No hay datos de la madre.</Text>
          )}
        </View>
      </View>

      {/* HERMANOS */}
      <View>
        <Text className={'font-bold text-lg'}>Hermanos</Text>
        <ScrollView
          horizontal
          className={'my-3 bg-white p-5 rounded-2xl flex flex-row '}
          showsHorizontalScrollIndicator={false}
        >
          {loading ? (
            <Text>Cargando hermanos...</Text>
          ) : hermanos.length === 0 ? (
            <Text className={'font-montserrat text-base'}>
              No se encontraron registros
            </Text>
          ) : (
            hermanos.map((hermano, index) => (
              <CustomArbolAnimalCard
                key={index}
                thumbnail_profile_image_url={
                  hermano.thumbnail_profile_image_url || ''
                }
                title={`Hermano ${index + 1}`}
                code={hermano.code}
                id={hermano.id}
              />
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default ArbolGenealogicoComponent;
