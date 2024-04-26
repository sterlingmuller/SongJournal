import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import HomeHeader from '@src/home/components/HomeHeader';
import CreateNewSongButton from '@src/home/components/CreateNewSongButton';
import SongFolders from '@src/home/components/SongFolders';
import SortByModal from '@src/home/components/SortByModal';
import global from '@styles/global';
import NewSongModal from '@src/home/components/NewSongModal';
import Footer from '@src/home/components/Footer';
import { sortByCategoryName } from '@src/common/types';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '@src/common/components/DeleteModal';
import { DELETE_SONG_TEXT } from '@src/common/constants';

const HomeScreen = () => {
  const { setOptions } = useNavigation();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortedCategory, setSortedCategory] =
    useState<sortByCategoryName>('Date');
  const [isSortAscending, setIsSortAscending] = useState(false);
  const [isNewSongOpen, setIsNewSongOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState('');

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <HomeHeader isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen} />
      ),
    });
  }, [isSortOpen, setIsSortOpen]);

  return (
    <View style={global.container}>
      <SongFolders setIsDeleteModalOpen={setIsDeleteModalOpen} />
      <CreateNewSongButton setIsNewSongOpen={setIsNewSongOpen} />
      <SortByModal
        isSortOpen={isSortOpen}
        setIsSortOpen={setIsSortOpen}
        sortedCategory={sortedCategory}
        setSortedCategory={setSortedCategory}
        isSortAscending={isSortAscending}
        setIsSortAscending={setIsSortAscending}
      />
      <NewSongModal
        isNewSongOpen={isNewSongOpen}
        setIsNewSongOpen={setIsNewSongOpen}
      />
      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deleteText={DELETE_SONG_TEXT}
      />
      <Footer />
    </View>
  );
};

export default HomeScreen;
