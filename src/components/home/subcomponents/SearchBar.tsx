import React, { useState, useEffect } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useSearchBarStyle from '@src/styles/search';
import useDebounce from '@src/hooks/useDebounce';
import { useColorTheme } from '@src/state/context/ThemeContext';
import CloseIcon from '@src/icons/CloseIcon';

interface Props {
  searchText: string;
  setSearchText: (value: string) => void;
}

const SearchBar = ({ searchText, setSearchText }: Props) => {
  const styles = useSearchBarStyle();
  const { theme } = useColorTheme();
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

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="search" size={22} color={theme.placeholderText} />
      <TextInput
        style={styles.input}
        placeholder="Search songs"
        placeholderTextColor={theme.placeholderText}
        value={localSearchText}
        onChangeText={handleTextChange}
        autoCapitalize="words"
        autoCorrect={false}
      />
      {localSearchText && (
        <TouchableOpacity style={styles.close} onPress={clearSearch}>
          <CloseIcon color={theme.placeholderText} size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
