import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import searchBarStyle from '@styles/search';

const SearchBar = ({}) => {
   const [searchText, setSearchText] = useState('');

   // const handleSearch = () => {
   //    onSearch(searchText);
   // }

   return (
    <View style={searchBarStyle.container}>
      <TextInput style={searchBarStyle.input} placeholder='Search...' value={searchText} onChangeText={(text) => setSearchText(text)} />
      <Ionicons name="search" size={24} color="black" />
    </View>
   );
};

export default SearchBar;