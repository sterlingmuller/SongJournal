import React from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import RecordingWaveDisplay from '@src/components/recording/components/RecordingWaveDisplay';
import RecordingTimer from '@src/components/recording/subcomponents/RecordingTimer';
import RecordingPlaybackTimer from '@src/components/recording/subcomponents/RecordingPlaybackTimer';
import { useRecording } from '@src/state/context/RecordingContext';
import FixedPlaybackWaveDisplay from '@src/components/recording/components/FixedPlaybackWaveDisplay';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const { isRecording } = useRecording();

  return (
    <View style={styles.container}>
      {isRecording ? (
        <>
          <RecordingWaveDisplay />
          <RecordingTimer />
        </>
      ) : (
        <>
          <FixedPlaybackWaveDisplay />
          <RecordingPlaybackTimer />
        </>
      )}
      <RecordingControls />
    </View>
  );
};

export default RecordingScreen;
