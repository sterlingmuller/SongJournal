import React from 'react';
import { View, Button } from 'react-native';
import Modal from 'react-native-modal';

import { deleteObject } from '@src/common/types';
import { EMPTY_DELETE_OBJECT } from '@src/common/constants';
import StyledText from '@src/common/components/StyledText';
import useDeleteModalStyles from '@src/styles/deleteModal';
import { deleteSong } from '@src/repositories/SongsRepository';
import { useSQLiteContext } from 'expo-sqlite';
import { removeSong, removeTake } from '@src/slice/songsSlice';
import { useAppDispatch } from '@src/common/hooks';
import { deleteTake } from '@src/repositories/TakeRepository';

interface Props {
  setToDelete: (value: deleteObject | null) => void;
  deleteText: string;
  toDelete: deleteObject | null;
}

const DeleteModal = (props: Props) => {
  const styles = useDeleteModalStyles();
  const db = useSQLiteContext();
  const dispatch = useAppDispatch();

  const { deleteText, setToDelete, toDelete } = props;
  const { title, songId, takeId, type } = toDelete;

  console.log('to delete:', toDelete);

  const onExitPress = (): void => {
    setToDelete(EMPTY_DELETE_OBJECT);
  };

  const onDeletePress = async () => {
    if (type === 'song') {
      await deleteSong(db, songId);

      dispatch(removeSong(songId));
    } else if (type === 'take') {
      await deleteTake(db, takeId);

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
