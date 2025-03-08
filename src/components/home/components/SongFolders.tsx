import React, { useEffect, useRef } from 'react';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

import SongFolder from '@src/components/home/subcomponents/SongFolder';
import DeleteRow from '@src/components/home/subcomponents/DeleteRow';
import { ListRenderItemInfo } from 'react-native';
import * as t from '@src/components/common/types';
import { Filter, SortBy } from '@src/components/common/enums';
import { useProcessSongs } from '@src/hooks/useProcessSongs';

interface Props {
  setToDelete: (value: t.DeleteObject | null) => void;
  setTitleToEdit: (value: {
    songTitle: string;
    songId: number;
    artistId?: number;
    hasLyrics?: boolean;
  }) => void;
  sortedCategory: SortBy;
  isSortAscending: boolean;
  activeFilters: Filter[];
  songs: t.Songs;
  searchText: string;
}

const SongFolders = (props: Props) => {
  const {
    setToDelete,
    setTitleToEdit,
    sortedCategory,
    isSortAscending,
    activeFilters,
    songs,
    searchText,
  } = props;

  const songsToDisplay = useProcessSongs(
    songs,
    sortedCategory,
    isSortAscending,
    activeFilters,
    searchText,
  );

  const openRowRef = useRef(null);

  useEffect(() => {
    if (openRowRef.current) {
      openRowRef.current.closeRow();
    }
  }, [songs]);

  const onRowDidOpen = (rowKey: string, rowMap: RowMap<t.Song>) => {
    openRowRef.current = rowMap[rowKey];
  };

  return (
    <SwipeListView
      contentContainerStyle={{ paddingBottom: 200 }}
      data={songsToDisplay}
      disableRightSwipe
      previewRowKey={'0'}
      previewOpenValue={-40}
      previewOpenDelay={3000}
      keyExtractor={(item: t.Song) => item.songId.toString()}
      onRowDidOpen={onRowDidOpen}
      renderItem={(data: ListRenderItemInfo<t.Song>) => {
        return <SongFolder song={data.item} setTitleToEdit={setTitleToEdit} />;
      }}
      renderHiddenItem={(data: ListRenderItemInfo<t.SongItem>) => (
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
