import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import useSortByModalStyles from '@src/styles/sortByModal';
import { Filter } from '@src/components/common/enums';

interface Props {
  filterOption: Filter;
  setActiveFilters: (value: Filter[]) => void;
}

const FilterOption = (props: Props) => {
  const styles = useSortByModalStyles();
  const { filterOption, setActiveFilters } = props;

  const isSelected: boolean = filterOption === label;

  const onPress = () => {};

  return (
    <TouchableOpacity
      onPress={onPress}
      style={isSelected && styles.selectedCategory}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default FilterOption;
