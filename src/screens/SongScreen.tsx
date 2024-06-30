import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/common/components/RecordButton';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';
import { DELETE_TAKE_TEXT, EMPTY_DELETE_OBJECT } from '@src/common/constants';
import { ScrollView } from 'react-native-gesture-handler';
import useSongScreenStyles from '@src/styles/songScreen';
import useGlobalStyles from '@src/styles/global';
import PermissionsNeededModal from '@src/songFolder/components/PermissionsNeededModal';
import useMicrophonePermissions from '@src/hooks/useMicrophonePermissions';
import { RootStackParamList, deleteObject, take } from '@src/common/types';
import { useAppSelector } from '@src/common/hooks';
import {
  selectCurrentSongTakes,
  selectCurrentSongTotalTakes,
} from '@src/selectors/songsSelector';
import useAudioPlayer from '@src/utils/useAudioPlayer';

const SongScreen = () => {
  const styles = useSongScreenStyles();
  const globalStyles = useGlobalStyles();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { togglePlayback } = useAudioPlayer();

  const takes = useAppSelector(selectCurrentSongTakes);
  const totalTakes = useAppSelector(selectCurrentSongTotalTakes);

  const [toDelete, setToDelete] = useState<deleteObject>(EMPTY_DELETE_OBJECT);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
  const [isPermissionsNeededModalOpen, setIsPermissionsNeededModalOpen] =
    useState<boolean>(false);

  const orderedTakes: take[] = [...takes].reverse();
  const isPermissionGranted = useMicrophonePermissions();

  const onTogglePlayback = (uri: string, takeId: number) => {
    togglePlayback(uri, takeId);
  };

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
    orderedTakes.map((take: take) => (
      <SongTake
        key={take.title}
        take={take}
        setToDelete={setToDelete}
        setIsNotesModalOpen={setIsNotesModalOpen}
        onTogglePlayback={onTogglePlayback}
      />
    ));

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
      <DeleteModal
        deleteText={DELETE_TAKE_TEXT}
        toDelete={toDelete}
        setToDelete={setToDelete}
      />
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
