import React, { useEffect, useRef } from 'react';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

import SongFolder from '@src/home/subcomponents/SongFolder';
import DeleteRow from '@src/home/subcomponents/DeleteRow';
import { ListRenderItemInfo } from 'react-native';
import {
  FilterOptions,
  SongItem,
  deleteObject,
  song,
  songs,
  sortByCategoryName,
} from '@src/common/types';
import useAudioPlayer from '@src/utils/useAudioPlayer';
import { sortSongs } from '@src/utils/sortSongs';

interface Props {
  setToDelete: (value: deleteObject | null) => void;
  sortedCategory: sortByCategoryName;
  isSortAscending: boolean;
  filterOptions: FilterOptions;
  songs: songs;
}

const SongFolders = (props: Props) => {
  const { setToDelete, sortedCategory, isSortAscending, filterOptions, songs } =
    props;
  const { togglePlayback } = useAudioPlayer();

  const sortedSongs = sortSongs(
    songs,
    sortedCategory,
    isSortAscending,
    filterOptions,
  );

  const openRowRef = useRef(null);

  useEffect(() => {
    if (openRowRef.current) {
      openRowRef.current.closeRow();
    }
  }, [songs]);

  const onRowDidOpen = (rowKey: string, rowMap: RowMap<song>) => {
    openRowRef.current = rowMap[rowKey];
  };

  return (
    <SwipeListView
      contentContainerStyle={{ paddingBottom: 200 }}
      data={sortedSongs}
      disableRightSwipe
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      keyExtractor={(item: song) => item.songId.toString()}
      onRowDidOpen={onRowDidOpen}
      renderItem={(data: ListRenderItemInfo<song>) => {
        return <SongFolder song={data.item} togglePlayback={togglePlayback} />;
      }}
      renderHiddenItem={(data: ListRenderItemInfo<SongItem>) => (
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
