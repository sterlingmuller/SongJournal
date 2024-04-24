import React from 'react';
import { View, Text, Modal, TouchableOpacity, Button } from 'react-native';

import deleteModalStyle from '@src/styles/deleteModal';
import { deleteTake } from '@src/common/constants';

interface Props {
  isDeleteModalOpen: string;
  setIsDeleteModalOpen: (currentSong: string) => void;
}

const DeleteModal = ({ isDeleteModalOpen, setIsDeleteModalOpen }: Props) => {
  const onExitPress = (): void => setIsDeleteModalOpen('');

  return (
    <Modal transparent visible={!!isDeleteModalOpen}>
      <TouchableOpacity
        style={deleteModalStyle.modalContainer}
        activeOpacity={1}
        onPress={onExitPress}
      >
        <View style={deleteModalStyle.container}>
          <Text style={deleteModalStyle.title}>
            Delete from Google account and all devices
          </Text>
          <Text style={deleteModalStyle.text}>
            {isDeleteModalOpen}
            {deleteTake}
          </Text>
          <View style={deleteModalStyle.buttons}>
            <View style={deleteModalStyle.button}>
              <Button title="Delete" onPress={() => null} color="red" />
            </View>
            <View style={deleteModalStyle.button}>
              <Button title="Cancel" color="#D6D6D6" onPress={onExitPress} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default DeleteModal;
