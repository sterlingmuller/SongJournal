import React, { useState } from 'react';
import { View } from 'react-native';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';

import useAudioWaveStyles from '@src/styles/audioWave';
import RecordingWave from '@src/components/recording/subcomponents/RecordingWave';
import { useRecording } from '@src/state/context/RecordingContext';

const RecordingWaveDisplayComponent = () => {
  const { displayWaveShared } = useRecording();
  const styles = useAudioWaveStyles();
  const [localWave, setLocalWave] = useState([]);

  useAnimatedReaction(
    () => displayWaveShared.value,
    (currentWave: number[]) => {
      runOnJS(setLocalWave)(currentWave);
    },
    [displayWaveShared]
  );

  return (
    <View style={styles.container}>
      <View style={styles.waveContainer}>
        <RecordingWave recordingWave={localWave} />
      </View>
    </View>
  );
};

const RecordingWaveDisplay = React.memo(RecordingWaveDisplayComponent);

export default RecordingWaveDisplay;
