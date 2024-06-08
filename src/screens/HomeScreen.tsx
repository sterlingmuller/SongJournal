import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';

import HomeHeader from '@src/home/components/HomeHeader';
import CreateNewSongButton from '@src/home/components/CreateNewSongButton';
import SongFolders from '@src/home/components/SongFolders';
import SortByModal from '@src/home/components/SortByModal';
import NewSongModal from '@src/home/components/NewSongModal';
import Footer from '@src/home/components/Footer';
import { deleteObject, sortByCategoryName } from '@src/common/types';
import { useNavigation } from '@react-navigation/native';
import DeleteModal from '@src/common/components/DeleteModal';
import { DELETE_SONG_TEXT, EMPTY_DELETE_OBJECT } from '@src/common/constants';
import useGlobalStyles from '@styles/global';
import { useSQLiteContext } from 'expo-sqlite';
import { useAppDispatch } from '@src/common/hooks';
import { fetchSongsWithTakesRequest } from '@src/sagas/actionCreators';

const HomeScreen = () => {
  const { setOptions } = useNavigation();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const styles = useGlobalStyles();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortedCategory, setSortedCategory] =
    useState<sortByCategoryName>('Date');
  const [isSortAscending, setIsSortAscending] = useState<boolean>(false);

  const [isNewSongOpen, setIsNewSongOpen] = useState<boolean>(false);
  const [toDelete, setToDelete] = useState<deleteObject>(EMPTY_DELETE_OBJECT);

  useEffect(() => {
    dispatch(fetchSongsWithTakesRequest(db));
  }, []);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <HomeHeader isSortOpen={isSortOpen} setIsSortOpen={setIsSortOpen} />
      ),
    });
  }, [isSortOpen, setIsSortOpen]);

  return (
    <View style={styles.container}>
      <SongFolders
        setToDelete={setToDelete}
        sortedCategory={sortedCategory}
        isSortAscending={isSortAscending}
      />
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
        deleteText={DELETE_SONG_TEXT}
        toDelete={toDelete}
        setToDelete={setToDelete}
      />
      <Footer />
    </View>
  );
};

export default HomeScreen;
