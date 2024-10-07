import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { useSQLiteContext } from 'expo-sqlite';

import useRecordingStyles from '@src/styles/recording';
import RecordButton from '@src/components/common/components/RecordButton';
import {
  clearRecording,
  startRecording,
  stopRecording,
} from '@src/utils/startStopPlayRecording';
import {
  useAppDispatch,
  useAppSelector,
} from '@src/utils/hooks/typedReduxHooks';
import { createTakeRequest } from '@src/state/sagas/actionCreators';
import { RootStackParamList } from '@src/components/common/types';
import { selectCurrentSongId } from '@src/state/selectors/songsSelector';
import PlaybackButton from '@src/components/recording/subcomponents/PlaybackButton';

interface Props {
  recordingDuration: number;
  setRecordingDuration: (value: number | ((value: number) => void)) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  setWave: (value: number[]) => void;
}

const RecordingControls = (props: Props) => {
  const {
    recordingDuration,
    setRecordingDuration,
    isRecording,
    setIsRecording,
    setWave,
  } = props;

  const { goBack } = useNavigation();
  const styles = useRecordingStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'Recording'>>();
  const songId = useAppSelector(selectCurrentSongId);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const { title } = route.params;

  const [uri, setUri] = useState<string | null>(null);

  const recordingStartTimeRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const updateDuration = () => {
    if (recordingStartTimeRef.current) {
      const currentDuration = Math.floor(
        (Date.now() - recordingStartTimeRef.current) / 1000,
      );
      setRecordingDuration(currentDuration);
    }
  };

  const handleStartRecording = async () => {
    setRecordingDuration(0);
    recordingStartTimeRef.current = Date.now();
    await startRecording(setRecording, setWave);
    setIsRecording(true);
    intervalRef.current = setInterval(updateDuration, 1000);
  };

  useEffect(() => {
    handleStartRecording();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleStopRecording = async () => {
    const newUri = await stopRecording(
      recording,
      setRecording,
      setRecordingDuration,
    );
    setUri(newUri);

    return newUri;
  };

  const onRecordPress = async () => {
    isRecording ? await handleStopRecording() : await handleStartRecording();

    setIsRecording(!isRecording);
  };

  const onClearPress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setWave([]);
    clearRecording(recording, setRecording, setUri);
    setIsRecording(false);
    setRecordingDuration(0);
  };

  const onSavePress = async () => {
    let newUri = uri;
    if (isRecording) {
      newUri = await handleStopRecording();
    }

    if (newUri) {
      dispatch(
        createTakeRequest({
          songId,
          title,
          date: new Date().toISOString(),
          uri: newUri,
          duration: recordingDuration,
          db,
        }),
      );
    }

    goBack();
  };

  return (
    <View style={styles.recordingRow}>
      <TouchableOpacity onPress={onClearPress} style={styles.sideButton}>
        <Text style={styles.buttonText}>Clear</Text>
      </TouchableOpacity>
      <View style={styles.recordButtonContainer}>
        {uri ? (
          <PlaybackButton uri={uri} songId={songId} />
        ) : (
          <RecordButton onPress={onRecordPress} isRecording={isRecording} />
        )}
      </View>
      <TouchableOpacity onPress={onSavePress} style={styles.sideButton}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordingControls;
