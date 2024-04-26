import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import lyricSheetStyles from '@src/styles/lyricsSheet';
import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { page } from '@src/common/types';

interface Props {
  page: page;
}

const LyricsSheet = ({ page }: Props) => {
  const { lyrics, info } = page;
  const { bpm, keySignature, time } = info;

  const [newLyrics, setNewLyrics] = useState<string>(lyrics);
  const disabled: boolean = !lyrics;

  return (
    <View style={lyricSheetStyles.container}>
      <View style={lyricSheetStyles.options}>
        <EditIcon />
        <ChordsIcon />
        <MetronomeIcon />
        <ShareIcon />
      </View>
      <TextInput
        style={lyricSheetStyles.textContainer}
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

export default LyricsSheet;
