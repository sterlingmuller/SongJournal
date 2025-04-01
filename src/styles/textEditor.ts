import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  inputContainer: ViewStyle;
  editor: TextStyle;
}

const useTextEditorStyles = () => {
  const textEditorStyles: Styles = StyleSheet.create({
    container: {
      width: '90%',
      height: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
    },
    inputContainer: {
      height: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
      paddingVertical: 10,
    },

    editor: {
      flex: 1,
      textAlignVertical: 'top',
      paddingTop: 15,
      paddingBottom: 10,
      paddingHorizontal: 20,
      fontFamily: 'monospace',
    },
  });

  return textEditorStyles;
};

export default useTextEditorStyles;
