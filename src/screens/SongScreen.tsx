import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import RecordButton from '@src/components/common/components/RecordButton';
import DeleteModal from '@src/components/common/components/DeleteModal';
import NotesModal from '@src/components/songFolder/components/NotesModal';
import {
  DELETE_TAKE_TEXT,
  EMPTY_DELETE_OBJECT,
  EMPTY_TAKE,
} from '@src/components/common/constants';
import useSongScreenStyles from '@styles/songScreen';
import useGlobalStyles from '@styles/global';
import PermissionsNeededModal from '@src/components/songFolder/components/PermissionsNeededModal';
import useMicrophonePermissions from '@src/utils/hooks/useMicrophonePermissions';
import {
  RootStackParamList,
  DeleteObject,
  Take,
} from '@src/components/common/types';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectCurrentSongTakes,
  selectCurrentSongTotalTakes,
} from '@src/state/selectors/songsSelector';
import SongDisplay from '@src/components/songFolder/components/SongDisplay';
import { useAudioPlayer } from '@src/state/context/AudioContext';
import { Screen } from '@src/components/common/enums';
import EditTitleModal from '@src/components/common/components/EditTitleModal';
import MaxTakesModal from '@src/components/songFolder/components/MaxTakesModal';
import { setCurrentSongId } from '@src/state/slice/currentSongSlice';

const SongScreen = () => {
  const styles = useSongScreenStyles();
  const globalStyles = useGlobalStyles();
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const totalTakes = useAppSelector(selectCurrentSongTotalTakes);
  const takes = useAppSelector(selectCurrentSongTakes);
  const isPermissionGranted = useMicrophonePermissions();
  const { clearPlayback } = useAudioPlayer();

  const [toDelete, setToDelete] = useState<DeleteObject>(EMPTY_DELETE_OBJECT);
  const [currentTake, setCurrentTake] = useState<Take>(EMPTY_TAKE);
  const [isPermissionsNeededModalOpen, setIsPermissionsNeededModalOpen] =
    useState<boolean>(false);
  const [isMaxTakesModalOpen, setIsMaxTakesModalOpen] =
    useState<boolean>(false);
  const [titleToEdit, setTitleToEdit] = useState<{
    songTitle: string;
    songId: number;
    takeTitle?: string;
    takeId?: number;
  }>({ songTitle: '', takeTitle: '', songId: -1, takeId: -1 });

  const onRecordPress = () => {
    if (takes.length <= 6) {
      const recording = () => {
        const newTakeTitle = `Take ${totalTakes + 1}`;

        navigation.navigate(Screen.RECORDING, { title: newTakeTitle });
      };

      clearPlayback();

      isPermissionGranted === 'granted'
        ? recording()
        : setIsPermissionsNeededModalOpen(true);
    } else {
      setIsMaxTakesModalOpen(true);
    }
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
      dispatch(setCurrentSongId(-1));
    });
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <SongDisplay
        takes={takes}
        setToDelete={setToDelete}
        setCurrentTake={setCurrentTake}
        setTitleToEdit={setTitleToEdit}
      />
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
      <EditTitleModal
        titleToEdit={titleToEdit}
        setTitleToEdit={setTitleToEdit}
      />
      <MaxTakesModal
        isMaxTakesModalOpen={isMaxTakesModalOpen}
        setIsMaxTakesModalOpen={setIsMaxTakesModalOpen}
      />
    </View>
  );
};

export default SongScreen;
