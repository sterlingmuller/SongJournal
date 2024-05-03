import React from 'react';
import { View, Modal, TouchableOpacity, Button } from 'react-native';

import { song, take } from '@src/common/types';
import { EMPTY_TAKE } from '@src/common/constants';
import StyledText from '@src/common/components/StyledText';
import useDeleteModalStyles from '@src/styles/deleteModal';

interface Props {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (value: boolean) => void;
  setToDelete: (value: take | song) => void;
  deleteText: string;
  toDelete: take | song;
}

const DeleteModal = (props: Props) => {
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    deleteText,
    setToDelete,
    toDelete,
  } = props;
  const styles = useDeleteModalStyles();

  const onExitPress = (): void => {
    setToDelete(EMPTY_TAKE);
    setIsDeleteModalOpen(false);
  };

  return (
    <Modal transparent visible={isDeleteModalOpen}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={styles.container}>
          <StyledText style={styles.title}>
            Delete from Google account and current device
          </StyledText>
          <StyledText style={styles.text}>
            {toDelete && toDelete.title}
            {deleteText}
          </StyledText>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title="Delete" onPress={() => null} color="red" />
            </View>
            <View style={styles.button}>
              <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DeleteModal;
