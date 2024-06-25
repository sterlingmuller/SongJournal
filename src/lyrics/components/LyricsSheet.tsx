import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';

interface Props {
  lyrics: string;
}

const LyricsSheet = ({ lyrics }: Props) => {
  const { width } = useWindowDimensions();

  return (
    <View>
      <RenderHtml contentWidth={width} source={{ html: lyrics }} />
    </View>
  );
};

export default LyricsSheet;
