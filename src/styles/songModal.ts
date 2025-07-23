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
    labelText: {
      fontSize: 16,
      color: theme.secondaryText,
      fontWeight: '600',
    },
    inputText: {
      fontSize: 14,
      color: theme.secondaryText,
      fontWeight: '600',
    },
  });

  return songModalStyle;
};

export default useSongModalStyle;
