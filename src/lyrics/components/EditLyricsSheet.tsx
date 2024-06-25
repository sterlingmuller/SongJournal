import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { pageOption, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import PageOptions from '../subcomponents/PageOptions';
import useLyricSheetStyles from '@src/styles/lyricsSheet';
import { useSelector } from 'react-redux';
import { selectCurrentSongPage } from '@src/selectors/songsSelector';
import { useAppDispatch } from '@src/common/hooks';
import { useSQLiteContext } from 'expo-sqlite';
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
