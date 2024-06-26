import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

import useLyricScreenStyles from '@src/styles/lyricsScreen';

interface Props {
  lyrics: string;
}

const LyricsSheet = ({ lyrics }: Props) => {
  const { width } = useWindowDimensions();
  const styles = useLyricScreenStyles();

  return (
    <View style={styles.lyricsContainer}>
      <RenderHtml contentWidth={width} source={{ html: lyrics }} />
    </View>
  );
};

export default LyricsSheet;
