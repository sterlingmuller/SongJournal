import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';

import { LyricsOptionName, LyricsScreenOption, page } from '@src/common/types';
import useOptionBarStyles from '@src/styles/optionBar';
import { LYRIC_SCREEN_OPTIONS } from '@src/common/constants';
import { generatePageHtml } from '@src/utils/generatePageHtml';
import useFileShare from '@src/hooks/useFileShare';
import { useAppSelector } from '@src/common/hooks';
import { selectCurrentSongTitle } from '@src/selectors/songsSelector';

interface Props {
  selectedOption: LyricsOptionName;
  setSelectedOption: (value: LyricsOptionName) => void;
  page: page;
}

const OptionsBar = ({ selectedOption, setSelectedOption, page }: Props) => {
  const styles = useOptionBarStyles();
  const { shareLyrics } = useFileShare();
  const songTitle = useAppSelector(selectCurrentSongTitle);

  const createAndSharePdf = async () => {
    // move html and pdf generation to separate helper, use helper in useFileShare instead of here. Need it for share lyrics and share file
    const pageHtml = generatePageHtml(songTitle, page);
    const { uri } = await Print.printToFileAsync({ html: pageHtml });

    await shareLyrics(uri, songTitle);
    setSelectedOption('');
  };

  const handleOptionPress = (optionName: LyricsOptionName) => {
    setSelectedOption(optionName === selectedOption ? '' : optionName);

    switch (optionName) {
      case 'Share': {
        createAndSharePdf();
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
