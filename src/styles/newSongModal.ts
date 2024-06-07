import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  input: TextStyle;
}

const useNewSongModalStyle = () => {
  const { theme } = useColorTheme();

  const newSongModalStyle: Styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      width: '80%',
      height: 280,
      borderRadius: 15,
      gap: 40,
      paddingTop: 30,
    },

    title: {
      paddingLeft: 40,
      fontSize: 24,
    },

    textbox: {
      flexDirection: 'row',
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 6,
      width: '75%',
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 35,
      marginBottom: 10,
    },

    input: {
      flex: 1,
      fontSize: 14,
      marginLeft: 8,
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

  return newSongModalStyle;
};

export default useNewSongModalStyle;
