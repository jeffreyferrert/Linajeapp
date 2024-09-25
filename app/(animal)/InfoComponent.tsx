import { Text, View, StyleSheet } from 'react-native';
import type { AnimalFamily, AnimalPostOut } from '@/api/domain';

type InfoComponentProps = {
  animal: AnimalPostOut;
  family: AnimalFamily | null;
};

const InfoComponent = ({ animal, family }: InfoComponentProps) => {
  const [mother, father] = [family?.mother, family?.father];
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Código</Text>
            <Text style={styles.value}>{animal.code}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sexo</Text>
            <Text style={styles.value}>{animal.sex}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de nacimiento</Text>
            <Text style={styles.value}>{animal.birthdate}</Text>
          </View>
          {animal.weight && (
            <View style={styles.row}>
              <Text style={styles.label}>Peso</Text>
              <Text style={styles.value}>{animal.weight} kg</Text>
            </View>
          )}
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Madre</Text>
            <Text style={styles.value}>
              {mother ? `Código ${mother?.code}` : 'No disponible'}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Padre</Text>
            <Text style={styles.value}>
              {father ? `Código ${father?.code}` : 'No disponible'}
            </Text>
          </View>
        </View>
      </View>

      <Text style={{ marginTop: 10 }}>
        {animal.name || 'Sin descripción adicional.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 5,
  },
});

export default InfoComponent;
