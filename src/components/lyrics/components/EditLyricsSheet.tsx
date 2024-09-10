import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import useLyricScreenStyles from '@src/styles/lyricsScreen';
import TextEditor from '@src/components/common/components/TextEditor';
import useDebounce from '@src/utils/hooks/useDebounce';

interface Props {
  newLyrics: string;
  setNewLyrics: (value: string) => void;
}

const EditLyricsSheet = ({ newLyrics, setNewLyrics }: Props) => {
  const styles = useLyricScreenStyles();
  const [localLyrics, setLocalLyrics] = useState(newLyrics);

  const debouncedLyrics = useDebounce((lyrics: string) => {
    setNewLyrics(lyrics);
  }, 400);

  const handleLyricsChange = (lyrics: string) => {
    setLocalLyrics(lyrics);
    debouncedLyrics(lyrics);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      style={styles.keyboardAvoidingViewContainer}
    >
      <View style={styles.editTextContainer}>
        <TextEditor initialText={localLyrics} setText={handleLyricsChange} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditLyricsSheet;
