import { TextInput, View } from 'react-native';
import EditorToolbar from './EditorToolbar';
import ChordWheelModal from '@src/components/lyrics/components/ChordWheelModal';
import { useEffect, useState } from 'react';
import useTextEditorStyles from '@src/styles/textEditor';
import useDebounce from '@src/hooks/useDebounce';
import {
  insertAtCursor,
  insertChord,
  insertSectionAtCursor,
} from '@src/utils/textEditorUtils';
import { SongInfo } from '../types';
import { LyricsSection } from '../enums';

interface EditorToolbarProps {
  onBold: () => void;
  onItalic: () => void;
  onTextSize: (size: 'small' | 'medium' | 'large') => void;
  onAddChord: () => void;
}

interface CustomTextEditorProps {
  text: string;
  setText: (text: string) => void;
}

const CustomTextEditor = ({ text, setText }: CustomTextEditorProps) => {
  const styles = useTextEditorStyles();

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

  // const handleInputChange = (_: keyof SongInfo, chord: string) => {
  //   const newContent = insertChord(text, chord, selection);
  //   handleTextChange(newContent);
  // };

  const handleInputChange = (_: keyof SongInfo, chord: string) => {
    setLocalText(insertChord(localText, chord, selection));
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        value={localText}
        onChangeText={handleTextChange}
        onSelectionChange={(e) => {
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
        onTextSection={(section: LyricsSection) =>
          setLocalText(
            insertSectionAtCursor(localText, selection.start, section),
          )
        }
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
