import React from 'react';
import { View, Text } from 'react-native';
import Modal from 'react-native-modal';

import SortByCategories from '@src/components/home/subcomponents/SortCategories';
import useSortByModalStyles from '@src/styles/sortByModal';
import { Filter, SortBy } from '@src/components/common/enums';
import FilterSection from '../subcomponents/FilterSection';

interface Props {
  sortedCategory: SortBy;
  setSortedCategory: (categoryName: SortBy) => void;
  isSortOpen: boolean;
  setIsSortOpen: (value: boolean) => void;
  isSortAscending: boolean;
  setIsSortAscending: (value: boolean) => void;
  activeFilters: Filter[];
  setActiveFilters: (value: Filter[]) => void;
}

const SortByModal = (props: Props) => {
  const {
    sortedCategory,
    setSortedCategory,
    isSortOpen,
    setIsSortOpen,
    isSortAscending,
    setIsSortAscending,
    activeFilters,
    setActiveFilters,
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
        <Text style={styles.title}>Filter</Text>
        <View style={styles.line} />
        <FilterSection
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
      </View>
    </Modal>
  );
};

export default SortByModal;
