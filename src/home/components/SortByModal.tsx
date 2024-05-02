import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import SortByCategories from '@src/home/subcomponents/SortCategories';
import { sortByCategoryName } from '@src/common/types';
import useSortByModalStyles from '@styles/sortByModal';

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
  const styles = useSortByModalStyles();

  return (
    <Modal transparent visible={isSortOpen}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => setIsSortOpen(false)}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Sort by</Text>
          <View style={styles.line} />
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
