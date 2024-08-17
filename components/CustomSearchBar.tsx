import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

type CustomSearchBarProps = {
  placeholder: string;
  value: string;
};

const CustomSearchBar = ({ placeholder, value }: CustomSearchBarProps) => {
  const [query, setQuery] = useState(value || '');

  const handleSearch = () => {
    if (query === '') {
      Alert.alert(
        'Missing Query',
        'Please input something to search results across database',
      );
      return;
    }
    Alert.alert('Search', `Searching by ${query}`);
  };

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
        onSubmitEditing={handleSearch}
        className={'w-full'}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Entypo name="magnifying-glass" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearchBar;
