import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/songFolder/subcomponents/RecordButton';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';
import { DELETE_TAKE_TEXT } from '@src/common/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { take } from '@src/common/types';
import useSongScreenStyles from '@src/styles/songScreen';
import useGlobalStyles from '@src/styles/global';
import PermissionsNeededModal from '@src/songFolder/components/PermissionsNeededModal';
import useMicrophonePermissions from '@src/hooks/useMicrophonePermissions';
import { selectCurrentSongTakes } from '@src/selectors/currentSongSelector';

const SongScreen = () => {
  const takes = useSelector(selectCurrentSongTakes);
  const styles = useSongScreenStyles();
  const globalStyles = useGlobalStyles();

  const [currentTake, setCurrentTake] = useState<take | null>();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
  const [isPermissionsNeededModalOpen, setIsPermissionsNeededModalOpen] =
    useState<boolean>(false);

  const orderedTakes: take[] = [...takes].reverse();
  const isPermissionGranted = useMicrophonePermissions();

  useEffect(() => {
    if (isPermissionGranted && isPermissionsNeededModalOpen) {
      setIsPermissionsNeededModalOpen(false);
    }
  }, [
    isPermissionGranted,
    isPermissionsNeededModalOpen,
    setIsPermissionsNeededModalOpen,
  ]);

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        <View style={styles.takes}>
          {orderedTakes.map((take: take) => (
            <SongTake
              key={take.title}
              take={take}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsNotesModalOpen={setIsNotesModalOpen}
              setCurrentTake={setCurrentTake}
            />
          ))}
        </View>
      </ScrollView>
      <RecordButton
        isRecording={isRecording}
        setIsRecording={setIsRecording}
        isPermissionGranted={isPermissionGranted}
        setIsPermissionsNeededModalOpen={setIsPermissionsNeededModalOpen}
      />
      {/* <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        deleteText={DELETE_TAKE_TEXT}
        setCurrentTake={setCurrentTake}
        currentTake={currentTake}
      /> */}
      {currentTake && (
        <NotesModal
          isNotesModalOpen={isNotesModalOpen}
          setIsNotesModalOpen={setIsNotesModalOpen}
          setCurrentTake={setCurrentTake}
          currentTake={currentTake}
        />
      )}
      <PermissionsNeededModal
        isPermissionsNeededModalOpen={isPermissionsNeededModalOpen}
        setIsPermissionsNeededModalOpen={setIsPermissionsNeededModalOpen}
      />
    </View>
  );
};

export default SongScreen;
