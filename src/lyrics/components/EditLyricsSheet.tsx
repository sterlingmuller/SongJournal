import React, { useState } from 'react';
import { View } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useSelector } from 'react-redux';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { LyricsOptionName } from '@src/common/types';
import { useAppDispatch } from '@src/common/hooks';
import useLyricScreenStyles from '@src/styles/lyricsScreen';
import { selectCurrentSongPage } from '@src/selectors/songsSelector';
import { updateLyricsRequest } from '@src/sagas/actionCreators';
import TextEditor from '@src/common/components/TextEditor';

interface Props {
  setSelectedOption: (value: LyricsOptionName) => void;
  songId: number;
}

const EditLyricsSheet = ({ setSelectedOption, songId }: Props) => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { lyrics } = useSelector(selectCurrentSongPage);
  const styles = useLyricScreenStyles();

  const [newLyrics, setNewLyrics] = useState<string>(lyrics);

  const disabled: boolean = newLyrics === lyrics;
  const onCancelPress = () => {
    setNewLyrics(lyrics);
    setSelectedOption('');
  };

  const onSavePress = () => {
    dispatch(
      updateLyricsRequest({
        songId,
        lyrics: newLyrics,
        db,
      }),
    );

    setSelectedOption('');
  };

  return (
    <>
      <View style={styles.editTextContainer}>
        <TextEditor initialText={lyrics} setText={setNewLyrics} />
      </View>
      <SaveAndCancelButtons
        onPress={onSavePress}
        onExitPress={onCancelPress}
        disabled={disabled}
      />
    </>
  );
};

export default EditLyricsSheet;
