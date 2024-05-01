import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import lyricSheetStyles from '@src/styles/lyricsSheet';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { page, pageOption, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';
import PageOptions from '../subcomponents/PageOptions';

interface Props {
  page: page;
}

const LyricsSheet = ({ page }: Props) => {
  const { lyrics, info } = page;

  const [newLyrics, setNewLyrics] = useState<string>(lyrics);
  const [selectedOption, setSelectedOption] = useState<pageOption>('edit');
  const disabled: boolean = !lyrics;

  return (
    <View style={lyricSheetStyles.container}>
      <View style={lyricSheetStyles.infoContainer}>
        <View style={lyricSheetStyles.details}>
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
