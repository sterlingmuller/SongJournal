import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/common/components/RecordButton';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';
import { DELETE_TAKE_TEXT } from '@src/common/constants';
import { ScrollView } from 'react-native-gesture-handler';
import useSongScreenStyles from '@src/styles/songScreen';
import useGlobalStyles from '@src/styles/global';
import PermissionsNeededModal from '@src/songFolder/components/PermissionsNeededModal';
import useMicrophonePermissions from '@src/hooks/useMicrophonePermissions';
import { RootStackParamList, take } from '@src/common/types';
import { useAppSelector } from '@src/common/hooks';
import {
  selectCurrentSongTakes,
  selectCurrentSongTotalTakes,
  selectCurrentSongSelectedTakeId,
} from '@src/selectors/songsSelector';
import { createHandleTogglePlayPause } from '@src/utils/createHandleTogglePlayPause';

const SongScreen = () => {
  const styles = useSongScreenStyles();
  const globalStyles = useGlobalStyles();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const takes = useAppSelector(selectCurrentSongTakes);
  const totalTakes = useAppSelector(selectCurrentSongTotalTakes);
  const selectedTakeId = useAppSelector(selectCurrentSongSelectedTakeId);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<number>(-1);
  const [isPermissionsNeededModalOpen, setIsPermissionsNeededModalOpen] =
    useState<boolean>(false);

  const orderedTakes: take[] = [...takes].reverse();
  const isPermissionGranted = useMicrophonePermissions();

  const onTogglePlayPause = createHandleTogglePlayPause(
    playingId,
    setPlayingId,
  );

  const onRecordPress = () => {
    const recording = () => {
      const newTakeTitle = `Take ${totalTakes + 1}`;

      navigate('Recording', { title: newTakeTitle });
    };

    isPermissionGranted ? recording() : setIsPermissionsNeededModalOpen(true);
  };

  useEffect(() => {
    if (isPermissionGranted && isPermissionsNeededModalOpen) {
      setIsPermissionsNeededModalOpen(false);
    }
  }, [
    isPermissionGranted,
    isPermissionsNeededModalOpen,
    setIsPermissionsNeededModalOpen,
  ]);

  const renderTakes = () =>
    orderedTakes.map((take: take) => {
      const isStarred = take.takeId === selectedTakeId;

      return (
        <SongTake
          key={take.title}
          take={take}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setIsNotesModalOpen={setIsNotesModalOpen}
          starred={isStarred}
          onTogglePlayPause={onTogglePlayPause}
        />
      );
    });

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={styles.takes}>{renderTakes()}</View>
      </ScrollView>
      <RecordButton
        onPress={onRecordPress}
        isRecording={false}
        style={styles.recordingButton}
      />
      {/* <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deleteText={DELETE_TAKE_TEXT}
        setCurrentTake={setCurrentTake}
        currentTake={currentTake}
      /> */}
      {/* {currentTake && (
        <NotesModal
          isNotesModalOpen={isNotesModalOpen}
          setIsNotesModalOpen={setIsNotesModalOpen}
          setCurrentTake={setCurrentTake}
          currentTake={currentTake}
        />
      )} */}
      <PermissionsNeededModal
        isPermissionsNeededModalOpen={isPermissionsNeededModalOpen}
        setIsPermissionsNeededModalOpen={setIsPermissionsNeededModalOpen}
      />
    </View>
  );
};

export default SongScreen;
