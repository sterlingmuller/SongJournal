import React from 'react';
import { View } from 'react-native';

import useAudioWaveStyles from '@src/styles/audioWave';
import RecordingWave from '@src/components/recording/subcomponents/RecordingWave';

interface Props {
  displayWave: number[];
}

const RecordingWaveDisplay = React.memo((props: Props) => {
  const { displayWave } = props;
  const styles = useAudioWaveStyles();

  // later update window logic so that there is  ~10 bars in array that do not fit in display then animate scroll as bars are added. Should hopefully get rid of choppiness

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        <RecordingWave recordingWave={displayWave} />
      </View>
    </View>
  );
});

export default RecordingWaveDisplay;
