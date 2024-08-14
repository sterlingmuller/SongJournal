import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

import HomeHeader from '@src/home/components/HomeHeader';
import CreateNewSongButton from '@src/home/components/CreateNewSongButton';
import SortByModal from '@src/home/components/SortByModal';
import NewSongModal from '@src/home/components/NewSongModal';
import Footer from '@src/home/components/Footer';
import { FilterOptions, DeleteObject } from '@src/common/types';
import DeleteModal from '@src/common/components/DeleteModal';
import { DELETE_SONG_TEXT, EMPTY_DELETE_OBJECT } from '@src/common/constants';
import useGlobalStyles from '@styles/global';
import { useAppDispatch } from '@src/hooks/typedReduxHooks';
import { fetchSongsWithTakesRequest } from '@src/sagas/actionCreators';
import HomeDisplay from '@src/home/components/HomeDisplay';
import { SortBy } from '@src/common/enums';

const HomeScreen = () => {
  const { setOptions } = useNavigation();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const styles = useGlobalStyles();

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortedCategory, setSortedCategory] = useState<SortBy>(SortBy.DATE);
  const [isSortAscending, setIsSortAscending] = useState<boolean>(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [searchText, setSearchText] = useState(null);

  const [isNewSongOpen, setIsNewSongOpen] = useState<boolean>(false);
  const [toDelete, setToDelete] = useState<DeleteObject>(EMPTY_DELETE_OBJECT);

  useEffect(() => {
    dispatch(fetchSongsWithTakesRequest(db));
  }, []);

  useLayoutEffect(() => {
    setOptions({
      header: () => (
        <HomeHeader
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      ),
    });
  }, [isSortOpen, setIsSortOpen]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <HomeDisplay
          setToDelete={setToDelete}
          sortedCategory={sortedCategory}
          isSortAscending={isSortAscending}
          filterOptions={filterOptions}
          searchText={searchText}
        />
        <CreateNewSongButton setIsNewSongOpen={setIsNewSongOpen} />
        <SortByModal
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          sortedCategory={sortedCategory}
          setSortedCategory={setSortedCategory}
          isSortAscending={isSortAscending}
          setIsSortAscending={setIsSortAscending}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
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
      </View>
      <Footer />
    </View>
  );
};

export default HomeScreen;
