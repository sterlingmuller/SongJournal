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

  const handleInputChange = (_: keyof SongInfo, chord: string) => {
    setLocalText(insertChord(localText, chord, selection));
  };

  const handleSectionInsertion = (section: LyricsSection) => {
    let newText = insertSectionAtCursor(localText, selection.start, section);

    if (!newText.endsWith('\n')) {
      newText += '\n';
    }

    setLocalText(newText);

    const lines = newText.split('\n');
    let charCount = 0;

    let insertedLineIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (charCount + lines[i].length >= selection.start) {
        insertedLineIndex = i;
        break;
      }
      charCount += lines[i].length + 1;
    }
    const cursorPos = charCount + lines[insertedLineIndex].length + 1;

    setTimeout(() => {
      textInputRef.current?.focus();
      setSelection({
        start: cursorPos,
        end: cursorPos,
      });
    }, 50);
  };

  return (
    <View style={styles.container}>
      <TextInput
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
        onTextSection={handleSectionInsertion}
        onAddChord={() => setIsWheelOpen(true)}
      />

      <ChordWheelModal
        isWheelOpen={isWheelOpen}
        setIsWheelOpen={setIsWheelOpen}
        handleInputChange={handleInputChange}
        initialValue={''}
      />
    </View>
  );
};

export default CustomTextEditor;
