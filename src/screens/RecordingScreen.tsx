import React, { useState } from 'react';
import { View } from 'react-native';
import { Audio } from 'expo-av';

import useRecordingStyles from '@styles/recording';
import Timer from '@src/recording/components/Timer';
import RecordingControls from '@src/recording/components/RecordingControls';
import AudioWaveDisplay from '@src/recording/components/AudioWaveDisplay';

const RecordingScreen = () => {
  const styles = useRecordingStyles();

  const [uri, setUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  // maybe move recording to controls, might need it in audiowave
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [wave, setWave] = useState<number[]>([]);

  return (
    <View style={styles.container}>
      <AudioWaveDisplay
        isRecording={isRecording}
        wave={wave}
        setWave={setWave}
      />
      <Timer duration={duration} />
      <RecordingControls
        duration={duration}
        setDuration={setDuration}
        uri={uri}
        setUri={setUri}
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        recording={recording}
        setRecording={setRecording}
        setWave={setWave}
      />
    </View>
  );
};

export default RecordingScreen;
