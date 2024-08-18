import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const linajeColors = {
  Jumper: '#FF6384',
  Criollo: '#36A2EB',
  McRae: '#FFCE56',
  Sweater: '#4BC0C0',
  Hatch: '#9966FF',
  Albany: '#FF9F40',
};

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const LinajeComponent = ({ animal }) => {
  const linajeData = Object.entries(animal.linaje).map(([key, value]) => ({
    name: key,
    population: value * 100,
    color: linajeColors[key],
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
        chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'5'}
        absolute
      />
    </View>
  );
};

export default LinajeComponent;
