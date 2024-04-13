import React, { useState } from 'react';
import { View } from 'react-native';

import Header from '@src/home/components/Header'
import CreateNewSongButton from '@src/home/components/CreateNewSongButton';
import SongFolder from '@src/home/components/SongFolder';
import SortByModal from '@src/home/components/SortByModal';
import global from '@styles/global'

const Home = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortedCategory, setSortedCategory] = useState("Date");
  const [ isSortAscending, setIsSortAscending] = useState(false);

  return (
    <View style={global.container}>
      <Header isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen}/>
      <SongFolder song="Dubble Bubble"/>
      <SongFolder song="Try To"/>
      <CreateNewSongButton />
      <SortByModal isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen} sortedCategory={sortedCategory} setSortedCategory={setSortedCategory} isSortAscending={isSortAscending} setIsSortAscending={setIsSortAscending}/>
    </View>
  );
};

export default Home;
