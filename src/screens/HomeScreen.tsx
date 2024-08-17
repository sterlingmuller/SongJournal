import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

import HomeHeader from '@src/components/home/components/HomeHeader';
import CreateNewSongButton from '@src/components/home/components/CreateNewSongButton';
import SortByModal from '@src/components/home/components/SortByModal';
import NewSongModal from '@src/components/home/components/NewSongModal';
import Footer from '@src/components/home/components/Footer';
import { FilterOptions, DeleteObject } from '@src/components/common/types';
import DeleteModal from '@src/components/common/components/DeleteModal';
import { DELETE_SONG_TEXT, EMPTY_DELETE_OBJECT } from '@src/components/common/constants';
import useGlobalStyles from '@styles/global';
import { useAppDispatch } from '@src/utils/hooks/typedReduxHooks';
import { fetchSongsWithTakesRequest } from '@src/state/sagas/actionCreators';
import HomeDisplay from '@src/components/home/components/HomeDisplay';
import { SortBy } from '@src/components/common/enums';

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
