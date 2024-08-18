import { Text, View, StyleSheet } from 'react-native';

const InfoComponent = ({ animal }) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Placa</Text>
            <Text style={styles.value}>{animal.plaque}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Sexo</Text>
            <Text style={styles.value}>{animal.sex}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Fecha de nacimiento</Text>
            <Text style={styles.value}>{animal.birthday}</Text>
          </View>
        </View>
        <View style={styles.column}>
          <View style={styles.row}>
            <Text style={styles.label}>Madre</Text>
            <Text style={styles.value}>placa {animal.mother}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Padre</Text>
            <Text style={styles.value}>placa {animal.father}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Linaje</Text>
            <View style={styles.list}>
              {Object.entries(animal.linaje).map(([key, value]) => (
                <View style={styles.listItem} key={key}>
                  <Text style={styles.label}>{key}:</Text>
                  <Text style={styles.value}>{value * 100}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
        placerat leo. Aenean cursus et lacus a suscipit. Aenean sem magna,
        lobortis vel metus a, sagittis faucibus dui. Donec blandit tortor sit
        amet lectus rutrum, non scelerisque arcu fringilla. Sed vestibulum metus
        quis odio ultricies, interdum malesuada nulla semper. Nam laoreet
        tristique ligula non rhoncus. Mauris quis risus vel mi faucibus finibus.
        Phasellus iaculis odio risus, ac tincidunt odio interdum et.
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
  list: {
    marginLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 5,
  },
});

export default InfoComponent;
