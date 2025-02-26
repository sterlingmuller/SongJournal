import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectIsPlaying } from '@src/state/selectors/playbackSelector';
import RecordingWaveDisplay from '@src/components/recording/components/RecordingWaveDisplay';
import PlaybackWaveDisplay from '@src/components/recording/components/PlaybackWaveDisplay';
import RecordingTimer from '@src/components/recording/subcomponents/RecordingTimer';
import PlaybackTimer from '@src/components/recording/subcomponents/PlaybackTimer';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const isPlaying = useAppSelector(selectIsPlaying);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [displayWave, setDisplayWave] = useState<number[]>([]);
  const fullWaveRef = useRef<number[]>([]);

  return (
    <View style={styles.container}>
      {isRecording ? (
        <RecordingWaveDisplay displayWave={displayWave} />
      ) : (
        <PlaybackWaveDisplay
          fullWave={fullWaveRef.current}
          duration={recordingDuration}
          isPlaying={isPlaying}
        />
      )}
      {isPlaying ? (
        <PlaybackTimer />
      ) : (
        <RecordingTimer time={recordingDuration} />
      )}
      <RecordingControls
        recordingDuration={recordingDuration}
        setRecordingDuration={setRecordingDuration}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        fullWaveRef={fullWaveRef}
        setDisplayWave={setDisplayWave}
      />
    </View>
  );
};

export default RecordingScreen;
