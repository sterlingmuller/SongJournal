import React, { useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useSearchBarStyle from '@src/styles/search';
import useDebounce from '@src/utils/hooks/useDebounce';

interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchBar = ({ searchText, setSearchText }: Props) => {
  const styles = useSearchBarStyle();
  const [localSearchText, setLocalSearchText] = useState(searchText);

  useEffect(() => {
    setLocalSearchText(searchText);
  }, [searchText]);

  const debouncedSearch = useDebounce((text: string) => {
    setSearchText(text);
  }, 400);

  const handleTextChange = (text: string) => {
    setLocalSearchText(text);
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search songs..."
        value={localSearchText}
        onChangeText={handleTextChange}
      />
      <Ionicons name="search" size={24} color="black" />
    </View>
  );
};

export default SearchBar;
