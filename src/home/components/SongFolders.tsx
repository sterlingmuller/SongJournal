import React from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';

import SongFolder from '@src/home/subcomponents/SongFolder';
import DeleteRow from '@src/home/subcomponents/DeleteRow';
import { ListRenderItemInfo } from 'react-native';
import {
  FilterOptions,
  deleteObject,
  song,
  sortByCategoryName,
} from '@src/common/types';
import { useAppSelector } from '@src/common/hooks';
import { selectSongs } from '@src/selectors/songsSelector';
import useAudioPlayer from '@src/utils/useAudioPlayer';
import { sortSongs } from '@src/utils/sortSongs';

interface Props {
  setToDelete: (value: deleteObject | null) => void;
  sortedCategory: sortByCategoryName;
  isSortAscending: boolean;
  filterOptions: FilterOptions;
}

const SongFolders = (props: Props) => {
  const { setToDelete, sortedCategory, isSortAscending, filterOptions } = props;
  const { togglePlayback } = useAudioPlayer();
  const songs = useAppSelector(selectSongs);

  const sortedSongs = sortSongs(
    songs,
    sortedCategory,
    isSortAscending,
    filterOptions,
  );

  return (
    <SwipeListView
      contentContainerStyle={{ paddingBottom: 200 }}
      data={sortedSongs}
      disableRightSwipe
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      renderItem={(data: ListRenderItemInfo<song>) => {
        return <SongFolder song={data.item} togglePlayback={togglePlayback} />;
      }}
      renderHiddenItem={(data: ListRenderItemInfo<song>) => (
        <DeleteRow
          title={data.item.title}
          id={data.item.songId}
          setToDelete={setToDelete}
        />
      )}
      rightOpenValue={-100}
    />
  );
};

export default SongFolders;
