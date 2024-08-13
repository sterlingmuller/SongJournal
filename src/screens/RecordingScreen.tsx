import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Audio } from 'expo-av';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useSQLiteContext } from 'expo-sqlite';

import StyledText from '@src/common/components/StyledText';
import RecordButton from '@src/common/components/RecordButton';
import useGlobalStyles from '@styles/global';
import {
  playRecording,
  startRecording,
  stopRecording,
} from '@src/utils/startStopPlayRecording';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useRecordingStyles from '@styles/recording';
import { RootStackParamList } from '@src/common/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCurrentSongId } from '@src/selectors/songsSelector';
import { createTakeRequest } from '@src/sagas/actionCreators';

const RecordingScreen = () => {
  const { goBack } = useNavigation();
  const globalStyles = useGlobalStyles();
  const styles = useRecordingStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<RootStackParamList, 'Recording'>>();
  const { title } = route.params;
  const songId = useAppSelector(selectCurrentSongId);

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
