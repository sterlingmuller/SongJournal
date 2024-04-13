import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import headerStyles from '@styles/header'
import SearchBar from '@src/home/subcomponents/SearchBar';

const Header = ({isSortOpen, setIsSortOpen}) => {
const toggleSort = () => setIsSortOpen(!isSortOpen);

   return (
    <View style={headerStyles.container}>
      <SearchBar />
      <TouchableOpacity onPress={toggleSort}>
      {isSortOpen ? <Entypo name="dots-three-horizontal" size={24} color="black" /> : <Entypo name="dots-three-vertical" size={24} color="black" />}
      </TouchableOpacity>
    </View>
   );
};

export default Header;