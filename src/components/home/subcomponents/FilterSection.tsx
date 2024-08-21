import React from 'react';
import { View } from 'react-native';

import { FILTER_OPTIONS } from '@src/components/common/constants';
import useSortByModalStyles from '@src/styles/sortByModal';
import { Filter } from '@src/components/common/enums';
import FilterCategory from './FilterOption';

interface Props {
  activeFilters: Filter[];
  setActiveFilters: (optionName: Filter[]) => void;
}

const FilterSection = (props: Props) => {
  const { activeFilters, setActiveFilters } = props;
  const styles = useSortByModalStyles();

  return (
    <View style={styles.categories}>
      {FILTER_OPTIONS.map((optionName: Filter) => (
        <FilterCategory
          key={optionName}
          setActiveFilters={setActiveFilters}
          filterOption={optionName}
        />
      ))}
    </View>
  );
};

export default FilterSection;
