import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import songFolderStyle from '@styles/songFolder';
import TrashIcon from '@src/icons/TrashIcon';

interface Props {
  song: string;
  setIsDeleteModalOpen: (value: string) => void;
}

const DeleteRow = ({ song, setIsDeleteModalOpen }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <View style={songFolderStyle.deleteRow}>
      <TouchableOpacity
        onPress={() => setIsDeleteModalOpen(song)}
        style={songFolderStyle.deleteButton}
      >
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteRow;
