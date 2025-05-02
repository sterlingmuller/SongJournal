import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useSortByModalStyles from '@src/styles/sortByModal';
import ArrowUpIcon from '@src/icons/ArrowUpIcon';
import ArrowDownIcon from '@src/icons/ArrowDownIcon';
import { SortBy } from '@src/components/common/enums';

interface Props {
  sortedCategory: SortBy;
  setSortedCategory: (categoryName: SortBy) => void;
  isSortAscending: boolean;
  setIsSortAscending: (value: boolean) => void;
  label: SortBy;
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
    if (isSelected) {
      setIsSortAscending(!isSortAscending);
    } else {
      setSortedCategory(label);
    }
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
