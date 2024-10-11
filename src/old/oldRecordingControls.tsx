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
import { LEADING_DOTS_ARRAY } from '@src/components/common/constants';

interface Props {
  duration: number;
  setDuration: (value: number | ((value: number) => void)) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  setVisibleWave: (value: number[]) => void;
  fullWave: number[];
  setFullWave: (value: number[]) => void;
}

const RecordingControls = (props: Props) => {
  const {
    duration,
    setDuration,
    isRecording,
    setIsRecording,
    setVisibleWave,
    fullWave,
    setFullWave,
  } = props;

  const { goBack } = useNavigation();
  const styles = useRecordingStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'Recording'>>();
  const songId = useAppSelector(selectCurrentSongId);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const { title } = route.params;

  const [uri, setUri] = useState<string | null>(null);

  const handleStartRecording = async () => {
    await startRecording(setRecording, fullWave, setVisibleWave);
    setDuration(0);

    timerRef.current = setInterval(() => {
      setDuration((prevDuration: number) => (prevDuration || 0) + 1);
    }, 1000);
  };

  useEffect(() => {
    handleStartRecording();
  }, []);

  const handleStopRecording = async () => {
    const newUri = await stopRecording(recording, setRecording, setDuration);
    setUri(newUri);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return newUri;
  };

  const onRecordPress = async () => {
    isRecording ? await handleStopRecording() : await handleStartRecording();

    setIsRecording(!isRecording);
  };

  const onClearPress = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setFullWave([...LEADING_DOTS_ARRAY]);
    clearRecording(recording, setRecording, setUri, setDuration);
    setIsRecording(false);
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
          duration,
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
