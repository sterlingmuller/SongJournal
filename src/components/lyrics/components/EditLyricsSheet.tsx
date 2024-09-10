import React, { useState } from 'react';
import { View } from 'react-native';

import useLyricScreenStyles from '@src/styles/lyricsScreen';
import TextEditor from '@src/components/common/components/TextEditor';
import useDebounce from '@src/utils/hooks/useDebounce';
import useKeyboardHeight from '@src/utils/hooks/useKeyboardHeight';
import { SCREEN_HEIGHT } from '@src/components/common/constants';

interface Props {
  newLyrics: string;
  setNewLyrics: (value: string) => void;
}

const EditLyricsSheet = ({ newLyrics, setNewLyrics }: Props) => {
  const styles = useLyricScreenStyles();
  const [localLyrics, setLocalLyrics] = useState(newLyrics);
  const keyboardHeight = useKeyboardHeight();

  const textBoxHeight = SCREEN_HEIGHT * 0.8 - keyboardHeight;

  const debouncedLyrics = useDebounce((lyrics: string) => {
    setNewLyrics(lyrics);
  }, 400);

  const handleLyricsChange = (lyrics: string) => {
    setLocalLyrics(lyrics);
    debouncedLyrics(lyrics);
  };

  return (
    <View style={[styles.editTextContainer, { height: textBoxHeight }]}>
      <TextEditor initialText={localLyrics} setText={handleLyricsChange} />
    </View>
  );
};

export default EditLyricsSheet;
