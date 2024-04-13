import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

import sortByModalStyle from '@styles/sortByModal';
import SortByCategories from '@src/home/subcomponents/SortCategories';

const SortByModal = ({sortedCategory, setSortedCategory, setIsSortOpen, isSortAscending, isSortOpen, setIsSortAscending}) => {


   return (
  <Modal transparent={true} visible={isSortOpen}>
            <TouchableOpacity
          style={sortByModalStyle.modalContainer}
          activeOpacity={1}
          onPress={() => setIsSortOpen(false)}
        >
    <View style={sortByModalStyle.container}>
      <Text style={sortByModalStyle.title}>Sort by</Text>
      <View style={sortByModalStyle.line}/>
      <SortByCategories sortedCategory={sortedCategory} setSortedCategory={setSortedCategory} isSortAscending={isSortAscending} setIsSortAscending={setIsSortAscending}/>
    </View>
    </TouchableOpacity>
  </Modal>
   );
};

export default SortByModal;