import React from 'react';
import { View, Text } from 'react-native';

import sortByModalStyle from '@styles/sortByModal';
import SortByCategory from './SortByCategory';

const SortByCategories = ({sortedCategory, setSortedCategory, isSortAscending, setIsSortAscending}) => {
   const categories = ['Date', 'Name', 'Length', 'Lyrics'];

   return (
      <View style={sortByModalStyle.categories}>
         {categories.map(category => <SortByCategory key={category} label={category} setSortedCategory={setSortedCategory} sortedCategory={sortedCategory} isSortAscending={isSortAscending} setIsSortAscending={setIsSortAscending}/>)}
      </View>
   );
};

export default SortByCategories;