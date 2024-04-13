import React from 'react';
import { TouchableOpacity } from 'react-native';

import NewSongIcon from '@src/icons/NewSongIcon';
import createNewSongButtonStyles from '@styles/createNewSongButton';

const CreateNewSongButton = () => {
  // const onPress = ;

  return (
    <TouchableOpacity style={createNewSongButtonStyles.container}>
      <NewSongIcon />
    </TouchableOpacity>
  );
};

export default CreateNewSongButton;
