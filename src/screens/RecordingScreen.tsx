import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/components/recording/components/Timer';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/components/recording/components/AudioWaveDisplay';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectPlaybackInfo } from '@src/state/selectors/playbackSelector';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [displayWave, setDisplayWave] = useState<number[]>([]);
  const fullWaveRef = useRef<number[]>([]);
  // const { isPlaying, duration } = useAppSelector(selectPlaybackInfo);

  console.log('yip');
  return (
    <View style={styles.container}>
      <AudioWaveDisplay
        isRecording={isRecording}
        fullWave={fullWaveRef.current}
        displayWave={displayWave}
        // isPlaying={isPlaying}
        // duration={duration}
      />
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
