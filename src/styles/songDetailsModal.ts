import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  modal: ViewStyle;
  container: ViewStyle;
  mainInputContainer: ViewStyle;
  buttonContainer: ViewStyle;
  artistContainer: ViewStyle;
  artistSelectContainer: ViewStyle;
  title: TextStyle;
  textbox: ViewStyle;
  artistTextbox: ViewStyle;
  details: ViewStyle;
  input: TextStyle;
  artistEditText: TextStyle;
  labelText: TextStyle;
  inputText: TextStyle;
  warningText: TextStyle;
}

const useSongDetailsModalStyle = () => {
  const { theme } = useColorTheme();

  const songDetailsModalStyle: Styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.secondary,
      width: SCREEN_WIDTH * 0.8,
      maxHeight: SCREEN_HEIGHT * 0.62,
      borderRadius: 15,
      overflow: 'hidden',
      flexDirection: 'column',
    },
    mainInputContainer: {
      gap: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 20,
      paddingBottom: 0,
      color: theme.secondaryText,
    },
    textbox: {
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      padding: 8,
      width: '85%',
      height: SCREEN_HEIGHT * 0.2,
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 25,
    },
    artistSelectContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 5,
    },
    artistContainer: {
      width: '100%',
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 25,
      justifyContent: 'space-evenly',
      paddingTop: 10,
      paddingBottom: 20,
      gap: 15,
    },
    artistTextbox: {
      backgroundColor: theme.inputBackground,
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#ccc',
      minWidth: 150,
      alignItems: 'center',
    },
    artistEditText: {
      fontStyle: 'italic',
      color: theme.secondaryTipText,
      fontWeight: 'bold',
    },
    input: {
      flex: 1,
      fontSize: 14,
      fontWeight: 500,
    },
    details: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    buttonContainer: {
      paddingTop: 25,
      paddingBottom: 15,
    },
    labelText: { fontSize: 14, color: theme.secondaryText, fontWeight: 600 },
    inputText: { fontSize: 14, color: theme.secondaryText, fontWeight: 600 },
    warningText: {
      fontSize: 14,
      color: theme.error,
      fontWeight: 600,
      textAlign: 'center',
      marginVertical: 10,
    },
  });

  return songDetailsModalStyle;
};

export default useSongDetailsModalStyle;
