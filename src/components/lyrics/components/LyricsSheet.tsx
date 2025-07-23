import React from 'react';
import { ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';

import useLyricScreenStyles from '@src/styles/lyricsScreen';
import useLyricSheetStyles from '@src/styles/lyricsSheets';
import { convertToHtml } from '@src/utils/convertToHtml';
import ComposerMessage from '@src/components/common/components/ComposerMessage';
import { MessageIntent } from '@src/components/common/enums';

interface Props {
  lyrics: string;
}

const LyricsSheet = ({ lyrics }: Props) => {
  const styles = useLyricScreenStyles();
  const lyricSheetStyles = useLyricSheetStyles();

  const htmlLyrics = convertToHtml(lyrics);

  return (
    <>
      {lyrics ? (
        <ScrollView
          style={styles.lyricsContainer}
          contentContainerStyle={styles.lyricsContent}
          showsVerticalScrollIndicator={true}
        >
          <HTMLView value={htmlLyrics} stylesheet={lyricSheetStyles} />
        </ScrollView>
      ) : (
        <ComposerMessage messageIntent={MessageIntent.GET_STARTED_LYRICS} />
      )}
    </>
  );
};

export default LyricsSheet;
