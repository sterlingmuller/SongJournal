import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NewSongIcon from '../icons/NewSongIcon';
import createNewSongButtonStyles from '../styles/createNewSongButton';

const CreateNewSongButton = () => {
  // const onPress = ;

  return (
    <TouchableOpacity style={createNewSongButtonStyles.container}>
      <NewSongIcon />
    </TouchableOpacity>
  );
};

export default CreateNewSongButton;
