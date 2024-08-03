import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  infoContainer: ViewStyle;
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
      gap: 20,
      flex: 1,
      backgroundColor: theme.primaryBackground,
      paddingBottom: 15,
    },

    infoContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 10,
      gap: 10,
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
      paddingVertical: 15,
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
