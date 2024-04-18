import React from 'react';
import {
  View, Text, Modal, TouchableOpacity,
} from 'react-native';

import sortByModalStyle from '@styles/sortByModal';
import SortByCategories from '@src/home/subcomponents/SortCategories';
import { sortByCategoryName } from '@src/common/types';

interface Props {
  sortedCategory: sortByCategoryName;
  setSortedCategory: (categoryName: sortByCategoryName) => void;
  isSortOpen: boolean;
  setIsSortOpen: (value: boolean) => void;
  isSortAscending: boolean;
  setIsSortAscending: (value: boolean) => void;
}

const SortByModal = (props: Props) => {
  const {
    sortedCategory,
    setSortedCategory,
    isSortOpen,
    setIsSortOpen,
    isSortAscending,
    setIsSortAscending,
  } = props;

  return (
    <Modal transparent visible={isSortOpen}>
      <TouchableOpacity
        style={sortByModalStyle.modalContainer}
        activeOpacity={1}
        onPress={() => setIsSortOpen(false)}
      >
        <View style={sortByModalStyle.container}>
          <Text style={sortByModalStyle.title}>Sort by</Text>
          <View style={sortByModalStyle.line} />
          <SortByCategories
            sortedCategory={sortedCategory}
            setSortedCategory={setSortedCategory}
            isSortAscending={isSortAscending}
            setIsSortAscending={setIsSortAscending}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default SortByModal;
