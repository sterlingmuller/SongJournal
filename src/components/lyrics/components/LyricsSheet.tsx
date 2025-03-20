import React from 'react';
import { ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import useLyricScreenStyles from '@src/styles/lyricsScreen';
import useLyricSheetStyles from '@src/styles/lyricsSheets';

interface Props {
  lyrics: string;
}

const LyricsSheet = ({ lyrics }: Props) => {
  const styles = useLyricScreenStyles();
  const lyricSheetStyles = useLyricSheetStyles();

  return (
    <ScrollView style={styles.lyricsContainer}>
      <HTMLView value={lyrics} stylesheet={lyricSheetStyles} />
    </ScrollView>
  );
};

export default LyricsSheet;
