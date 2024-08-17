import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import SortByCategories from '@src/components/home/subcomponents/SortCategories';
import { FilterOptions } from '@src/components/common/types';
import useSortByModalStyles from '@src/styles/sortByModal';
import { SortBy } from '@src/components/common/enums';

interface Props {
  sortedCategory: SortBy;
  setSortedCategory: (categoryName: SortBy) => void;
  isSortOpen: boolean;
  setIsSortOpen: (value: boolean) => void;
  isSortAscending: boolean;
  setIsSortAscending: (value: boolean) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
}

const SortByModal = (props: Props) => {
  const {
    sortedCategory,
    setSortedCategory,
    isSortOpen,
    setIsSortOpen,
    isSortAscending,
    setIsSortAscending,
    filterOptions,
    setFilterOptions,
  } = props;
  const styles = useSortByModalStyles();
  const onExitPress = () => setIsSortOpen(false);

  // Add filter toggles here

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
