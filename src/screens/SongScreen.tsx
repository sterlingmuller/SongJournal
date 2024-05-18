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
import { take } from '@src/common/types';
import useSongScreenStyles from '@src/styles/songScreen';
import useGlobalStyles from '@src/styles/global';
import PermissionsNeededModal from '@src/songFolder/components/PermissionsNeededModal';
import useMicrophonePermissions from '@src/hooks/useMicrophonePermissions';
import {
  selectCurrentSongId,
  selectCurrentSongTakes,
} from '@src/selectors/currentSongSelector';
import { RootStackParamList } from '@src/common/types';
import { useAppDispatch } from '@src/common/hooks';
import { setCurrentTake } from '@src/slice/currentTakeSlice';
import { selectCurrentTake } from '@src/selectors/currentTakeSelector';

const SongScreen = () => {
  const styles = useSongScreenStyles();
  const globalStyles = useGlobalStyles();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const takes = useSelector(selectCurrentSongTakes);
  const songId = useSelector(selectCurrentSongId);
  const currentTake = useSelector(selectCurrentTake);

  console.log('currentTake', currentTake);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState<boolean>(false);
  const [isPermissionsNeededModalOpen, setIsPermissionsNeededModalOpen] =
    useState<boolean>(false);

  const orderedTakes: take[] = [...takes].reverse();
  const isPermissionGranted = useMicrophonePermissions();

  const onRecordPress = () => {
    const recording = () => {
      const newTakeId = orderedTakes.length ? orderedTakes[0].takeId + 1 : 0;
      const newTakeTitle = `Take ${newTakeId + 1}`;
      const newTake: take = {
        takeId: newTakeId,
        songId,
        title: newTakeTitle,
        date: '',
        notes: '',
      };

      dispatch(setCurrentTake(newTake));

      navigate('Recording');
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
      <RecordButton onPress={onRecordPress} />
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
