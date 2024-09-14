import { ScrollView, Text, View } from 'react-native';
import CustomArbolAnimalCard from '@/components/CustomArbolAnimalCard';
import { useState, useEffect } from 'react';
import { useDataContext } from '@/context/DataProvider';
import type { AnimalPostOut } from '@/api/domain';

type ArbolGenealogicoComponentProps = {
  animal: AnimalPostOut;
};

const ArbolGenealogicoComponent = ({
  animal,
}: ArbolGenealogicoComponentProps) => {
  const { getAnimalById, forms } = useDataContext();
  const [padre, setPadre] = useState<AnimalPostOut | null>(null);
  const [madre, setMadre] = useState<AnimalPostOut | null>(null);
  const [hermanos, setHermanos] = useState<AnimalPostOut[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchFamilia = async () => {
    setLoading(true);
    try {
      const [padreData, madreData] = await Promise.all([
        animal.father ? getAnimalById(animal.father) : null,
        animal.mother ? getAnimalById(animal.mother) : null,
      ]);

      setPadre(padreData || null);
      setMadre(madreData || null);

      if (animal.father && animal.mother) {
        const hermanosData = forms.filter(
          (form) =>
            form.father === animal.father &&
            form.mother === animal.mother &&
            form.id !== animal.id,
        );
        setHermanos(hermanosData);
      }
    } catch (err) {
      console.error('Error al obtener la familia del animal', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilia();
  }, [animal]);

  return (
    <View className={'mb-5'}>
      {/* PADRES */}
      <View>
        <Text className={'font-bold text-lg'}>Padres</Text>
        <View className={'my-3 bg-white p-5 rounded-2xl flex flex-row '}>
          {padre ? (
            <CustomArbolAnimalCard
              title={'Padre'}
              code={padre.code}
              id={padre.id}
            />
          ) : (
            <Text>No hay datos del padre.</Text>
          )}
          {madre ? (
            <CustomArbolAnimalCard
              title={'Madre'}
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
