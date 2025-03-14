import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import useRecordingStyles from '@src/styles/recording';
import RecordButton from '@src/components/common/components/RecordButton';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { RootStackParamList } from '@src/components/common/types';
import { selectCurrentSongId } from '@src/state/selectors/songsSelector';
import PlaybackButton from '@src/components/recording/subcomponents/PlaybackButton';
import useTakeGenerator from '@src/hooks/useTakeGenerator';
import { Screen } from '@src/components/common/enums';
import { useRecording } from '@src/state/context/RecordingContext';
import { useAudioPlayer } from '@src/state/context/AudioContext';

const RecordingControls = () => {
  const { goBack } = useNavigation();
  const styles = useRecordingStyles();
  const route = useRoute<RouteProp<RootStackParamList, Screen.RECORDING>>();
  const songId = useAppSelector(selectCurrentSongId);
  const generateTake = useTakeGenerator();
  const { title } = route.params;
  const [uri, setUri] = useState<string | null>(null);
  const [localDuration, setLocalDuration] = useState<number | null>(null);

  const {
    isRecording,
    startRecording,
    stopRecording,
    clearRecording,
    duration,
  } = useRecording();
  const { clearPlayback } = useAudioPlayer();

  const isClearSaveDisabled = duration === null && !isRecording;

  const handleRecordPress = async () => {
    if (isRecording) {
      const { uri, duration } = await stopRecording();
      setUri(uri);
      setLocalDuration(duration);
    } else {
      setUri(null);
      setLocalDuration(null);
      await startRecording();
    }
  };

  useEffect(() => {
    handleRecordPress();

    return () => {
      clearRecording();
    };
  }, []);

  const onClearPress = async () => {
    await clearPlayback();
    await clearRecording();
    setUri(null);
  };

  const onSavePress = async () => {
    let newUri = uri;
    let newDuration = localDuration;

    if (isRecording) {
      const { uri, duration } = await stopRecording();
      newUri = uri;
      newDuration = duration;
    }

    if (newUri && newDuration) {
      generateTake(newUri, title, newDuration);
    }

    goBack();
  };

  return (
    <View style={styles.recordingRow}>
      <TouchableOpacity
        onPress={onClearPress}
        style={styles.sideButton}
        hitSlop={20}
        disabled={isClearSaveDisabled}
      >
        <Text
          style={
            isClearSaveDisabled ? styles.disabledButtonText : styles.buttonText
          }
        >
          Clear
        </Text>
      </TouchableOpacity>
      <View style={styles.recordButtonContainer}>
        {uri ? (
          <PlaybackButton uri={uri} songId={songId} />
        ) : (
          <RecordButton onPress={handleRecordPress} isRecording={isRecording} />
        )}
      </View>
      <TouchableOpacity
        onPress={onSavePress}
        style={styles.sideButton}
        hitSlop={20}
        disabled={isClearSaveDisabled}
      >
        <Text
          style={
            isClearSaveDisabled ? styles.disabledButtonText : styles.buttonText
          }
        >
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(RecordingControls);
