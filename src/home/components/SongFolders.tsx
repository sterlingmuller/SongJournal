import React, { useEffect, useRef } from 'react';
import { RowMap, SwipeListView } from 'react-native-swipe-list-view';

import SongFolder from '@src/home/subcomponents/SongFolder';
import DeleteRow from '@src/home/subcomponents/DeleteRow';
import { ListRenderItemInfo } from 'react-native';
import * as t from '@src/common/types';
import { sortSongs } from '@src/utils/sortSongs';
import { SortBy } from '@src/common/enums';

interface Props {
  setToDelete: (value: t.DeleteObject | null) => void;
  sortedCategory: SortBy;
  isSortAscending: boolean;
  filterOptions: t.FilterOptions;
  songs: t.Songs;
}

const SongFolders = (props: Props) => {
  const { setToDelete, sortedCategory, isSortAscending, filterOptions, songs } =
    props;

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

  const onRowDidOpen = (rowKey: string, rowMap: RowMap<t.Song>) => {
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
      keyExtractor={(item: t.Song) => item.songId.toString()}
      onRowDidOpen={onRowDidOpen}
      renderItem={(data: ListRenderItemInfo<t.Song>) => {
        return <SongFolder song={data.item} />;
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
