import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  clearButton: ViewStyle;
  button: ViewStyle;
  infoContainer: ViewStyle;
  title: TextStyle;
  input: TextStyle;
  text: TextStyle;
  boldText: TextStyle;
  warningText: TextStyle;
  infoText: TextStyle;
  inputX: TextStyle;
}

const useCommonModalStyle = () => {
  const { theme } = useColorTheme();

  const commonModalStyle: Styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      width: '80%',
      borderRadius: 15,
      gap: 30,
      paddingTop: 25,
      paddingBottom: 30,
      backgroundColor: theme.secondary,
      paddingHorizontal: 10,
    },

    title: {
      paddingLeft: 30,
      fontSize: 24,
      fontWeight: '700',
      color: theme.secondaryText,
    },

    textbox: {
      flexDirection: 'row',
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      padding: 6,
      width: '75%',
      borderWidth: 1,
      borderColor: '#ccc',
      alignSelf: 'center',
      marginBottom: 5,
    },

    input: {
      flex: 1,
      fontSize: 14,
      marginLeft: 8,
      fontWeight: 500,
      color: theme.secondaryText,
    },

    clearButton: {
      paddingRight: 10,
      alignSelf: 'center',
    },

    button: {
      width: '50%',
      alignSelf: 'center',
      paddingTop: 10,
    },

    text: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 500,
      paddingHorizontal: 10,
      color: theme.secondaryText,
    },
    boldText: { fontWeight: 'bold' },

    inputX: { fontWeight: 600, color: theme.secondaryText, fontSize: 14 },

    warningText: {
      fontStyle: 'italic',
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 20,
      color: theme.error,
      fontWeight: '700',
    },

    infoContainer: {
      width: '75%',
      alignSelf: 'center',
      paddingBottom: 10,
    },

    infoText: {
      textAlign: 'right',
      fontSize: 14,
      color: theme.secondaryText,
    },
  });

  return commonModalStyle;
};

export default useCommonModalStyle;
