import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import RecordButton from '@src/common/components/RecordButton';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';
import {
  DELETE_TAKE_TEXT,
  EMPTY_DELETE_OBJECT,
  EMPTY_TAKE,
} from '@src/common/constants';
import useSongScreenStyles from '@styles/songScreen';
import useGlobalStyles from '@styles/global';
import PermissionsNeededModal from '@src/songFolder/components/PermissionsNeededModal';
import useMicrophonePermissions from '@src/hooks/useMicrophonePermissions';
import { RootStackParamList, DeleteObject, Take } from '@src/common/types';
import { useAppSelector } from '@src/hooks/typedReduxHooks';
import { selectCurrentSongTotalTakes } from '@src/selectors/songsSelector';
import SongDisplay from '@src/songFolder/components/SongDisplay';
import { useAudioPlayer } from '@src/context/AudioContext';
import { Screen } from '@src/common/enums';

const SongScreen = () => {
  const styles = useSongScreenStyles();
  const globalStyles = useGlobalStyles();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const totalTakes = useAppSelector(selectCurrentSongTotalTakes);
  const isPermissionGranted = useMicrophonePermissions();
  const { clearPlayback } = useAudioPlayer();

  const [toDelete, setToDelete] = useState<DeleteObject>(EMPTY_DELETE_OBJECT);
  const [currentTake, setCurrentTake] = useState<Take>(EMPTY_TAKE);
  const [isPermissionsNeededModalOpen, setIsPermissionsNeededModalOpen] =
    useState<boolean>(false);

  const onRecordPress = () => {
    const recording = () => {
      const newTakeTitle = `Take ${totalTakes + 1}`;

      navigation.navigate(Screen.RECORDING, { title: newTakeTitle });
    };

    clearPlayback();

    isPermissionGranted === 'granted'
      ? recording()
      : setIsPermissionsNeededModalOpen(true);
  };

  useEffect(() => {
    if (isPermissionGranted === 'granted' && isPermissionsNeededModalOpen) {
      setIsPermissionsNeededModalOpen(false);
    }
  }, [
    isPermissionGranted,
    isPermissionsNeededModalOpen,
    setIsPermissionsNeededModalOpen,
  ]);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      clearPlayback();
    });
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <SongDisplay setToDelete={setToDelete} setCurrentTake={setCurrentTake} />
      <RecordButton
        onPress={onRecordPress}
        isRecording={false}
        style={styles.recordingButton}
      />
      <DeleteModal
        deleteText={DELETE_TAKE_TEXT}
        toDelete={toDelete}
        setToDelete={setToDelete}
      />
      <NotesModal setCurrentTake={setCurrentTake} currentTake={currentTake} />
      <PermissionsNeededModal
        isPermissionsNeededModalOpen={isPermissionsNeededModalOpen}
        setIsPermissionsNeededModalOpen={setIsPermissionsNeededModalOpen}
      />
    </View>
  );
};

export default SongScreen;
