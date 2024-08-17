import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import SearchBar from '@src/components/home/subcomponents/SearchBar';
import useHomeHeaderStyles from '@src/styles/homeHeader';
import HorzDotsIcon from '@src/icons/HorzDotsIcon';
import VertDotsIcon from '@src/icons/VertDotsIcon';

interface Props {
  isSortOpen: boolean;
  setIsSortOpen: (value: boolean) => void;
  searchText: string;
  setSearchText: (value: string) => void;
}

const HomeHeader = (props: Props) => {
  const { isSortOpen, setIsSortOpen, searchText, setSearchText } = props;

  const toggleSort = () => setIsSortOpen(!isSortOpen);
  const styles = useHomeHeaderStyles();

  return (
    <View style={styles.container}>
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <TouchableOpacity onPress={toggleSort}>
        {isSortOpen ? <HorzDotsIcon /> : <VertDotsIcon />}
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
