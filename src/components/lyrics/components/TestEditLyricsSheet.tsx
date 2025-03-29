import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';

import useLyricScreenStyles from '@src/styles/lyricsScreen';
import TextEditor from '@src/components/common/components/TextEditor';
import useDebounce from '@src/hooks/useDebounce';
import { SCREEN_HEIGHT } from '@src/components/common/constants';
import { isTextEmpty } from '@src/utils/isTextEmpty';
import CustomTextEditor from '@src/components/common/components/CustomTextEditor';

interface Props {
  newLyrics: string;
  setNewLyrics: (value: string) => void;
  isChordMode?: boolean;
}

const TestEditLyricsSheet = ({
  newLyrics,
  setNewLyrics,
  isChordMode = false,
}: Props) => {
  const styles = useLyricScreenStyles();
  const initialLyricsRef = useRef(newLyrics);

  const handleLyricsChange = (lyrics: string) => {
    const normalizedLyrics = isTextEmpty(lyrics) ? '' : lyrics;
    setNewLyrics(normalizedLyrics);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={SCREEN_HEIGHT * 0.05}
    >
      {/* <View style={[styles.editTextContainer, { height: '90%' }]}> */}
      {/* <TextEditor
          initialText={initialLyricsRef.current}
          setText={handleLyricsChange}
          isChordMode={isChordMode}
        /> */}
      <CustomTextEditor
        text={initialLyricsRef.current}
        setText={handleLyricsChange}
      />
      {/* </View> */}
    </KeyboardAvoidingView>
  );
};

export default TestEditLyricsSheet;
