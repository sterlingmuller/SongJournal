import React, { useReducer, useState } from 'react';
import { View } from 'react-native';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/components/recording/components/Timer';
import RecordingControls from '@src/components/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/components/recording/components/AudioWaveDisplay';
import { EMPTY_AUDIO_WAVE_ARRAY } from '@src/components/common/constants';

const RecordingScreen = () => {
  const styles = useRecordingStyles();
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null,
  );
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [wave, setWave] = useState<number[]>([]);
  const [recordingWave, setRecordingWave] = useState<number[]>([
    ...EMPTY_AUDIO_WAVE_ARRAY,
  ]);

  // const [recordingWave, dispatchRecordingWave] = useReducer(
  //   (prevWave: number[], newElement: number) => {
  //     return [...prevWave.slice(1), newElement];
  //   },
  //   [],
  // );

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
