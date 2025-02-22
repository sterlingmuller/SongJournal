import React, { useRef, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';

import useRecordingStyles from '@src/styles/recording';
import RecordButton from '@src/components/common/components/RecordButton';
import { startRecording, stopRecording } from '@src/utils/RecordingHelpers';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { RootStackParamList } from '@src/components/common/types';
import { selectCurrentSongId } from '@src/state/selectors/songsSelector';
import PlaybackButton from '@src/components/recording/subcomponents/PlaybackButton';
import useTakeGenerator from '@src/utils/hooks/useTakeGenerator';
import { Screen } from '@src/components/common/enums';

interface Props {
  recordingDuration: number;
  setRecordingDuration: (value: number | ((value: number) => void)) => void;
  isRecording: boolean;
  setIsRecording: (value: boolean) => void;
  setFullWave: (value: number[]) => void;
  setDisplayWave: (value: number[]) => void;
}

const RecordingControls = (props: Props) => {
  const {
    recordingDuration,
    setRecordingDuration,
    isRecording,
    setIsRecording,
    setFullWave,
    setDisplayWave,
  } = props;

  const { goBack } = useNavigation();
  const styles = useRecordingStyles();
  const route = useRoute<RouteProp<RootStackParamList, Screen.RECORDING>>();
  const songId = useAppSelector(selectCurrentSongId);
  const generateTake = useTakeGenerator();
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const { title } = route.params;
  const [uri, setUri] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fullWaveRef = useRef<number[]>([]);

  const handleStartRecording = async () => {
    await startRecording(setRecording, fullWaveRef, setDisplayWave);
    setIsRecording(true);
    setRecordingDuration(0);

    intervalRef.current = setInterval(
      () => setRecordingDuration((prev: number) => prev + 1),
      1000,
    );
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

    setFullWave(fullWaveRef.current);
    fullWaveRef.current = [];
    await stopRecording(recording, setIsRecording);

    const newUri = recording.getURI();
    setUri(newUri);
    return newUri;
  };

  const onRecordPress = async () => {
    isRecording ? await handleStopRecording() : await handleStartRecording();

    setIsRecording(!isRecording);
  };

  const onClearPress = async () => {
    if (isRecording) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      await stopRecording(recording, setIsRecording);
      fullWaveRef.current = [];
    } else {
      setFullWave([]);
      setUri(null);
    }

    setDisplayWave([]);
    setRecordingDuration(null);
  };

  const onSavePress = async () => {
    let newUri = uri;

    if (isRecording) {
      newUri = await handleStopRecording();
    }

    const duration = Math.floor(recording._finalDurationMillis / 1000);

    if (newUri) {
      generateTake(newUri, title, duration);
    }

    setRecording(null);
    goBack();
  };

  const isDisabled = recordingDuration === null;

  return (
    <View style={styles.recordingRow}>
      <TouchableOpacity
        onPress={onClearPress}
        style={styles.sideButton}
        hitSlop={20}
        disabled={isDisabled}
      >
        <Text
          style={isDisabled ? styles.disabledButtonText : styles.buttonText}
        >
          Clear
        </Text>
      </TouchableOpacity>
      <View style={styles.recordButtonContainer}>
        {uri ? (
          <PlaybackButton uri={uri} songId={songId} />
        ) : (
          <RecordButton onPress={onRecordPress} isRecording={isRecording} />
        )}
      </View>
      <TouchableOpacity
        onPress={onSavePress}
        style={styles.sideButton}
        hitSlop={20}
        disabled={isDisabled}
      >
        <Text
          style={isDisabled ? styles.disabledButtonText : styles.buttonText}
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecordingControls;
