import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import SearchBar from '@src/home/subcomponents/SearchBar';
import useHomeHeaderStyles from '@styles/homeHeader';
import HorzDotsIcon from '@src/icons/HorzDotsIcon';
import VertDotsIcon from '@src/icons/VertDotsIcon';

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
        {isSortOpen ? <HorzDotsIcon /> : <VertDotsIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
