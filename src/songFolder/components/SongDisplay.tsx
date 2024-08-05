import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useAudioPlayer from '@src/utils/useAudioPlayer';

import useSongScreenStyles from '@src/styles/songScreen';
import { deleteObject, take } from '@src/common/types';
import { useAppSelector } from '@src/common/hooks';
import { selectCurrentSongTakes } from '@src/selectors/songsSelector';
import GetStarted from '@src/common/components/GetStarted';
import SongTake from '@src/songFolder/components/SongTake';

interface Props {
  setToDelete: (value: deleteObject) => void;
  setCurrentTake: (value: take) => void;
}

const SongDisplay = (props: Props) => {
  const { setToDelete, setCurrentTake } = props;
  const takes = useAppSelector(selectCurrentSongTakes);
  const styles = useSongScreenStyles();
  const { togglePlayback } = useAudioPlayer();

  const orderedTakes: take[] = [...takes].reverse();
  const handleTogglePlayback = (uri: string, takeId: number) => {
    togglePlayback(uri, takeId);
  };

  const renderTakes = () =>
    orderedTakes.map((take: take) => (
      <SongTake
        key={take.title}
        take={take}
        setToDelete={setToDelete}
        setCurrentTake={setCurrentTake}
        onTogglePlayback={handleTogglePlayback}
      />
    ));

  if (takes.length > 0) {
    return (
      <ScrollView>
        <View style={styles.takes}>{renderTakes()}</View>
      </ScrollView>
    );
  }

  return <GetStarted screen={'song'} />;
};

export default SongDisplay;
