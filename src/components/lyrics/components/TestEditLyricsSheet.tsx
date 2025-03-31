import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { SCREEN_HEIGHT } from '@src/components/common/constants';
import { isTextEmpty } from '@src/utils/isTextEmpty';
import CustomTextEditor from '@src/components/common/components/CustomTextEditor';

interface Props {
  newLyrics: string;
  setNewLyrics: (value: string) => void;
}

const TestEditLyricsSheet = ({ newLyrics, setNewLyrics }: Props) => {
  const initialLyricsRef = useRef(newLyrics);

  const handleLyricsChange = (lyrics: string) => {
    console.log('lyrics:', lyrics);
    const normalizedLyrics = isTextEmpty(lyrics) ? '' : lyrics;
    setNewLyrics(normalizedLyrics);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={SCREEN_HEIGHT * 0.05}
    >
      <CustomTextEditor
        text={initialLyricsRef.current}
        setText={handleLyricsChange}
      />
    </KeyboardAvoidingView>
  );
};

export default TestEditLyricsSheet;
