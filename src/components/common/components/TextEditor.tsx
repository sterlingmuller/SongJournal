import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from '@10play/tentap-editor';
import { useEffect } from 'react';
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
    if (content !== undefined) {
      editor
        .getText()
        .then((updateText: string) =>
          setText(updateText.trim() ? content : ''),
        );
    }
  }, [content]);

  return (
    <View style={{ flex: 1 }}>
      <RichText editor={editor} />
      <View style={{ position: 'absolute', bottom: 0 }}>
        <Toolbar editor={editor} />
      </View>
    </View>

    //     <SafeAreaView style={{ flex: 5 }}>
    //   <RichText editor={editor} />
    //   <KeyboardAvoidingView
    //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //     style={{
    //       position: 'absolute',
    //       width: '100%',
    //       bottom: 0,
    //     }}
    //   >
    //     <Toolbar editor={editor} />
    //   </KeyboardAvoidingView>
    // </SafeAreaView>
  );
};

export default TextEditor;
