import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import HomeHeader from '@src/home/components/HomeHeader';
import CreateNewSongButton from '@src/home/components/CreateNewSongButton';
import SongFolder from '@src/home/components/SongFolder';
import SortByModal from '@src/home/components/SortByModal';
import global from '@styles/global';
import NewSongModal from '@src/home/components/NewSongModal';
import Footer from '@src/home/components/Footer';
import { sortByCategoryName } from '@src/common/types';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortedCategory, setSortedCategory] = useState<sortByCategoryName>('Date');
  const [isSortAscending, setIsSortAscending] = useState(false);
  const [isNewSongOpen, setIsNewSongOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen} />,
    });
  }, [isSortOpen, setIsSortOpen]);

  return (
    <View style={global.container}>
      <SongFolder song="Dubble Bubble" />
      <SongFolder song="Try To" />
      <SongFolder song="Fresh Towel" />
      <SongFolder song="Belly" />
      <SongFolder song="Sludge" />
      <SongFolder song="Virus" />
      <CreateNewSongButton setIsNewSongOpen={setIsNewSongOpen} />
      <SortByModal
        isSortOpen={isSortOpen}
        setIsSortOpen={setIsSortOpen}
        sortedCategory={sortedCategory}
        setSortedCategory={setSortedCategory}
        isSortAscending={isSortAscending}
        setIsSortAscending={setIsSortAscending}
      />
      <NewSongModal isNewSongOpen={isNewSongOpen} setIsNewSongOpen={setIsNewSongOpen} />
      <Footer />
    </View>
  );
};

export default HomeScreen;
