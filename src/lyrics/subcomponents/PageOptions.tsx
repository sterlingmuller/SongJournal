import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import lyricSheetStyles from '@src/styles/lyricsSheet';
import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import { pageOption } from '@src/common/types';

interface Props {
  selectedOption: pageOption;
  setSelectedOption: (value: pageOption) => void;
}

const PageOptions = ({ selectedOption, setSelectedOption }: Props) => {
  return (
    <View style={lyricSheetStyles.options}>
      <TouchableOpacity
        style={[
          lyricSheetStyles.iconButton,
          selectedOption === 'edit' && lyricSheetStyles.selected,
        ]}
        onPress={() => setSelectedOption('edit')}
      >
        <EditIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          lyricSheetStyles.iconButton,
          selectedOption === 'chords' && lyricSheetStyles.selected,
        ]}
        onPress={() => setSelectedOption('chords')}
      >
        <ChordsIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          lyricSheetStyles.iconButton,
          selectedOption === 'metronome' && lyricSheetStyles.selected,
        ]}
        onPress={() => setSelectedOption('metronome')}
      >
        <MetronomeIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          lyricSheetStyles.iconButton,
          selectedOption === 'share' && lyricSheetStyles.selected,
        ]}
        onPress={() => setSelectedOption('share')}
      >
        <ShareIcon />
      </TouchableOpacity>
    </View>
  );
};

export default PageOptions;
