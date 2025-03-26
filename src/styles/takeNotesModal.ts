import { SCREEN_HEIGHT } from '@src/components/common/constants';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  modal: ViewStyle;
  container: ViewStyle;
  textbox: ViewStyle;
  buttonContainer: ViewStyle;
  title: TextStyle;
  input: TextStyle;
}

const useTakeNotesModalStyles = () => {
  const { theme } = useColorTheme();

  const takeNotesModalStyles: Styles = StyleSheet.create({
    modal: {
      margin: 0,
    },
    container: {
      alignSelf: 'center',
      backgroundColor: theme.secondary,
      width: '80%',
      maxHeight: SCREEN_HEIGHT * 0.62,
      borderRadius: 15,
      gap: 20,
    },

    title: {
      paddingTop: 20,
      paddingLeft: 40,
      fontSize: 24,
      fontWeight: 'bold',
    },

    textbox: {
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      padding: 8,
      width: '85%',
      height: SCREEN_HEIGHT * 0.3,
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 25,
    },

    input: {
      flex: 1,
      fontSize: 14,
      fontWeight: 500,
    },

    buttonContainer: {
      paddingTop: 10,
      paddingBottom: 40,
    },
  });

  return takeNotesModalStyles;
};

export default useTakeNotesModalStyles;
