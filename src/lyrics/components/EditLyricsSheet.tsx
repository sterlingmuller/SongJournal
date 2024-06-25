import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import { useSelector } from 'react-redux';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { pageOption } from '@src/common/types';
import { useAppDispatch } from '@src/common/hooks';
import useLyricSheetStyles from '@src/styles/lyricsSheet';
import { selectCurrentSongPage } from '@src/selectors/songsSelector';
import { updateLyricsRequest } from '@src/sagas/actionCreators';

interface Props {
  setSelectedOption: (value: pageOption) => void;
  songId: number;
}

const EditLyricsSheet = ({ setSelectedOption, songId }: Props) => {
  const dispatch = useAppDispatch();
  const db = useSQLiteContext();
  const { lyrics } = useSelector(selectCurrentSongPage);
  const styles = useLyricSheetStyles();

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
    <View>
      <TextInput
        style={styles.textContainer}
        value={newLyrics}
        onChangeText={(text: string) => setNewLyrics(text)}
        placeholder="Add lyrics..."
        textAlignVertical="top"
      />
      <SaveAndCancelButtons
        onPress={onSavePress}
        onExitPress={onCancelPress}
        disabled={disabled}
      />
    </View>
  );
};

export default EditLyricsSheet;
