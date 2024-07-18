import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  container: ViewStyle;
  textbox: ViewStyle;
  eggContainer: ViewStyle;
  arrow: ViewStyle;
  text: TextStyle;
}

const useGetStartedHomeStyles = () => {
  const { theme } = useColorTheme();

  const createNewSongButtonStyles: Styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 520,
      gap: 50,
    },
    textbox: {
      width: '85%',
      padding: 18,
      backgroundColor: theme.secondary,
      borderRadius: 10,
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: '400',
      lineHeight: 26,
    },
    arrow: {
      position: 'absolute',
      top: 0,
      right: '20%',
      width: 60,
      height: 50,
      backgroundColor: theme.secondary,
      transform: [{ rotate: '45deg' }],
      zIndex: -1,
    },
    eggContainer: {
      width: 170,
      height: 170,
      borderRadius: 85,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 5,
    },
  });

  return createNewSongButtonStyles;
};

export default useGetStartedHomeStyles;
