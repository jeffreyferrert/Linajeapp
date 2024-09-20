import { View, Text, ScrollView } from 'react-native';
import CustomProgressBar from '@/components/CustomProgressBar';
import type { Brood } from '@/types/animalExtraTypes';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomSeparator from '@/components/CustomSeparator';
import { Pressable } from 'react-native';

type SummaryBroodsProps = {
  broods: Brood[];
};

const SummaryBroods = ({ broods }: SummaryBroodsProps) => {
  return (
    <View className={'mb-16'}>
      <View className={'my-5 px-6'}>
        <CustomProgressBar stage={4} />
        <Text className={'font-semibold text-2xl'}>Resumen de Animales</Text>
        <Text className={'text-base py-1 text-gray-500'}>
          Revisa el resumen de los animales y sus linajes asignados.
        </Text>
      </View>

      <ScrollView className={'px-6'}>
        {broods.map((brood, index) => (
          <View
            key={index}
            className={'bg-white p-5 rounded-xl my-3 shadow-sm'}
          >
            <Text className={'text-lg font-semibold mb-2'}>
              Camada {index + 1}
            </Text>
            <View className={'mx-4'}>
              <View className={'bg-white p-5 rounded-xl'}>
                <Text className={'text-lg font-bold'}>
                  Detalles del Animal Nº{index + 1}
                </Text>

                <CustomSeparator sx={'my-3'} />

                <View className={'flex-row justify-between'}>
                  <Text className={'font-semibold'}>Placa Padre</Text>
                  <Text>{brood.father_code || 'No asignado'}</Text>
                </View>

                <View className={'flex-row justify-between'}>
                  <Text className={'font-semibold'}>Placa Madre</Text>
                  <Text>{brood.mother_code || 'No asignado'}</Text>
                </View>

                <View className={'flex-row justify-between'}>
                  <Text className={'font-semibold'}>Fecha de Nacimiento</Text>
                  <Text>{brood.birthdate}</Text>
                </View>

                <View>
                  <Text className={'font-semibold'}>
                    Placas de los animales
                  </Text>
                  {brood.offsprings.map((animal, index) => (
                    <View key={index} className={'flex-row justify-between'}>
                      <Text>{animal.code}</Text>
                      {/* Cambiar male y female por Hembra y Macho */}
                      <Text>{animal.sex === 'male' ? 'Macho' : 'Hembra'}</Text>
                    </View>
                  ))}
                </View>
                <CustomSeparator />
                <View className={''}>
                  <Text className={'font-bold text-lg mb-2'}>Linajes:</Text>
                  {brood.lineages.length > 0 ? (
                    brood.lineages.map((lineage, linajeIndex) => (
                      <View
                        key={linajeIndex}
                        className={'flex-row justify-between mb-2'}
                      >
                        <Text className={'text-base'}>{lineage.name}</Text>
                        <Text className={'text-base text-gray-600'}>
                          {lineage.percentage * 100}%
                        </Text>
                      </View>
                    ))
                  ) : (
                    <Text>No se han asignado linajes.</Text>
                  )}
                </View>
                {/* <TouchableOpacity onPress={deleteAnimalForm} className={'mt-2'}>
                  <Text style={{ color: 'red', textAlign: 'center' }}>
                    Eliminar Animal
                  </Text>
                </TouchableOpacity> */}
              </View>

              <CustomSeparator />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SummaryBroods;
