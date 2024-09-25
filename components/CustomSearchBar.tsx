import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

type CustomSearchBarProps = {
  placeholder: string;
  value: string;
  handleSearch: (query: string) => void;
};

const CustomSearchBar = ({
  placeholder,
  value,
  handleSearch,
}: CustomSearchBarProps) => {
  const [query, setQuery] = useState(value || '');

  return (
    <View
      className={
        'flex flex-row bg-white w-72 h-12 pl-4 pr-8 rounded-2xl items-center focus:border-2 border-primary'
      }
    >
      <TextInput
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => setQuery(text)}
        onSubmitEditing={() => handleSearch(query)}
        className={'w-full'}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === '') {
            Alert.alert('Error', 'Ingrese un valor para buscar');
            return;
          }
          handleSearch(query);
        }}
      >
        <Entypo name="magnifying-glass" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearchBar;
