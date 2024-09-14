import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import type { AnimalPostOut } from '@/api/domain';

type LinajeComponentProps = {
  animal: AnimalPostOut;
};

const linajeColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
];

const LinajeComponent = ({ animal }: LinajeComponentProps) => {
  if (!animal.lineages || animal.lineages.length === 0) {
    return (
      <View>
        <Text>No hay datos de linaje disponibles.</Text>
      </View>
    );
  }

  const linajeData = animal.lineages.map((lineage, index) => ({
    name: `Linaje ${lineage.lineage_id}`,
    population: lineage.percentage,
    color: linajeColors[index % linajeColors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 13,
  }));

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <PieChart
        data={linajeData}
        width={screenWidth}
        height={screenHeight * 0.3}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundColor: 'transparent',
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'5'}
        absolute
      />
    </View>
  );
};

export default LinajeComponent;
