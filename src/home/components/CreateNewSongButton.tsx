import React from 'react';
import { TouchableOpacity } from 'react-native';

import NewSongIcon from '@src/icons/NewSongIcon';
import createNewSongButtonStyles from '@styles/createNewSongButton';

const CreateNewSongButton = ({setIsNewSongOpen}) => {
  // const onPress = ;

  return (
    <TouchableOpacity style={createNewSongButtonStyles.container} onPress={() => setIsNewSongOpen(true)}>
      <NewSongIcon />
    </TouchableOpacity>
  );
};

export default CreateNewSongButton;
