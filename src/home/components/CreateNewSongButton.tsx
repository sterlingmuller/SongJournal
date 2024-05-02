import React from 'react';
import { TouchableOpacity } from 'react-native';

import NewSongIcon from '@src/icons/NewSongIcon';
import useCreateNewSongButtonStyles from '@styles/createNewSongButton';

interface Props {
  setIsNewSongOpen: (value: boolean) => void;
}

const CreateNewSongButton = ({ setIsNewSongOpen }: Props) => {
  const styles = useCreateNewSongButtonStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsNewSongOpen(true)}
    >
      <NewSongIcon />
    </TouchableOpacity>
  );
};

export default CreateNewSongButton;
