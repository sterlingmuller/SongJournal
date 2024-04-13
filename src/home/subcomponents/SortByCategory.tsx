import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import sortByModalStyle from '@styles/sortByModal';

const SortByCategory = ({setSortedCategory, sortedCategory, label, isSortAscending, setIsSortAscending}) => {
   const isSelected = sortedCategory === label;

   const onPress = () => {
      isSelected ? setIsSortAscending(!isSortAscending) : setSortedCategory(label)
   };

   return (
      <TouchableOpacity onPress={onPress} style={isSelected && sortByModalStyle.selectedCategory} >
            {isSelected && <View>
               {isSortAscending ? <AntDesign style={sortByModalStyle.arrow} name="arrowup" size={24} color="black"/> : <AntDesign style={sortByModalStyle.arrow} name="arrowdown" size={24} color="black" />}
            </View>}
            <Text style={sortByModalStyle.label}>{label}</Text>
      </TouchableOpacity>
   );
};

export default SortByCategory;