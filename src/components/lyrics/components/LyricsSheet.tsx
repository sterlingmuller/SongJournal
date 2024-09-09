import React from 'react';
import { ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import useLyricScreenStyles from '@src/styles/lyricsScreen';

interface Props {
  lyrics: string;
}

const LyricsSheet = ({ lyrics }: Props) => {
  const styles = useLyricScreenStyles();

  return (
    <ScrollView style={styles.lyricsContainer}>
      <HTMLView value={lyrics} />
    </ScrollView>
  );
};

export default LyricsSheet;
