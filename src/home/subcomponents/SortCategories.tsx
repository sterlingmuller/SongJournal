import React from 'react';
import { View } from 'react-native';

import sortByModalStyle from '@styles/sortByModal';
import { sortByCategoryNames } from '@src/common/constants';
import SortByCategory from '@src/home/subcomponents/SortByCategory';
import { sortByCategoryName } from '@src/common/types';

interface Props {
  sortedCategory: sortByCategoryName;
  setSortedCategory: (categoryName: sortByCategoryName) => void;
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

  return (
    <View style={sortByModalStyle.categories}>
      {sortByCategoryNames.map((categoryName) => (
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
