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

const EditLyricsSheet = () => {
  const page = useSelector(selectCurrentSongPage);
  const styles = useLyricSheetStyles();

  const [newLyrics, setNewLyrics] = useState<string>();
  const disabled: boolean = !page.lyrics;

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
        onPress={() => null}
        onExitPress={() => null}
        disabled={disabled}
      />
    </View>
  );
};

export default EditLyricsSheet;
