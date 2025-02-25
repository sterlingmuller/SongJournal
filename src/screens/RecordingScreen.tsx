import React, { useRef, useState } from 'react';
import { Text, View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/components/recording/components/Timer';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/components/recording/components/PlaybackWaveDisplay';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectIsPlaying,
  selectPlaybackInfo,
} from '@src/state/selectors/playbackSelector';
import RecordingWaveDisplay from '@src/components/recording/components/RecordingWaveDisplay';
import PlaybackWaveDisplay from '@src/components/recording/components/PlaybackWaveDisplay';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [displayWave, setDisplayWave] = useState<number[]>([]);
  const fullWaveRef = useRef<number[]>([]);
  // const { isPlaying, duration } = useAppSelector(selectPlaybackInfo);
  const isPlaying = useAppSelector(selectIsPlaying);

  console.log('yip');
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
      <Timer time={recordingDuration} isRecording={isRecording} />
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
