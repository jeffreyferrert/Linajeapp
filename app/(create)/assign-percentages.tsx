import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import CustomProgressBar from '@/components/CustomProgressBar';
import { Brood } from '@/types/animalExtraTypes';

type AssignPercentagesProps = {
  broods: Brood[];
  setBroods: (value: (prevBroods: Brood[]) => Brood[]) => void;
  fractions: number[][];
  setFractions: (value: (prevFractions: number[][]) => number[][]) => void;
};

const AssignPercentages = ({
  broods,
  setBroods,
  fractions,
  setFractions,
}: AssignPercentagesProps) => {
  const fractionValues = [0, 1 / 32, 1 / 16, 1 / 8, 1 / 4, 3 / 4, 1 / 2, 1];

  // Mapeo de valores a sus representaciones de fracciones
  const fractionLabels: { [key: number]: string } = {
    0: '0',
    [1 / 32]: '1/32',
    [1 / 16]: '1/16',
    [1 / 8]: '1/8',
    [1 / 4]: '1/4',
    [1 / 2]: '1/2',
    [3 / 4]: '3/4',
    1: '1',
  };

  const calculateTotal = (BroodIndex: number) => {
    return fractions[BroodIndex].reduce((sum, fraction) => sum + fraction, 0);
  };
  useEffect(() => {
    setBroods((prevBroods) => {
      const newBroods = [...prevBroods];
      broods.forEach((brood, BroodIndex) => {
        brood.lineages.forEach((linaje, linajeIndex) => {
          newBroods[BroodIndex].lineages[linajeIndex].percentage =
            fractions[BroodIndex][linajeIndex];
        });
      });
      return newBroods;
    });
  }, [fractions]);

  const updateFraction = (
    BroodIndex: number,
    linajeIndex: number,
    increment: boolean,
  ) => {
    // Primero actualizamos las fracciones
    setFractions((prevFractions: number[][]) => {
      const newFractions: number[][] = [...prevFractions];
      const currentIndex: number = fractionValues.indexOf(
        newFractions[BroodIndex][linajeIndex],
      );
      if (increment && currentIndex < fractionValues.length - 1) {
        newFractions[BroodIndex][linajeIndex] =
          fractionValues[currentIndex + 1];
      } else if (!increment && currentIndex > 0) {
        newFractions[BroodIndex][linajeIndex] =
          fractionValues[currentIndex - 1];
      }

      // Actualizamos las fracciones primero
      return newFractions;
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="flex-1 my-14">
        <CustomProgressBar stage={3} />
        <View className="p-4">
          <Text className="text-lg font-bold mb-2">Razas del animal</Text>
          <Text className="text-base text-gray-500 mb-4">
            Llena los datos por linaje hasta llegar a 100% para cada animal.
          </Text>
          {broods.map(
            (brood, BroodIndex) =>
              brood.lineages.length > 0 && (
                <View key={BroodIndex} className="bg-white p-5 rounded-xl my-3">
                  <Text className="text-lg font-semibold mb-2">
                    Animal {BroodIndex + 1}
                  </Text>
                  {brood.lineages.map((linaje, linajeIndex) => (
                    <View
                      key={linajeIndex}
                      style={{ maxHeight: 60 }} // Altura mínima para que los botones no se muevan
                      className="flex-row items-center justify-between mb-4 bg-gray-100 rounded-lg"
                    >
                      {/* Contenedor para el botón "-" con la línea vertical a la derecha */}
                      <TouchableOpacity
                        onPress={() =>
                          updateFraction(BroodIndex, linajeIndex, false)
                        }
                      >
                        <View
                          style={{
                            borderRightWidth: 1,
                            borderColor: '#ccc',
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                          }}
                          className="h-full"
                        >
                          <Text className="text-2xl font-bold">-</Text>
                        </View>
                      </TouchableOpacity>

                      <View className="flex-1 items-center p-2">
                        <Text className="text-lg">{linaje.name}</Text>
                        <Text className="text-base text-gray-500">
                          {fractionLabels[fractions[BroodIndex][linajeIndex]]}
                        </Text>
                      </View>

                      {/* Contenedor para el botón "+" con la línea vertical a la izquierda */}
                      <TouchableOpacity
                        onPress={() =>
                          updateFraction(BroodIndex, linajeIndex, true)
                        }
                      >
                        <View
                          style={{
                            borderLeftWidth: 1,
                            borderColor: '#ccc',
                            justifyContent: 'center',
                            paddingHorizontal: 20,
                          }}
                          className="h-full"
                        >
                          <Text className="text-2xl font-bold">+</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ))}
                  <Text className="text-xl font-bold mt-4 text-center">
                    Total: {(calculateTotal(BroodIndex) * 100).toFixed(0)}%
                  </Text>
                </View>
              ),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AssignPercentages;
