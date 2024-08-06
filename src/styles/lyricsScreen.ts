import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/context/ThemeContext';

interface Styles {
  editTextContainer: ViewStyle;
  lyricsContainer: ViewStyle;
  container: ViewStyle;
  details: ViewStyle;
  editSheet: ViewStyle;
}

const useLyricScreenStyles = () => {
  const { theme } = useColorTheme();

  const lyricScreenStyles: Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
      paddingBottom: 15,
    },

    editTextContainer: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      width: '80%',
      height: '75%',
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
    },

    lyricsContainer: {
      paddingLeft: 35,
    },

    editSheet: { height: '100%' },

    details: {
      flexDirection: 'row',
      gap: 15,
    },
  });

  return lyricScreenStyles;
};

export default useLyricScreenStyles;
