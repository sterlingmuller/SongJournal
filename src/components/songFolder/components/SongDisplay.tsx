import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import useSongScreenStyles from '@src/styles/songScreen';
import { DeleteObject, Take } from '@src/components/common/types';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectCurrentSongTakes } from '@src/state/selectors/songsSelector';
import GetStarted from '@src/components/common/components/GetStarted';
import SongTake from '@src/components/songFolder/components/SongTake';
import { Screen } from '@src/components/common/enums';

interface Props {
  setToDelete: (value: DeleteObject) => void;
  setCurrentTake: (value: Take) => void;
}

const SongDisplay = (props: Props) => {
  const { setToDelete, setCurrentTake } = props;
  const takes = useAppSelector(selectCurrentSongTakes);
  const styles = useSongScreenStyles();

  const orderedTakes: Take[] = [...takes].reverse();

  const renderTakes = () =>
    orderedTakes.map((take: Take) => (
      <SongTake
        key={take.title}
        take={take}
        setToDelete={setToDelete}
        setCurrentTake={setCurrentTake}
      />
    ));

  if (takes.length > 0) {
    return (
      <ScrollView>
        <View style={styles.takes}>{renderTakes()}</View>
      </ScrollView>
    );
  }

  return <GetStarted screen={Screen.SONG} />;
};

export default SongDisplay;
