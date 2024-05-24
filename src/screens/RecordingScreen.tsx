import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

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
import { createTake } from '@src/repositories/TakeRepository';
import { useSQLiteContext } from 'expo-sqlite';
import { useSelector } from 'react-redux';
import { selectCurrentTake } from '@src/selectors/currentTakeSelector';
import { RootStackParamList } from '@src/common/types';
import { useAppDispatch } from '@src/common/hooks';
import { incrementTotalTakes } from '@src/slice/currentSongSlice';

const RecordingScreen = () => {
  const { goBack } = useNavigation();
  const globalStyles = useGlobalStyles();
  const styles = useRecordingStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();

  // const currentTake = useSelector(selectCurrentTake);
  const route = useRoute<RouteProp<RootStackParamList, 'Recording'>>();
  const { songId, title } = route.params;

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(true);
  const [uri, setUri] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    startRecording(setRecording);
  }, []);

  const onRecordPress = () => {
    isRecording
      ? stopRecording(recording, setRecording, setUri, setDuration)
      : startRecording(setRecording);

    setIsRecording(!isRecording);
  };

  const onCancelPress = () => {
    if (isRecording) {
      stopRecording(recording, setRecording, setUri, setDuration);
    }

    goBack();
  };

  const onSavePress = async () => {
    if (isRecording) {
      await stopRecording(recording, setRecording, setUri, setDuration);
    }

    console.log('songId', songId);

    if (uri) {
      dispatch({
        type: 'CREATE_TAKE',
        payload: {
          songId,
          title,
          date: new Date().toISOString(),
          uri,
          duration,
          db,
        },
      });
    }

    goBack();
  };

  return (
    <View style={globalStyles.container}>
      <StyledText>Recording Screen hrm</StyledText>
      {!!uri && (
        <TouchableOpacity onPress={() => playRecording(uri)}>
          <Text>Press here to play sound</Text>
        </TouchableOpacity>
      )}
      <View style={styles.recordingRow}>
        <TouchableOpacity onPress={onCancelPress}>
          <Text>Cancel</Text>
        </TouchableOpacity>
        <RecordButton onPress={onRecordPress} isRecording={isRecording} />
        <TouchableOpacity onPress={onSavePress}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RecordingScreen;
