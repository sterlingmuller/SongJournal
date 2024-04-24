import React from 'react';
import { View, TextInput } from 'react-native';

import lyricSheetStyles from '@src/styles/lyricsSheet';
import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';

const LyricsSheet = () => (
  <View style={lyricSheetStyles.container}>
    <View style={lyricSheetStyles.options}>
      <EditIcon />
      <ChordsIcon />
      <MetronomeIcon />
      <ShareIcon />
    </View>
    <TextInput
      style={lyricSheetStyles.textContainer}
      placeholder="Add lyrics..."
      textAlignVertical="top"
    />
    <SaveAndCancelButtons />
  </View>
);

export default LyricsSheet;
