import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { LyricsOptionName, LyricsScreenOption, Page } from '@src/components/common/types';
import useOptionBarStyles from '@src/styles/optionBar';
import { LYRIC_SCREEN_OPTIONS } from '@src/components/common/constants';
import useFileShare from '@src/utils/hooks/useFileShare';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import { selectCurrentSongTitle } from '@src/state/selectors/songsSelector';

interface Props {
  selectedOption: LyricsOptionName;
  setSelectedOption: (value: LyricsOptionName) => void;
  page: Page;
}

const OptionsBar = ({ selectedOption, setSelectedOption, page }: Props) => {
  const styles = useOptionBarStyles();
  const { shareLyrics } = useFileShare();
  const songTitle = useAppSelector(selectCurrentSongTitle);

  const shareLyricsSync = async () => {
    await shareLyrics(songTitle, page);
    setSelectedOption('');
  };

  const handleOptionPress = (optionName: LyricsOptionName) => {
    setSelectedOption(optionName === selectedOption ? '' : optionName);

    switch (optionName) {
      case 'Share': {
        shareLyricsSync();
      }
    }
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