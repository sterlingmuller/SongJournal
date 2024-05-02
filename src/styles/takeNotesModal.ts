import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  modalContainer: ViewStyle;
  container: ViewStyle;
  textbox: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  input: TextStyle;
}

const useTakeNotesModalStyles = () => {
  const { theme } = useColorTheme();

  const takeNotesModalStyles: Styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, .5)',
      justifyContent: 'center',
    },

    container: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      width: '80%',
      height: '60%',
      borderRadius: 15,
      gap: 20,
    },

    title: {
      paddingTop: 35,
      paddingLeft: 40,
      fontSize: 24,
    },

    textbox: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 8,
      width: '85%',
      height: '64%',
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 25,
      marginBottom: 10,
    },

    input: {
      flex: 1,
      fontSize: 14,
    },

    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    button: {
      width: 100,
      borderRadius: 10,
    },
  });

  return takeNotesModalStyles;
};

export default useTakeNotesModalStyles;
