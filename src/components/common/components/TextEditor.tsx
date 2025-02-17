import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          alignSelf: 'center',
        }}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </>
  );
};

export default TextEditor;
