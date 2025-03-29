import { TextInput, View } from 'react-native';
import EditorToolbar from './EditorToolbar';
import ChordWheelModal from '@src/components/lyrics/components/ChordWheelModal';
import { useEffect, useState } from 'react';
import useTextEditorStyles from '@src/styles/textEditor';
import useDebounce from '@src/hooks/useDebounce';
import { insertAtCursor, insertChord } from '@src/utils/textEditorUtils';
import { SongInfo } from '../types';

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
  const [sectionPicker, setShowSectionPicker] = useState(false);
  const [selection, setSelection] = useState({ start: -1, end: -1 });

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const debouncedInput = useDebounce((text: string) => {
    setText(text);
  }, 400);

  const handleTextChange = (newText: string) => {
    setLocalText(newText); // Update local state immediately
    debouncedInput(newText); // Propagate to parent
  };

  // const handleTextChange = (text: string) => {
  //   setText(text);
  //   onChange(convertTextToHtml(text));
  // };

  const handleInputChange = (_: keyof SongInfo, chord: string) => {
    setLocalText(insertChord(localText, chord, selection));
    // const newContent = insertChord(text, chord, cursorPosition);
    // handleTextChange(newContent);
  };

  console.log('local text:', localText);

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
          setLocalText(insertAtCursor(localText, '**', '**', selection));
          // console.log('bold');
        }}
        onItalic={() => console.log('italic')}
        onTextSection={() => setShowSectionPicker(true)}
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
