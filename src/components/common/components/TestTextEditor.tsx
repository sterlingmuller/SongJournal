import {
  BridgeState,
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import ChordWheelModal from '@src/components/lyrics/components/ChordWheelModal';
import { getSelectionPosition } from '@src/utils/chordGeneratorHelpers';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { SongInfo } from '../types';

interface Props {
  initialText: string;
  setText: (text: string) => void;
  isChordMode?: boolean;
}

const TextEditor = ({ initialText, setText, isChordMode = false }: Props) => {
  const editor = useEditorBridge({
    autofocus: false,
    avoidIosKeyboard: true,
    initialContent: initialText,
    editable: true,
  });

  const [selectionStart, setSelectionStart] = useState(-1);
  const [isChordWheelOpen, setIsChordWheelOpen] = useState(false);
  const [newChord, setNewChord] = useState('');

  // Track if this is the first selection after opening
  const firstSelectionRef = useRef(true);
  // Track if we should ignore the next selection change
  const ignoreNextSelectionRef = useRef(false);

  const handleInputChange = (_: keyof SongInfo, value: string) => {
    const { currentLine, charIndex } = getSelectionPosition(
      content,
      selectionStart,
    );
    const spaces = '&nbsp;'.repeat(charIndex);
    const newChord = `${spaces}${value}`;

    let insertPosition = 0;
    let chordLinePosition = -1;
    let lineCount = 0;
    let i = 0;

    // First pass: Find the immediate previous paragraph (potential chord line)
    while (i < content.length && lineCount <= currentLine) {
      if (content.startsWith('<p>', i) && lineCount === currentLine) {
        // Look backward for the previous paragraph
        const prevParagraphEnd = content.lastIndexOf('</p>', i);
        if (prevParagraphEnd !== -1) {
          const prevParagraphStart = content.lastIndexOf(
            '<p>',
            prevParagraphEnd,
          );
          if (prevParagraphStart !== -1) {
            chordLinePosition = prevParagraphStart;
          }
        }
        break;
      } else if (content.startsWith('</p>', i)) {
        lineCount++;
        i += 4;
        if (lineCount === currentLine) {
          insertPosition = i;
        }
      } else {
        i++;
      }
    }

    let newContent = '';
    if (chordLinePosition !== -1) {
      // Check if this is likely a chord line (contains only chords/spaces)
      const chordLineEnd = content.indexOf('</p>', chordLinePosition);
      const chordLineContent = content.slice(
        chordLinePosition + 3,
        chordLineEnd,
      );

      if (
        /^(&nbsp;|[A-G][#b]?m?[0-9]?)+$/.test(
          chordLineContent.replace(/&nbsp;/g, ' '),
        )
      ) {
        // Modify existing chord line
        newContent =
          content.slice(0, chordLinePosition) +
          `<p class="chord-line">${chordLineContent}${newChord}</p>` +
          content.slice(chordLineEnd + 4);
      } else {
        // Create new chord line
        newContent =
          content.slice(0, insertPosition) +
          `<p class="chord-line">${newChord}</p>` +
          content.slice(insertPosition);
      }
    } else {
      // Create new chord line
      newContent =
        content.slice(0, insertPosition) +
        `<p class="chord-line">${newChord}</p>` +
        content.slice(insertPosition);
    }

    // Force include the class in the output
    newContent = newContent.replace(
      /<p class="chord-line">/g,
      '<p class="chord-line">',
    );

    // Update editor and state
    editor.setContent(newContent);
    setText(newContent);
    editor.setSelection(null, null);
    setIsChordWheelOpen(false);
    ignoreNextSelectionRef.current = true;
  };

  useEffect(() => {
    if (!editor || !isChordMode) return;

    const unsubscribe = editor._subscribeToEditorStateUpdate(
      (bridgeState: BridgeState) => {
        const currentSelection = bridgeState.selection?.from;
        setSelectionStart(currentSelection);

        if (currentSelection === undefined || currentSelection < 0) return;

        if (ignoreNextSelectionRef.current) {
          ignoreNextSelectionRef.current = false;
          return;
        }

        // Don't open on initial selection when component mounts
        if (firstSelectionRef.current) {
          firstSelectionRef.current = false;
          return;
        }

        // Only open if we have a valid selection and wheel isn't already open
        if (!isChordWheelOpen) {
          setIsChordWheelOpen(true);
        }
      },
    );

    return () => unsubscribe();
  }, [editor, isChordMode, isChordWheelOpen]);

  const content = useEditorContent(editor, {
    debounceInterval: 400,
    type: 'html',
  });

  useEffect(() => {
    if (content) {
      console.log('content:', content);
      setText(content);
    }
  }, [content]);

  return (
    <>
      <RichText editor={editor} />
      <View style={{ bottom: 0, position: 'absolute' }}>
        <Toolbar editor={editor} />
      </View>
      <ChordWheelModal
        isWheelOpen={isChordWheelOpen}
        setIsWheelOpen={(open) => {
          setIsChordWheelOpen(open);
          if (!open) {
            // When manually closing, ignore the next selection change
            ignoreNextSelectionRef.current = true;
          }
        }}
        handleInputChange={handleInputChange}
        initialValue={''}
      />
    </>
  );
};

export default TextEditor;
