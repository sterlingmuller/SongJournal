import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  textbox: ViewStyle;
  details: ViewStyle;
  input: TextStyle;
}

const useInfoModalStyle = () => {
  const { theme } = useColorTheme();

  const infoModalStyle: Styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      backgroundColor: theme.secondary,
      width: '80%',
      height: 525,
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
      height: '40%',
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 25,
      marginBottom: 10,
    },

    input: {
      flex: 1,
      fontSize: 14,
    },

    details: { flexDirection: 'row', justifyContent: 'space-evenly' },
  });

  return infoModalStyle;
};

export default useInfoModalStyle;
