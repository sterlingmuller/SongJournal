import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { useSQLiteContext } from 'expo-sqlite';

import useRecordingStyles from '@src/styles/recording';
import RecordButton from '@src/common/components/RecordButton';
import {
  clearRecording,
  startRecording,
  stopRecording,
} from '@src/utils/startStopPlayRecording';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { createTakeRequest } from '@src/sagas/actionCreators';
import { RootStackParamList } from '@src/common/types';
import { selectCurrentSongId } from '@src/selectors/songsSelector';

interface Props {
  duration: number;
  setDuration: (value: number | ((value: number) => void)) => void;
  uri: string;
  setUri: (value: string) => void;
}

const RecordingControls = (props: Props) => {
  const { goBack } = useNavigation();
  const styles = useRecordingStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'Recording'>>();
  const songId = useAppSelector(selectCurrentSongId);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const { duration, setDuration, uri, setUri } = props;
  const { title } = route.params;

  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(true);

  const handleStartRecording = () => {
    setDuration(0);
    startRecording(setRecording);

    timerRef.current = setInterval(() => {
      setDuration((prevDuration: number) => (prevDuration || 0) + 1);
    }, 1000);
  };

  useEffect(() => {
    handleStartRecording();
  }, []);

  const handleStopRecording = () => {
    stopRecording(recording, setRecording, setUri, setDuration);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const onRecordPress = () => {
    isRecording ? handleStopRecording() : handleStartRecording();

    setIsRecording(!isRecording);
  };

  const onCancelPress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    clearRecording(recording, setRecording, setUri, setDuration);
    setIsRecording(false);
  };

  const onSavePress = async () => {
    if (isRecording) {
      await stopRecording(recording, setRecording, setUri, setDuration);
    }

    if (uri) {
      dispatch(
        createTakeRequest({
          songId,
          title,
          date: new Date().toISOString(),
          uri,
          duration,
          db,
        }),
      );
    }

    goBack();
  };

  return (
    <View style={styles.recordingRow}>
      <TouchableOpacity onPress={onCancelPress} style={styles.sideButton}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <View style={styles.recordButtonContainer}>
        <RecordButton onPress={onRecordPress} isRecording={isRecording} />
      </View>
      <TouchableOpacity onPress={onSavePress} style={styles.sideButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordingControls;
