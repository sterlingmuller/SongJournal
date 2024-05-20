import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Audio } from 'expo-av';

import StyledText from '@src/common/components/StyledText';
import RecordButton from '@src/common/components/RecordButton';
import useGlobalStyles from '@src/styles/global';
import {
  playRecording,
  startRecording,
  stopRecording,
} from '@src/utils/startStopPlayRecording';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RecordingScreen = () => {
  const globalStyles = useGlobalStyles();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  useEffect(() => {
    startRecording(setRecording);
  }, []);

  const onRecordPress = () => {
    isRecording
      ? stopRecording(recording, setRecording, setRecordingUri)
      : startRecording(setRecording);

    setIsRecording(!isRecording);
  };

  return (
    <View style={globalStyles.container}>
      <StyledText>Recording Screen hrm</StyledText>
      {recordingUri && (
        <TouchableOpacity onPress={() => playRecording(recordingUri)}>
          <Text>Press here to play sound</Text>
        </TouchableOpacity>
      )}
      <RecordButton onPress={onRecordPress} isRecording={isRecording} />
    </View>
  );
};

export default RecordingScreen;
