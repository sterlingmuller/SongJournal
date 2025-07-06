import React, { useEffect, useRef } from 'react';
import { ListRenderItemInfo, View } from 'react-native';

import SongFolder from '@src/components/home/subcomponents/SongFolder';
import DeleteRow from '@src/components/home/subcomponents/DeleteRow';
import * as t from '@src/components/common/types';
import { Filter, MessageIntent, SortBy } from '@src/components/common/enums';
import { useProcessSongs } from '@src/hooks/useProcessSongs';
import SwipeableFlashList from '@src/components/common/components/SwipeableFlashList';
import { SwipeableItemRef } from '@src/components/common/components/SwipeableItem';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import {
  selectDisplayTips,
  selectIsNumbered,
} from '@src/state/selectors/settingsSelector';
import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { HOME_TIP } from '@src/components/common/constants';
import StyledText from '@src/components/common/components/StyledText';
import useSongFolderStyles from '@src/styles/songFolder';
import { Song } from '@src/components/common/types';

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

  const isNumbered = useAppSelector(selectIsNumbered);
  const displayTips = useAppSelector(selectDisplayTips);
  const styles = useSongFolderStyles();

  const songsToDisplay = useProcessSongs(
    songs,
    sortedCategory,
    isSortAscending,
    activeFilters,
    searchText,
    isNumbered,
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

  const ListFooter = () => {
    if (!displayTips) return null;

    return <StyledText style={styles.tipText}>{HOME_TIP}</StyledText>;
  };

  const renderItem = ({ item }: ListRenderItemInfo<Song>) => (
       <View style={styles.separator}>
        <SongFolder song={item} setTitleToEdit={setTitleToEdit} />
      </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {songsToDisplay.length ? (
        <SwipeableFlashList
          data={songsToDisplay}
          keyExtractor={(item: t.Song) => item.songId.toString()}
          onRowDidOpen={onRowDidOpen}
          renderItem={renderItem}
          renderHiddenItem={({ item }: ListRenderItemInfo<t.Song>) => (
            <DeleteRow
              title={item.title}
              id={item.songId}
              setToDelete={setToDelete}
            />
          )}
          footer={ListFooter}
        />
      ) : (
        <ComposerMessage messageIntent={MessageIntent.EMPTY_SEARCH} />
      )}
    </View>
  );
};

export default SongFolders;
