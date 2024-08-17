import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import TrashIcon from '@src/icons/TrashIcon';
import useSongFolderStyles from '@src/styles/songFolder';
import { DeleteObject } from '@src/components/common/types';

interface Props {
  title: string;
  id: number;
  setToDelete: (value: DeleteObject | null) => void;
}

const DeleteRow = (props: Props) => {
  const styles = useSongFolderStyles();
  const { title, id, setToDelete } = props;

  const onDeletePress = () => {
    setToDelete({ type: 'song', songId: id, title });
  };

  return (
    <View style={styles.deleteRow}>
      <TouchableOpacity onPress={onDeletePress} style={styles.deleteButton}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
};

export default DeleteRow;
