import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { isTextEmpty } from '@src/utils/isTextEmpty';
import CustomTextEditor from '@src/components/common/components/CustomTextEditor';

interface Props {
  newLyrics: string;
  setNewLyrics: (value: string) => void;
  headerHeight: number;
}

const EditLyricsSheet = ({ newLyrics, setNewLyrics, headerHeight }: Props) => {
  const initialLyricsRef = useRef(newLyrics);
  const [toolbarHeight, setToolbarHeight] = useState(0);

  const handleLyricsChange = (lyrics: string) => {
    const normalizedLyrics = isTextEmpty(lyrics) ? '' : lyrics;
    setNewLyrics(normalizedLyrics);
  };

  const vertOffset = headerHeight - toolbarHeight;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={vertOffset}
    >
      <CustomTextEditor
        text={initialLyricsRef.current}
        setText={handleLyricsChange}
        setToolbarHeight={setToolbarHeight}
      />
    </KeyboardAvoidingView>
  );
};

export default EditLyricsSheet;
