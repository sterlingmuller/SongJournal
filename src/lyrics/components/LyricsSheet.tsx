import React, { useState } from 'react';
import { View, TextInput } from 'react-native';

import lyricSheetStyles from '@src/styles/lyricsSheet';
import EditIcon from '@src/icons/EditIcon';
import ChordsIcon from '@src/icons/ChordsIcon';
import MetronomeIcon from '@src/icons/MetronomeIcon';
import ShareIcon from '@src/icons/ShareIcon';
import SaveAndCancelButtons from '@src/common/components/SaveAndCancelButtons';
import { page, songDetail } from '@src/common/types';
import { SONG_DETAILS } from '@src/common/constants';
import SongDetail from '@src/lyrics/subcomponents/SongDetail';

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
        <View style={lyricSheetStyles.options}>
          <EditIcon />
          <ChordsIcon />
          <MetronomeIcon />
          <ShareIcon />
        </View>
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
