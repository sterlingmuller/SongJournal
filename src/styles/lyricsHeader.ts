import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
  titleContainer: ViewStyle;
  title: TextStyle;
  titlePlusArrow: ViewStyle;
  headerIconRow: ViewStyle;
}

const useLyricsHeaderStyles = () => {
  const { theme } = useColorTheme();

  const lyricsHeaderStyles: Styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 50,
      paddingBottom: 20,
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

    titleContainer: { width: '75%' },

    title: {
      fontSize: 30,
      fontWeight: 500,
    },

    headerIconRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20,
      right: '8%',
    },
  });

  return lyricsHeaderStyles;
};

export default useLyricsHeaderStyles;
