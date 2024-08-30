import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  modal: ViewStyle;
  container: ViewStyle;
  scrollContainer: ViewStyle;
  buttonContainer: ViewStyle;
  title: TextStyle;
  textbox: ViewStyle;
  details: ViewStyle;
  input: TextStyle;
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
      height: SCREEN_HEIGHT * 0.6,
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
    },
    textbox: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 8,
      width: '85%',
      height: SCREEN_HEIGHT * 0.25,
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 25,
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
  });

  return infoModalStyle;
};

export default useInfoModalStyle;
