import React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';
import { useSQLiteContext } from 'expo-sqlite';

import { DeleteObject } from '@src/common/types';
import { EMPTY_DELETE_OBJECT } from '@src/common/constants';
import StyledText from '@src/common/components/StyledText';
import useDeleteModalStyles from '@styles/deleteModal';
import { deleteSong } from '@src/repositories/SongsRepository';
import { removeSong, removeTake } from '@src/slice/songsSlice';
import { useAppDispatch, useAppSelector } from '@src/hooks/typedReduxHooks';
import { deleteTake } from '@src/repositories/TakeRepository';
import { useAudioPlayer } from '@src/context/AudioContext';
import { selectPlayingId } from '@src/selectors/playbackSelector';

interface Props {
  setToDelete: (value: DeleteObject | null) => void;
  deleteText: string;
  toDelete: DeleteObject | null;
}

const DeleteModal = (props: Props) => {
  const styles = useDeleteModalStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();
  const { clearPlayback } = useAudioPlayer();
  const playingId = useAppSelector(selectPlayingId);

  const { deleteText, setToDelete, toDelete } = props;
  const { title, songId, takeId, type } = toDelete;

  const onExitPress = (): void => {
    setToDelete(EMPTY_DELETE_OBJECT);
  };

  const onDeletePress = async () => {
    if (type === 'song') {
      if (songId === playingId) {
        clearPlayback();
      }

      await deleteSong(db, songId);

      dispatch(removeSong(songId));
    } else if (type === 'take') {
      if (takeId === playingId) {
        clearPlayback();
      }
      deleteTake(db, takeId);

      dispatch(removeTake({ songId, takeId }));
    }

    setToDelete(EMPTY_DELETE_OBJECT);
  };

  return (
    <Modal isVisible={!!title} avoidKeyboard onBackdropPress={onExitPress}>
      <View style={styles.container}>
        <StyledText style={styles.title}>
          Delete {title} from Google account and current device
        </StyledText>
        <StyledText style={styles.text}>
          {title}
          {deleteText}
        </StyledText>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title="Delete" onPress={onDeletePress} color="red" />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
