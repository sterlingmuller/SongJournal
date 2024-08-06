import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/context/ThemeContext';

interface Styles {
  contents: ViewStyle;
  container: ViewStyle;
  iconRow: ViewStyle;
  playIcon: ViewStyle;
  playbackBar: ViewStyle;
  titleRow: ViewStyle;
  title: TextStyle;
}

const useSongTakeStyles = () => {
  const { theme } = useColorTheme();

  const songTakeStyles: Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.secondaryBackground,
      paddingVertical: 12,
      paddingLeft: 25,
      paddingRight: 30,
      width: '90%',
      borderWidth: 2,
      borderRadius: 10,
      justifyContent: 'space-between',
      alignContent: 'center',
      alignSelf: 'center',
    },

    contents: {
      flexDirection: 'column',
      gap: 10,
    },

    title: {
      fontSize: 24,
    },

    titleRow: { flexDirection: 'row', gap: 10 },

    iconRow: {
      flexDirection: 'row',
      gap: 18,
    },

    playIcon: {
      position: 'absolute',
      alignSelf: 'center',
      paddingBottom: 40,
      right: 20,
    },

    playbackBar: {
      height: 15,
      width: '52%',
      backgroundColor: theme.primary,
      alignSelf: 'center',
      marginLeft: 10,
    },
  });

  return songTakeStyles;
};

export default useSongTakeStyles;
