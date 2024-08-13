import React from 'react';
import { View } from 'react-native';

import { SORT_BY_OPTIONS } from '@src/common/constants';
import SortByCategory from '@src/home/subcomponents/SortByCategory';
import useSortByModalStyles from '@styles/sortByModal';
import { SortBy } from '@src/common/enums';

interface Props {
  sortedCategory: SortBy;
  setSortedCategory: (categoryName: SortBy) => void;
  isSortAscending: boolean;
  setIsSortAscending: (value: boolean) => void;
}

const SortByCategories = (props: Props) => {
  const {
    sortedCategory,
    setSortedCategory,
    isSortAscending,
    setIsSortAscending,
  } = props;
  const styles = useSortByModalStyles();

  return (
    <View style={styles.categories}>
      {SORT_BY_OPTIONS.map((categoryName: SortBy) => (
        <SortByCategory
          key={categoryName}
          label={categoryName}
          setSortedCategory={setSortedCategory}
          sortedCategory={sortedCategory}
          isSortAscending={isSortAscending}
          setIsSortAscending={setIsSortAscending}
        />
      ))}
    </View>
  );
};

export default SortByCategories;
