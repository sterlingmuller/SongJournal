import React from 'react';
import { TouchableOpacity } from 'react-native';

import NewSongIcon from '@src/icons/NewSongIcon';
import createNewSongButtonStyles from '@styles/createNewSongButton';

interface Props {
  setIsNewSongOpen: (value: boolean) => void;
}

const CreateNewSongButton = ({ setIsNewSongOpen }: Props) => {
  return (
    <TouchableOpacity
      style={createNewSongButtonStyles.container}
      onPress={() => setIsNewSongOpen(true)}
    >
      <NewSongIcon />
    </TouchableOpacity>
  );
};

export default CreateNewSongButton;
