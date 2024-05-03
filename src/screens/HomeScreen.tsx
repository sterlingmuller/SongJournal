import React, { useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import HomeHeader from '@src/home/components/HomeHeader';
import CreateNewSongButton from '@src/home/components/CreateNewSongButton';
import SongFolders from '@src/home/components/SongFolders';
import SortByModal from '@src/home/components/SortByModal';
import NewSongModal from '@src/home/components/NewSongModal';
import Footer from '@src/home/components/Footer';
import { song, sortByCategoryName } from '@src/common/types';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '@src/common/components/DeleteModal';
import { DELETE_SONG_TEXT, EMPTY_SONG } from '@src/common/constants';
import useGlobalStyles from '@styles/global';

const HomeScreen = () => {
  const { setOptions } = useNavigation();
  const styles = useGlobalStyles();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortedCategory, setSortedCategory] =
    useState<sortByCategoryName>('Date');
  const [isSortAscending, setIsSortAscending] = useState<boolean>(false);
  const [isNewSongOpen, setIsNewSongOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [toDelete, setToDelete] = useState<song>(EMPTY_SONG);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <HomeHeader isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen} />
      ),
    });
  }, [isSortOpen, setIsSortOpen]);

  return (
    <View style={styles.container}>
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
        toDelete={toDelete}
        setToDelete={setToDelete}
      />
      <Footer />
    </View>
  );
};

export default HomeScreen;
