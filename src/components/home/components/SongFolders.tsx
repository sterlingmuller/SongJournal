import React, { useEffect, useRef } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import SongFolder from '@src/components/home/subcomponents/SongFolder';
import DeleteRow from '@src/components/home/subcomponents/DeleteRow';
import * as t from '@src/components/common/types';
import { Filter, SortBy } from '@src/components/common/enums';
import { useProcessSongs } from '@src/hooks/useProcessSongs';
import SwipeableFlashList from '@src/components/common/components/SwipeableFlashList';
import { SwipeableItemRef } from '@src/components/common/components/SwipeableItem';

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

  const openRowRef = useRef<SwipeableItemRef | null>(null);

  useEffect(() => {
    if (openRowRef.current) {
      openRowRef.current.closeRow();
    }
  }, [songs]);

  const onRowDidOpen = (
    rowKey: string,
    rowMap: Map<string, React.RefObject<SwipeableItemRef>>,
  ) => {
    const rowRef = rowMap.get(rowKey);
    if (rowRef?.current) {
      openRowRef.current = rowRef.current;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SwipeableFlashList
        data={songsToDisplay}
        keyExtractor={(item: t.Song) => item.songId.toString()}
        onRowDidOpen={onRowDidOpen}
        renderItem={({ item }: ListRenderItemInfo<t.Song>) => (
          <SongFolder song={item} setTitleToEdit={setTitleToEdit} />
        )}
        renderHiddenItem={({ item }: ListRenderItemInfo<t.Song>) => (
          <DeleteRow
            title={item.title}
            id={item.songId}
            setToDelete={setToDelete}
          />
        )}
      />
    </View>
  );
};

export default SongFolders;
