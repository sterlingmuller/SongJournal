import React, { useState } from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/components/recording/components/Timer';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/components/recording/components/AudioWaveDisplay';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [wave, setWave] = useState<number[]>([]);

  const [recordingWave, setRecordingWave] = useState<number[]>([]);

  return (
    <View style={styles.container}>
      <AudioWaveDisplay
        isRecording={isRecording}
        wave={wave}
        recordingWave={recordingWave}
      />
      <Timer recordingDuration={recordingDuration} isRecording={isRecording} />
      <RecordingControls
        recordingDuration={recordingDuration}
        setRecordingDuration={setRecordingDuration}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        setWave={setWave}
        setRecordingWave={setRecordingWave}
      />
    </View>
  );
};

export default RecordingScreen;
