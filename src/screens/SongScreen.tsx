import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import SongTake from '@src/songFolder/components/SongTake';
import RecordButton from '@src/common/components/RecordButton';
import DeleteModal from '@src/common/components/DeleteModal';
import NotesModal from '@src/songFolder/components/NotesModal';
import { DELETE_TAKE_TEXT } from '@src/common/constants';
import { ScrollView } from 'react-native-gesture-handler';
import { song, take } from '@src/common/types';
import useSongScreenStyles from '@src/styles/songScreen';
import useGlobalStyles from '@src/styles/global';
import PermissionsNeededModal from '@src/songFolder/components/PermissionsNeededModal';
import useMicrophonePermissions from '@src/hooks/useMicrophonePermissions';
import { RootStackParamList } from '@src/common/types';
import { useAppDispatch, useAppSelector } from '@src/common/hooks';
import { selectCurrentSong } from '@src/selectors/currentSongSelector';
import { RootState } from '@src/store';
import {
  selectTakesBySongId,
  selectTotalTakesBySongIndex,
} from '@src/selectors/songsSelector';

const SongScreen = () => {
  const styles = useSongScreenStyles();
  const globalStyles = useGlobalStyles();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  // const dispatch = useAppDispatch();

  // const takes = useAppSelector(selectTakesBySongId);
  const takes = [];
  // const songId = useAppSelector(selectCurrentSongId);
  // const currentSong = useSelector((state: RootState) => selectSongById(state));
  const totalTakes = useAppSelector(selectTotalTakesBySongIndex);

  // const totalTakes = useSelector(selectCurrentSongTotalTakes);
  // const currentTake = useSelector(selectCurrentTake);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
  const [isPermissionsNeededModalOpen, setIsPermissionsNeededModalOpen] =
    useState<boolean>(false);

  // const orderedTakes: take[] = [...takes].reverse();
  const isPermissionGranted = useMicrophonePermissions();

  // console.log('takes', takes);

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

  return (
    <View style={globalStyles.container}>
      <ScrollView>
        {/* <View style={styles.takes}>
          {orderedTakes.map((take: take) => (
            <SongTake
              key={take.title}
              take={take}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsNotesModalOpen={setIsNotesModalOpen}
              setCurrentTake={setCurrentTake}
            />
          ))}
        </View> */}
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
