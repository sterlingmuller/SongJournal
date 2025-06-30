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

  const keyboardOffset = Platform.OS === 'ios' ? headerHeight + (toolbarHeight * 0.5) : headerHeight - (toolbarHeight * 0.8);

  return (
    <KeyboardAvoidingView
      behavior={'height'}
      keyboardVerticalOffset={keyboardOffset}
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
