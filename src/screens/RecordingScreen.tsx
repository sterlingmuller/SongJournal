import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

import StyledText from '@src/common/components/StyledText';
import RecordButton from '@src/common/components/RecordButton';
import useGlobalStyles from '@src/styles/global';
import {
  playRecording,
  startRecording,
  stopRecording,
} from '@src/utils/startStopPlayRecording';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useRecordingStyles from '@src/styles/recording';

const RecordingScreen = () => {
  const { goBack } = useNavigation();
  const globalStyles = useGlobalStyles();
  const styles = useRecordingStyles();
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

  const onCancelPress = () => {
    if (isRecording) {
      stopRecording(recording, setRecording, setRecordingUri);
    }

    goBack();
  };

  return (
    <View style={globalStyles.container}>
      <StyledText>Recording Screen hrm</StyledText>
      {recordingUri && (
        <TouchableOpacity onPress={() => playRecording(recordingUri)}>
          <Text>Press here to play sound</Text>
        </TouchableOpacity>
      )}
      <View style={styles.recordingRow}>
        <TouchableOpacity onPress={onCancelPress}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <RecordButton onPress={onRecordPress} isRecording={isRecording} />
        <TouchableOpacity onPress={() => playRecording(recordingUri)}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordingScreen;
