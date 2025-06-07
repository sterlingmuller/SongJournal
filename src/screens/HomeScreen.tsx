import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeHeader from '@src/components/home/components/HomeHeader';
import CreateNewSongButton from '@src/components/home/components/CreateNewSongButton';
import SortByModal from '@src/components/home/components/SortByModal';
import NewSongModal from '@src/components/home/components/NewSongModal';
import { DeleteObject, Sort } from '@src/components/common/types';
import DeleteModal from '@src/components/common/components/DeleteModal';
import {
  DELETE_SONG_TEXT,
  EMPTY_DELETE_OBJECT,
} from '@src/components/common/constants';
import useGlobalStyles from '@styles/global';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import HomeDisplay from '@src/components/home/components/HomeDisplay';
import { Filter, SortBy } from '@src/components/common/enums';
import EditTitleModal from '@src/components/common/components/EditTitleModal';
import { selectDefaultSort } from '@src/state/selectors/settingsSelector';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { selectPlaybackUri } from '@src/state/selectors/playbackSelector';

const HomeScreen = () => {
  const { setOptions, addListener } = useNavigation();
  const styles = useGlobalStyles();
  const defaultSort: Sort = useAppSelector(selectDefaultSort);
  const { clearPlayback } = useAudioPlayer();
  const playbackUri = useAppSelector(selectPlaybackUri);

  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortedCategory, setSortedCategory] = useState<SortBy>(
    defaultSort.sortType,
  );
  const [isSortAscending, setIsSortAscending] = useState<boolean>(
    defaultSort.isAscending,
  );
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [searchText, setSearchText] = useState(null);
  const [isNewSongOpen, setIsNewSongOpen] = useState<boolean>(false);
  const [titleToEdit, setTitleToEdit] = useState<{
    songTitle: string;
    songId: number;
  }>({ songTitle: '', songId: -1 });
  const [toDelete, setToDelete] = useState<DeleteObject>(EMPTY_DELETE_OBJECT);

  useEffect(() => {
    const { sortType: defaultSortType, isAscending: defaultIsAscending } =
      defaultSort;

    if (defaultSortType !== sortedCategory) {
      setSortedCategory(defaultSortType);
    }
    if (defaultIsAscending !== isSortAscending) {
      setIsSortAscending(defaultIsAscending);
    }
  }, [defaultSort]);

  useEffect(() => {
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
  }, [setOptions, isSortOpen, setIsSortOpen, searchText, setSearchText]);

useEffect(() => {
  const unsubscribe = addListener('blur', () => {
    if (playbackUri) {
      clearPlayback();
    }
  });

  return unsubscribe;
}, [addListener, playbackUri]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <HomeDisplay
          setToDelete={setToDelete}
          setTitleToEdit={setTitleToEdit}
          sortedCategory={sortedCategory}
          isSortAscending={isSortAscending}
          activeFilters={activeFilters}
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
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
        />
        <NewSongModal
          isNewSongOpen={isNewSongOpen}
          setIsNewSongOpen={setIsNewSongOpen}
        />
        <EditTitleModal
          titleToEdit={titleToEdit}
          setTitleToEdit={setTitleToEdit}
        />
        <DeleteModal
          deleteText={DELETE_SONG_TEXT}
          toDelete={toDelete}
          setToDelete={setToDelete}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
