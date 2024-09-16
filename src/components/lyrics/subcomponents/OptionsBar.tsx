import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import { LyricsScreenOption, Page } from '@src/components/common/types';
import useOptionBarStyles from '@src/styles/optionBar';
import { LYRIC_SCREEN_OPTIONS } from '@src/components/common/constants';
import useFileShare from '@src/utils/hooks/useFileShare';
import { useAppSelector } from '@src/utils/hooks/typedReduxHooks';
import {
  selectCurrentSongArtistId,
  selectCurrentSongTitle,
} from '@src/state/selectors/songsSelector';
import { LyricsOption } from '@src/components/common/enums';

interface Props {
  selectedOption: LyricsOption;
  setSelectedOption: (value: LyricsOption) => void;
  page: Page;
}

const OptionsBar = ({ selectedOption, setSelectedOption, page }: Props) => {
  const styles = useOptionBarStyles();
  const { shareLyrics } = useFileShare();
  const songTitle = useAppSelector(selectCurrentSongTitle);
  const artistId = useAppSelector(selectCurrentSongArtistId);

  const shareLyricsSync = async () => {
    await shareLyrics(songTitle, page, artistId);
    setSelectedOption(LyricsOption.NONE);
  };

  const handleOptionPress = (optionName: LyricsOption) => {
    setSelectedOption(
      optionName === selectedOption ? LyricsOption.NONE : optionName,
    );

    switch (optionName) {
      case LyricsOption.SHARE: {
        shareLyricsSync();
      }
    }
  };

  return (
    <View style={styles.options}>
      {LYRIC_SCREEN_OPTIONS.map((option: LyricsScreenOption) => {
        const inDevelopment =
          option.name === LyricsOption.CHORDS ||
          option.name === LyricsOption.METRONOME;

        return (
          <TouchableOpacity
            key={option.name}
            style={[
              styles.iconButton,
              selectedOption === option.name && styles.selected,
            ]}
            onPress={() => handleOptionPress(option.name)}
            disabled={inDevelopment}
          >
            {<option.icon />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default OptionsBar;
