import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/theme/ThemeContext';

interface Styles {
  options: ViewStyle;
  infoContainer: ViewStyle;
  textContainer: ViewStyle;
  container: ViewStyle;
  details: ViewStyle;
  iconButton: ViewStyle;
  selected: ViewStyle;
}

const useLyricSheetStyles = () => {
  const { theme } = useColorTheme();

  const lyricSheetStyles: Styles = StyleSheet.create({
    container: {
      gap: 22,
    },

    options: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    infoContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingTop: 20,
      gap: 20,
    },

    textContainer: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      width: '80%',
      height: '78%',
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },

    details: {
      flexDirection: 'row',
      gap: 10,
    },

    iconButton: {
      borderRadius: 30,
      padding: 8,
      backgroundColor: 'transparent',
    },

    selected: {
      backgroundColor: '#fcd470',
    },
  });

  return lyricSheetStyles;
};

export default useLyricSheetStyles;
