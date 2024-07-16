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
      height: '75%',
      gap: 40,
    },
    textbox: {
      maxWidth: '90%',
      padding: 16,
      backgroundColor: theme.secondary,
      borderRadius: 10,
    },
    text: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '400',
    },
    arrow: {
      position: 'absolute',
      top: 0,
      right: '25%',
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
