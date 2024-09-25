import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import type { AnimalFamily, AnimalPostOut } from '@/api/domain';

type LinajeComponentProps = {
  animal: AnimalPostOut;
  family: AnimalFamily | null;
};

const linajeColors = [
  '#FF6384',
  '#36A2EB',
  '#FFCE56',
  '#4BC0C0',
  '#9966FF',
  '#FF9F40',
];

const LinajeComponent = ({ animal, family }: LinajeComponentProps) => {
  if (!animal.lineages || animal.lineages.length === 0) {
    return (
      <View>
        <Text>No hay datos de linaje disponibles.</Text>
      </View>
    );
  }

  const linajeData = animal.lineages.map((lineage, index) => ({
    name: `${lineage.name}`,
    population: lineage.percentage,
    color: linajeColors[index % linajeColors.length],
    legendFontColor: '#7F7F7F',
    legendFontSize: 13,
  }));

  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Sección del gráfico */}
      <PieChart
        data={linajeData}
        width={screenWidth * 0.5}
        height={screenHeight * 0.3}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundColor: 'transparent',
        }}
        accessor={'population'}
        hasLegend={false} // Este es el punto clave para desactivar la leyenda predeterminada
        backgroundColor={'transparent'}
        paddingLeft={`${screenWidth * 0.12}`}
      />

      {/* Sección de la leyenda debajo */}
      <View style={styles.legendContainer}>
        {linajeData.map((lineage, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[
                styles.legendColorBox,
                { backgroundColor: lineage.color },
              ]}
            />
            <Text
              style={styles.legendText}
            >{`${lineage.name}: ${lineage.population}%`}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Centra el gráfico y la leyenda horizontalmente
  },
  legendContainer: {
    marginTop: 20, // Espacio entre el gráfico y la leyenda
  },
  legendItem: {
    flexDirection: 'row', // Muestra los colores y textos de la leyenda en una fila
    alignItems: 'center', // Alinea verticalmente los items
    marginBottom: 5,
  },
  legendColorBox: {
    width: 20,
    height: 20,
    marginRight: 10, // Espacio entre el color y el texto
  },
  legendText: {
    fontSize: 14,
    color: '#7F7F7F',
  },
});

export default LinajeComponent;
