import React, { useEffect, useRef } from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import SongFolder from '@src/components/home/subcomponents/SongFolder';
import DeleteRow from '@src/components/home/subcomponents/DeleteRow';
import { DeleteObject, Song, Songs } from '@src/components/common/types';
import SwipeableFlashList from '@src/components/common/components/SwipeableFlashList';
import { SwipeableItemRef } from '@src/components/common/components/SwipeableItem';
import useCoversStyle from '@src/styles/covers';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  setTitleToEdit: (value: { songTitle: string; songId: number }) => void;
  songs: Songs;
}

const CoverSongList = ({ setToDelete, setTitleToEdit, songs }: Props) => {
  const styles = useCoversStyle();
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

    const renderItem = ({ item, index }: ListRenderItemInfo<Song>) => {
    const isLastItem = index === songs.length - 1;
    return (
      <View style={[!isLastItem && styles.separator, { marginHorizontal: 20 }]}>
        <SongFolder song={item} setTitleToEdit={setTitleToEdit} isCover={true} />
      </View>
    );
  };

  return (
      <SwipeableFlashList
        data={songs}
        contentContainerStyle={styles.songFlashContainer}
        keyExtractor={(item: Song) => item.songId.toString()}
        onRowDidOpen={onRowDidOpen}
        renderItem={renderItem}
        renderHiddenItem={({ item }: ListRenderItemInfo<Song>) => (
          <DeleteRow
            title={item.title}
            id={item.songId}
            setToDelete={setToDelete}
          />
        )}
      />
  );
};

export default CoverSongList;