import React, { useRef } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';

import { isTextEmpty } from '@src/utils/isTextEmpty';
import CustomTextEditor from '@src/components/common/components/CustomTextEditor';

interface Props {
  newLyrics: string;
  setNewLyrics: (value: string) => void;
  headerHeight: number;
}

const TestEditLyricsSheet = ({
  newLyrics,
  setNewLyrics,
  headerHeight,
}: Props) => {
  const initialLyricsRef = useRef(newLyrics);

  const handleLyricsChange = (lyrics: string) => {
    const normalizedLyrics = isTextEmpty(lyrics) ? '' : lyrics;
    setNewLyrics(normalizedLyrics);
  };

  const statusBarHeight =
    Platform.OS === 'android'
      ? StatusBar.currentHeight || 0
      : Platform.OS === 'ios'
        ? 44
        : 20;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={headerHeight - statusBarHeight}
    >
      <CustomTextEditor
        text={initialLyricsRef.current}
        setText={handleLyricsChange}
      />
    </KeyboardAvoidingView>
  );
};

export default TestEditLyricsSheet;
