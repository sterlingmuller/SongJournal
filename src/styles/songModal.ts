import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  textbox: ViewStyle;
  input: TextStyle;
  infoContainer: ViewStyle;
  infoText: TextStyle;
  warningText: TextStyle;
  artistSelectContainer: ViewStyle;
  artistContainer: ViewStyle;
  artistTextbox: ViewStyle;
  artistEditText: TextStyle;
  labelText: TextStyle;
  inputText: TextStyle;
}

const useSongModalStyle = () => {
  const { theme } = useColorTheme();

  const songModalStyle: Styles = StyleSheet.create({
    container: {
      backgroundColor: theme.secondary,
      width: SCREEN_WIDTH * 0.8,
      borderRadius: 15,
      padding: 20,
      alignSelf: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.secondaryText,
    },
    textbox: {
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      paddingHorizontal: 8,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    input: {
      paddingVertical: 10,
      fontSize: 14,
      fontWeight: '500',
      color: theme.secondaryText,
    },
    infoContainer: {
      alignItems: 'flex-end',
      marginTop: 5,
    },
    infoText: {
      fontSize: 12,
      color: theme.secondaryText,
    },
    warningText: {
      fontSize: 14,
      color: theme.error,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 15,
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
      justifyContent: 'space-around',
      marginTop: 5,
      marginBottom: 15,
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
      fontWeight: '700',
      fontSize: 16,
    },
    labelText: {
      fontSize: 16,
      color: theme.secondaryText,
      fontWeight: '600'
    },
    inputText: {
      fontSize: 14,
      color: theme.secondaryText,
      fontWeight: '600'
    },
  });

  return songModalStyle;
};

export default useSongModalStyle;