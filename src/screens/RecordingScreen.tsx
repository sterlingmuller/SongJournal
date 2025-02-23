import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/components/recording/components/Timer';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/components/recording/components/AudioWaveDisplay';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [displayWave, setDisplayWave] = useState<number[]>([]);
  const fullWaveRef = useRef<number[]>([]);

  return (
    <View style={styles.container}>
      <AudioWaveDisplay
        isRecording={isRecording}
        fullWave={fullWaveRef.current}
        displayWave={displayWave}
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
