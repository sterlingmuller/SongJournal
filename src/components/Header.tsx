import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import headerStyles from '../styles/header'
import SearchBar from './SearchBar';

const Header = () => {
   return (
    <View style={headerStyles.container}>
      <SearchBar />
      <Entypo name="dots-three-vertical" size={24} color="black" />
    </View>
   );
};

export default Header;