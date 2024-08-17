import React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import useLyricScreenStyles from '@src/styles/lyricsScreen';

interface Props {
  lyrics: string;
}

const LyricsSheet = ({ lyrics }: Props) => {
  const { width } = useWindowDimensions();
  const styles = useLyricScreenStyles();

  return (
    <ScrollView style={styles.lyricsContainer}>
      <RenderHtml contentWidth={width} source={{ html: lyrics }} />
    </ScrollView>
  );
};

export default LyricsSheet;
