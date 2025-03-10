import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { FlashList } from '@shopify/flash-list';

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

  // Create a separator component to handle the gap between items
  const ItemSeparator = useMemo(
    () => () => <View style={{ height: 20 }} />,
    [],
  );

  if (takes.length > 0) {
    return (
      <FlashList
        data={orderedTakes}
        renderItem={renderTake}
        estimatedItemSize={orderedTakes.length}
        keyExtractor={(item: Take) => item.title}
        contentContainerStyle={styles.takes}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={ListFooter}
        removeClippedSubviews={true}
      />
    );
  }

  return <ComposerMessage screen={Screen.SONG} />;
};

export default SongDisplay;
