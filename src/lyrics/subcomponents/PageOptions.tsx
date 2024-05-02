import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import { pageOption } from '@src/common/types';
import useLyricSheetStyles from '@src/styles/lyricsSheet';

interface Props {
  selectedOption: pageOption;
  setSelectedOption: (value: pageOption) => void;
}

const PageOptions = ({ selectedOption, setSelectedOption }: Props) => {
  const styles = useLyricSheetStyles();

  return (
    <View style={styles.options}>
      <TouchableOpacity
        style={[
          styles.iconButton,
          selectedOption === 'edit' && styles.selected,
        ]}
        onPress={() => setSelectedOption('edit')}
      >
        <EditIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconButton,
          selectedOption === 'chords' && styles.selected,
        ]}
        onPress={() => setSelectedOption('chords')}
      >
        <ChordsIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconButton,
          selectedOption === 'metronome' && styles.selected,
        ]}
        onPress={() => setSelectedOption('metronome')}
      >
        <MetronomeIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.iconButton,
          selectedOption === 'share' && styles.selected,
        ]}
        onPress={() => setSelectedOption('share')}
      >
        <ShareIcon />
      </TouchableOpacity>
    </View>
  );
};

export default PageOptions;
