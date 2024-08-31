import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_HEIGHT } from '@src/components/common/constants';

interface Styles {
  editTextContainer: ViewStyle;
  lyricsContainer: ViewStyle;
  container: ViewStyle;
  details: ViewStyle;
  keyboardAvoidingViewContainer: ViewStyle;
}

const useLyricScreenStyles = () => {
  const { theme } = useColorTheme();

  const lyricScreenStyles: Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
    },

    keyboardAvoidingViewContainer: {
      // flex: 1,
      width: '80%',
      height: SCREEN_HEIGHT * 0.5,
      alignSelf: 'center',
    },

    editTextContainer: {
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      width: '100%',
      height: SCREEN_HEIGHT * 0.5,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 20,
    },

    lyricsContainer: {
      paddingLeft: 35,
    },

    details: {
      flexDirection: 'row',
      gap: 15,
    },
  });

  return lyricScreenStyles;
};

export default useLyricScreenStyles;
