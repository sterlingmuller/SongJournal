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
  convertGerundToIn,
  insertChord,
  insertSectionAtCursor,
} from '@src/utils/textEditorUtils';
import { SongInfo } from '../types';
import { LyricsSection } from '../enums';
import { editLyricsTip } from '../constants';
import { selectDisplayTips } from '@src/state/selectors/settingsSelector';
import { useAppSelector } from '@src/hooks/typedReduxHooks';

interface CustomTextEditorProps {
  text: string;
  setText: (text: string) => void;
  setToolbarHeight: (height: number) => void;
}

const CustomTextEditor = ({
  text,
  setText,
  setToolbarHeight,
}: CustomTextEditorProps) => {
  const styles = useTextEditorStyles();
  const textInputRef = useRef<TextInput>(null);
  const debouncedInput = useDebounce(setText, 400);

  const [isWheelOpen, setIsWheelOpen] = useState(false);
  const [localText, setLocalText] = useState(text);
  const [selection, setSelection] = useState({ start: -1, end: -1 });

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const displayTips = useAppSelector(selectDisplayTips);

  useEffect(() => {
    if (historyIndex === -1 || localText !== history[historyIndex]) {
      const newHistory = [...history.slice(0, historyIndex + 1), localText];
      if (newHistory.length > 10) {
        newHistory.shift();
      } else {
        setHistoryIndex(newHistory.length - 1);
      }
      setHistory(newHistory);
    }
    debouncedInput(localText);
  }, [localText]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setLocalText(history[newIndex]);
    }
  };

  const handleAddChord = (_: keyof SongInfo, chord: string) => {
    const newText = insertChord(localText, chord, selection);
    setLocalText(newText);
  };

  const handleSectionInsertion = (section: LyricsSection) => {
    const { text: newText, cursorPosition } = insertSectionAtCursor(
      localText,
      selection.start,
      section,
    );

    setLocalText(newText);

    setTimeout(() => {
      textInputRef.current?.focus();
      setSelection({
        start: cursorPosition,
        end: cursorPosition,
      });
    }, 50);
  };

  const onGerundConvert = () => {
    if (selection.start < 0) return;

    const result = convertGerundToIn(localText, selection.start);

    if (result.text !== localText) {
      setLocalText(result.text);

      setTimeout(() => {
        textInputRef.current?.focus();
        setSelection({
          start: result.newCursorPosition,
          end: result.newCursorPosition,
        });
      }, 50);
    }
  };

  const defaultPlaceholder = 'Lyrics...';
  const placeholder = displayTips
    ? `${defaultPlaceholder}\n\n${editLyricsTip}`
    : defaultPlaceholder;

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <TextInput
          placeholder={placeholder}
          autoFocus={true}
          ref={textInputRef}
          multiline
          value={localText}
          onChangeText={setLocalText}
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
      </View>
      <EditorToolbar
        setLocalText={setLocalText}
        localText={localText}
        setIsWheelOpen={setIsWheelOpen}
        selection={selection}
        onTextSection={handleSectionInsertion}
        onGerundConvert={onGerundConvert}
        onUndo={handleUndo}
        isUndoDisabled={historyIndex === 0}
        setToolbarHeight={setToolbarHeight}
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
