import React, { useCallback, useMemo } from 'react';
import { FlatList, View } from 'react-native';

import useSongScreenStyles from '@src/styles/songScreen';
import { DeleteObject, Take, Takes } from '@src/components/common/types';
import ComposerMessage from '@src/components/common/components/ComposerMessage';
import SongTake from '@src/components/songFolder/components/SongTake';
import { Screen } from '@src/components/common/enums';

interface Props {
  takes: Takes;
  setToDelete: (value: DeleteObject) => void;
  setCurrentTake: (value: Take) => void;
  setTitleToEdit: (value: {
    songTitle: string;
    songId: number;
    takeTitle?: string;
    takeId?: number;
  }) => void;
}

const SongDisplay = (props: Props) => {
  const { takes, setToDelete, setCurrentTake, setTitleToEdit } = props;
  const styles = useSongScreenStyles();

  const orderedTakes: Take[] = [...takes].reverse();

  const renderTake = useCallback(
    ({ item }: { item: Take }) => (
      <SongTake
        key={item.title}
        take={item}
        setToDelete={setToDelete}
        setCurrentTake={setCurrentTake}
        setTitleToEdit={setTitleToEdit}
      />
    ),
    [setToDelete, setCurrentTake, setTitleToEdit],
  );

  const ListFooter = useMemo(() => () => <View style={{ height: 180 }} />, []);

  if (takes.length > 0) {
    return (
      <FlatList
        data={orderedTakes}
        renderItem={renderTake}
        keyExtractor={(item: Take) => item.title}
        contentContainerStyle={styles.takes}
        ListFooterComponent={ListFooter}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    );
  }

  return <ComposerMessage screen={Screen.SONG} />;
};

export default SongDisplay;
