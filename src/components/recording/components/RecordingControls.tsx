import React, { useRef, useEffect, useState, useMemo } from 'react';
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
import {
  SCREEN_WIDTH,
  WAVE_BAR_TOTAL_WIDTH,
} from '@src/components/common/constants';

interface Props {
  recordingDuration: number;
  setRecordingDuration: (value: number | ((value: number) => void)) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  setWave: (value: number[]) => void;
  // dispatchRecordingWave: (value: number[]) => void;
  setRecordingWave: (value: number[]) => void;
}

const RecordingControls = (props: Props) => {
  const {
    setRecordingDuration,
    isRecording,
    setIsRecording,
    setWave,
    setRecordingWave,
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
  const fullWaveRef = useRef<number[]>([]);
  const maxBars = useMemo(() => {
    return Math.floor((SCREEN_WIDTH * 0.9) / WAVE_BAR_TOTAL_WIDTH);
  }, []);

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
    await startRecording(setRecording, fullWaveRef, setRecordingWave, maxBars);
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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setWave(fullWaveRef.current);
    const newUri = await stopRecording(recording, setRecording);
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
    // need to figure out how to clear new wave
    setWave([]);
    fullWaveRef.current = [];

    clearRecording(recording, setRecording, setUri, setRecordingWave);
    // setRecordingWave([]);
    setIsRecording(false);
    setRecordingDuration(null);
  };

  const onSavePress = async () => {
    let newUri = uri;
    if (isRecording) {
      newUri = await handleStopRecording();
    }

    const duration = Math.floor(recording._finalDurationMillis / 1000);

    if (newUri) {
      dispatch(
        createTakeRequest({
          songId,
          title,
          date: new Date().toISOString(),
          uri: newUri,
          duration,
          db,
        }),
      );
    }

    setRecording(null);

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
