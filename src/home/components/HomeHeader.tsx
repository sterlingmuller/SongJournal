import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import SearchBar from '@src/home/subcomponents/SearchBar';
import useHomeHeaderStyles from '@src/styles/homeHeader';

interface Props {
  isSortOpen: boolean;
  setIsSortOpen: (value: boolean) => void;
}

const HomeHeader = ({ isSortOpen, setIsSortOpen }: Props) => {
  const toggleSort = () => setIsSortOpen(!isSortOpen);
  const styles = useHomeHeaderStyles();

  return (
    <View style={styles.container}>
      <SearchBar />
      <TouchableOpacity onPress={toggleSort}>
        {isSortOpen ? (
          <Entypo name="dots-three-horizontal" size={24} color="black" />
        ) : (
          <Entypo name="dots-three-vertical" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
