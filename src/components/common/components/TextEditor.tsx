import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import React, { useEffect } from 'react';
import { View } from 'react-native';

interface Props {
  initialText: string;
  setText: (text: string) => void;
}

const TextEditor = ({ initialText, setText }: Props) => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent: initialText,
  });

  const content = useEditorContent(editor, { type: 'html' });

  useEffect(() => {
    if (content) {
      setText(content);
    }
  }, [content]);

  return (
    <>
      <RichText editor={editor} />
      <View style={{ bottom: 0, position: 'absolute' }}>
        <Toolbar editor={editor} />
      </View>
    </>
  );
};

export default TextEditor;
