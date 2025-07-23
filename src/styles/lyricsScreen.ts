import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  editTextContainer: ViewStyle;
  lyricsContainer: ViewStyle;
  lyricsContent: ViewStyle;
  container: ViewStyle;
  details: ViewStyle;
}

const useLyricScreenStyles = () => {
  const { theme } = useColorTheme();

  const lyricScreenStyles: Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
    },

    editTextContainer: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 20,
    },

    lyricsContainer: {
      flex: 1,
      paddingHorizontal: 35,
    },
    lyricsContent: {
      paddingBottom: 50,
    },
    details: {
      flexDirection: 'row',
      gap: 15,
    },
  });

  return lyricScreenStyles;
};

export default useLyricScreenStyles;
