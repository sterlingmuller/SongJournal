import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import TrashIcon from '@src/icons/TrashIcon';
import useSongFolderStyles from '@styles/songFolder';

interface Props {
  song: string;
  setIsDeleteModalOpen: (value: boolean) => void;
}

const DeleteRow = ({ song, setIsDeleteModalOpen }: Props) => {
  const styles = useSongFolderStyles();

  return (
    <View style={styles.deleteRow}>
      <TouchableOpacity
        onPress={() => setIsDeleteModalOpen(song)}
        style={styles.deleteButton}
      >
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteRow;
