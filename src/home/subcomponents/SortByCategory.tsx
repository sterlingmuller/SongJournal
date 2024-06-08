import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { sortByCategoryName } from '@src/common/types';
import useSortByModalStyles from '@styles/sortByModal';
import ArrowUpIcon from '@src/icons/ArrowUpIcon';
import ArrowDownIcon from '@src/icons/ArrowDownIcon';

interface Props {
  sortedCategory: sortByCategoryName;
  setSortedCategory: (categoryName: sortByCategoryName) => void;
  isSortAscending: boolean;
  setIsSortAscending: (value: boolean) => void;
  label: sortByCategoryName;
}

const SortByCategory = (props: Props) => {
  const styles = useSortByModalStyles();
  const {
    sortedCategory,
    setSortedCategory,
    isSortAscending,
    setIsSortAscending,
    label,
  } = props;

  const isSelected: boolean = sortedCategory === label;

  const onPress = () => {
    isSelected
      ? setIsSortAscending(!isSortAscending)
      : setSortedCategory(label);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={isSelected && styles.selectedCategory}
    >
      {isSelected && (
        <View style={styles.arrow}>
          {isSortAscending ? <ArrowUpIcon /> : <ArrowDownIcon />}
        </View>
      )}
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SortByCategory;
