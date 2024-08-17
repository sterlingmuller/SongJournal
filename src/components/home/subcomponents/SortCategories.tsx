import React from 'react';
import { View } from 'react-native';

import { SORT_BY_OPTIONS } from '@src/components/common/constants';
import SortByCategory from '@src/components/home/subcomponents/SortByCategory';
import useSortByModalStyles from '@src/styles/sortByModal';
import { SortBy } from '@src/components/common/enums';

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
