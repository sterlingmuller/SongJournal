import React from 'react';
import { TouchableOpacity } from 'react-native';

import NewSongIcon from '@src/icons/NewSongIcon';
import useCreateNewSongButtonStyles from '@styles/createNewSongButton';
import { useAddSong } from '@src/hooks/useAddSong';
import { useSQLiteContext } from 'expo-sqlite';

interface Props {
  setIsNewSongOpen: (value: boolean) => void;
}

const CreateNewSongButton = ({ setIsNewSongOpen }: Props) => {
  const db = useSQLiteContext();
  const styles = useCreateNewSongButtonStyles();

  return (
    <TouchableOpacity
      style={styles.container}
      // onPress={() => setIsNewSongOpen(true)}
      onPress={() => {
        console.log('meepvderf');
        useAddSong(db, 'blurgh time');
        // SongRepository.getAllSongs();
      }}
      testID="touchable-opacity"
    >
      <NewSongIcon />
    </TouchableOpacity>
  );
};

export default CreateNewSongButton;
