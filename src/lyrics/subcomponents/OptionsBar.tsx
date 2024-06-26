import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { LyricsOptionName, LyricsScreenOption } from '@src/common/types';
import useLyricSheetStyles from '@src/styles/lyricsSheet';
import { LYRIC_SCREEN_OPTIONS } from '@src/common/constants';

interface Props {
  selectedOption: LyricsOptionName;
  setSelectedOption: (value: LyricsOptionName) => void;
}

const OptionsBar = ({ selectedOption, setSelectedOption }: Props) => {
  const styles = useLyricSheetStyles();

  const handleOptionPress = (optionName: LyricsOptionName) => {
    setSelectedOption(optionName === selectedOption ? '' : optionName);
  };

  return (
    <View style={styles.options}>
      {LYRIC_SCREEN_OPTIONS.map((option: LyricsScreenOption) => (
        <TouchableOpacity
          key={option.name}
          style={[
            styles.iconButton,
            selectedOption === option.name && styles.selected,
          ]}
          onPress={() => handleOptionPress(option.name)}
        >
          {<option.icon />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default OptionsBar;
