import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  titlePlusArrow: ViewStyle;
  info: ViewStyle;
}

const useLyricsHeaderStyles = () => {
  const { theme } = useColorTheme();

  const lyricsHeaderStyles: Styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      height: 115,
      paddingTop: 30,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.primary,
      zIndex: 10,
      paddingHorizontal: 20,
    },

    titlePlusArrow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
    },

    title: {
      fontSize: 32,
    },

    info: {
      left: 0,
    },
  });

  return lyricsHeaderStyles;
};

export default useLyricsHeaderStyles;
