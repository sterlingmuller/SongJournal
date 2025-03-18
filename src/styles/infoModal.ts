import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  modal: ViewStyle;
  container: ViewStyle;
  scrollContainer: ViewStyle;
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
}

const useInfoModalStyle = () => {
  const { theme } = useColorTheme();

  const infoModalStyle: Styles = StyleSheet.create({
    modal: {
      margin: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.secondary,
      width: SCREEN_WIDTH * 0.8,
      height: SCREEN_HEIGHT * 0.62,
      borderRadius: 15,
      overflow: 'hidden',
      flexDirection: 'column',
    },
    scrollContainer: {
      flexGrow: 1,
      justifyContent: 'flex-start',
      gap: 15,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      padding: 20,
      paddingBottom: 0,
      color: theme.primaryText,
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
      gap: 10,
    },
    artistContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingBottom: 5,
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
      color: theme.primary,
      fontWeight: 'bold',
    },
    input: {
      flex: 1,
      fontSize: 14,
    },
    details: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    buttonContainer: {
      paddingBottom: 30,
    },
    labelText: { fontSize: 14, color: theme.primaryText, fontWeight: 600 },
    inputText: { fontSize: 16, color: theme.secondaryText, fontWeight: 700 },
  });

  return infoModalStyle;
};

export default useInfoModalStyle;
