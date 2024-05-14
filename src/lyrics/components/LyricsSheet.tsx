import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { pageOption, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import PageOptions from '../subcomponents/PageOptions';
import useLyricSheetStyles from '@src/styles/lyricsSheet';
import { useSelector } from 'react-redux';
import { selectCurrentSongPage } from '@src/selectors/currentSongSelector';

const LyricsSheet = () => {
  const { lyrics, info } = useSelector(selectCurrentSongPage);
  const styles = useLyricSheetStyles();

  const [newLyrics, setNewLyrics] = useState<string>(lyrics);
  const [selectedOption, setSelectedOption] = useState<pageOption>('edit');
  const disabled: boolean = !lyrics;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.details}>
          {SONG_DETAILS.map(
            ({ label, key }: songDetail) =>
              !!info[key] && (
                <SongDetail
                  key={label}
                  label={label}
                  value={info[key]}
                  onPageScreen
                />
              ),
          )}
        </View>
        <PageOptions
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </View>
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

export default LyricsSheet;
