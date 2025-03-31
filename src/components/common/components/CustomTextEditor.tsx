import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSelectionChangeEventData,
  View,
} from 'react-native';
import EditorToolbar from './EditorToolbar';
import ChordWheelModal from '@src/components/lyrics/components/ChordWheelModal';
import { useEffect, useRef, useState } from 'react';
import useTextEditorStyles from '@src/styles/textEditor';
import useDebounce from '@src/hooks/useDebounce';
import {
  insertAtCursor,
  insertChord,
  insertSectionAtCursor,
} from '@src/utils/textEditorUtils';
import { SongInfo } from '../types';
import { LyricsSection } from '../enums';

interface CustomTextEditorProps {
  text: string;
  setText: (text: string) => void;
}

const CustomTextEditor = ({ text, setText }: CustomTextEditorProps) => {
  const styles = useTextEditorStyles();
  const textInputRef = useRef<TextInput>(null);

  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [localText, setLocalText] = useState(text);
  const [selection, setSelection] = useState({ start: -1, end: -1 });

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const debouncedInput = useDebounce((text: string) => {
    setText(text);
  }, 400);

  const handleTextChange = (newText: string) => {
    setLocalText(newText);
    debouncedInput(newText);
  };

  const handleAddChord = (_: keyof SongInfo, chord: string) => {
    const newText = insertChord(localText, chord, selection);
    setLocalText(newText);
    debouncedInput(newText);
  };

  const handleSectionInsertion = (section: LyricsSection) => {
    const { text: newText, cursorPosition } = insertSectionAtCursor(
      localText,
      selection.start,
      section,
    );

    setLocalText(newText);
    debouncedInput(newText);

    setTimeout(() => {
      textInputRef.current?.focus();
      setSelection({
        start: cursorPosition,
        end: cursorPosition,
      });
    }, 50);
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoFocus={true}
        ref={textInputRef}
        multiline
        value={localText}
        onChangeText={handleTextChange}
        onSelectionChange={(
          e: NativeSyntheticEvent<TextInputSelectionChangeEventData>,
        ) => {
          setSelection({
            start: e.nativeEvent.selection.start,
            end: e.nativeEvent.selection.end,
          });
        }}
        style={styles.editor}
      />

      <EditorToolbar
        onBold={() => {
          setLocalText(insertAtCursor(localText, selection, '**', '**'));
        }}
        onItalic={() => {
          setLocalText(insertAtCursor(localText, selection, '*', '*'));
        }}
        onUnderline={() => {
          setLocalText(insertAtCursor(localText, selection, '<u>', '</u>'));
        }}
        onHyphen={() => {
          setLocalText(insertAtCursor(localText, selection, '-'));
        }}
        onTextSection={handleSectionInsertion}
        onAddChord={() => setIsWheelOpen(true)}
      />

      <ChordWheelModal
        isWheelOpen={isWheelOpen}
        setIsWheelOpen={setIsWheelOpen}
        handleInputChange={handleAddChord}
        initialValue={''}
      />
    </View>
  );
};

export default CustomTextEditor;
