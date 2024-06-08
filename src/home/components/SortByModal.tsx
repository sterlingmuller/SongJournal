import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

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
  const onExitPress = () => setIsSortOpen(false);

  return (
    <Modal
      isVisible={isSortOpen}
      avoidKeyboard
      onBackdropPress={onExitPress}
      style={{ margin: 0 }}
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
    </Modal>
  );
};

export default SortByModal;
