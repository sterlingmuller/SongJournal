import React from 'react';
import { TouchableOpacity } from 'react-native';

import NewSongIcon from '@src/icons/NewSongIcon';
import useCreateNewSongButtonStyles from '@src/styles/createNewSongButton';

interface Props {
  setIsNewSongOpen: (value: boolean) => void;
}

const CreateNewSongButton = ({ setIsNewSongOpen }: Props) => {
  const styles = useCreateNewSongButtonStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setIsNewSongOpen(true)}
      testID="touchable-opacity"
      hitSlop={10}
    >
      <NewSongIcon />
    </TouchableOpacity>
  );
};

export default CreateNewSongButton;
