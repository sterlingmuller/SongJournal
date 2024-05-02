import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import useSearchBarStyle from '@styles/search';

const SearchBar = () => {
  const styles = useSearchBarStyle();
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchText}
        onChangeText={(text: string) => setSearchText(text)}
      />
      <Ionicons name="search" size={24} color="black" />
    </View>
  );
};

export default SearchBar;
