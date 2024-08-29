import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  contents: ViewStyle;
  container: ViewStyle;
  iconRow: ViewStyle;
  playIcon: ViewStyle;
  trackSubtext: TextStyle;
  staticPlaybackBar: ViewStyle;
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
      gap: 5,
    },

    title: {
      fontSize: 24,
    },

    titleRow: { flexDirection: 'row', gap: 10 },

    iconRow: {
      paddingTop: 5,
      flexDirection: 'row',
      gap: 16,
    },

    playIcon: {
      position: 'absolute',
      alignSelf: 'center',
      paddingBottom: 40,
      right: 20,
    },

    trackSubtext: {
      fontStyle: 'italic',
    },

    staticPlaybackBar: {
      height: 15,
      width: SCREEN_WIDTH * 0.35,
      backgroundColor: theme.primary,
      marginLeft: 0,
      alignSelf: 'center',
      borderRadius: 8,
    },
  });

  return songTakeStyles;
};

export default useSongTakeStyles;
