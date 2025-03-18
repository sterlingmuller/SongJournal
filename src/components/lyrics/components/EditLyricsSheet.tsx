import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';

import useLyricScreenStyles from '@src/styles/lyricsScreen';
import TextEditor from '@src/components/common/components/TextEditor';
import useDebounce from '@src/hooks/useDebounce';
import { SCREEN_HEIGHT } from '@src/components/common/constants';

interface Props {
  newLyrics: string;
  setNewLyrics: (value: string) => void;
}

const EditLyricsSheet = ({ newLyrics, setNewLyrics }: Props) => {
  const styles = useLyricScreenStyles();
  const initialLyricsRef = useRef(newLyrics);

  const debouncedLyrics = useDebounce((lyrics: string) => {
    setNewLyrics(lyrics);
  }, 400);

  const handleLyricsChange = (lyrics: string) => {
    debouncedLyrics(lyrics);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={SCREEN_HEIGHT * 0.05}
    >
      <View style={[styles.editTextContainer, { height: '90%' }]}>
        <TextEditor
          initialText={initialLyricsRef.current}
          setText={handleLyricsChange}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditLyricsSheet;
