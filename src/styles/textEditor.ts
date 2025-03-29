import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
  editor: TextStyle;
}

const useTextEditorStyles = () => {
  const { theme } = useColorTheme();

  const textEditorStyles: Styles = StyleSheet.create({
    container: {
      width: '90%',
      height: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 20,
    },

    editor: {
      flex: 1,
      textAlignVertical: 'top',
      paddingTop: 15,
      paddingHorizontal: 10,
      fontFamily: 'monospace',
    },
  });

  return textEditorStyles;
};

export default useTextEditorStyles;
