import React from 'react';
import { View } from 'react-native';

import { FILTER_OPTIONS } from '@src/components/common/constants';
import useSortByModalStyles from '@src/styles/sortByModal';
import { Filter } from '@src/components/common/enums';
import FilterToggle from '@src/components/home/subcomponents/FilterToggle';

interface Props {
  activeFilters: Filter[];
  setActiveFilters: (optionName: Filter[]) => void;
}

const FilterSection = (props: Props) => {
  const { activeFilters, setActiveFilters } = props;
  const styles = useSortByModalStyles();

  const handleCompletionToggle = (filterToUpdate: Filter) => {
    const newFilters: Filter[] = activeFilters.filter(
      (f: Filter) => f !== Filter.COMPLETED && f !== Filter.IN_PROGRESS
    );

    if (!activeFilters.includes(filterToUpdate)) {
      newFilters.push(filterToUpdate);
    }

    setActiveFilters(newFilters);
  };

  const handleLyricsToggle = (filterToUpdate: Filter) => {
    const newFilters: Filter[] = activeFilters.filter(
      (f: Filter) => f !== Filter.LYRICS && f !== Filter.LYRICLESS
    );

    if (!activeFilters.includes(filterToUpdate)) {
      newFilters.push(filterToUpdate);
    }

    setActiveFilters(newFilters);
  };

  return (
    <View style={styles.filterContainer}>
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.filter(
          (option: Filter) =>
            option === Filter.COMPLETED || option === Filter.IN_PROGRESS
        ).map((option: Filter) => (
          <FilterToggle
            key={option}
            label={option}
            isActive={activeFilters.includes(option)}
            onPress={() => handleCompletionToggle(option)}
          />
        ))}
      </View>
      <View style={styles.filterRow}>
        {FILTER_OPTIONS.filter(
          (option: Filter) =>
            option === Filter.LYRICS || option === Filter.LYRICLESS
        ).map((option: Filter) => (
          <FilterToggle
            key={option}
            label={option}
            isActive={activeFilters.includes(option)}
            onPress={() => handleLyricsToggle(option)}
          />
        ))}
      </View>
    </View>
  );
};

export default FilterSection;
