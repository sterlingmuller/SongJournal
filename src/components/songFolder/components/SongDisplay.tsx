import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

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

  const renderTakes = () =>
    orderedTakes.map((take: Take) => (
      <SongTake
        key={take.title}
        take={take}
        setToDelete={setToDelete}
        setCurrentTake={setCurrentTake}
        setTitleToEdit={setTitleToEdit}
      />
    ));

  if (takes.length > 0) {
    return (
      <ScrollView>
        <View style={styles.takes}>{renderTakes()}</View>
      </ScrollView>
    );
  }

  return <ComposerMessage screen={Screen.SONG} />;
};

export default SongDisplay;
