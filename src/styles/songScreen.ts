import { SCREEN_HEIGHT } from '@src/components/common/constants';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  takes: ViewStyle;
  takeSeperator: ViewStyle;
  recordingButton: ViewStyle;
  tipText: TextStyle;
}

const useSongScreenStyles = () => {
  const { theme } = useColorTheme();

  const songScreenStyles: Styles = StyleSheet.create({
    takes: {
      paddingTop: 25,
      paddingBottom: SCREEN_HEIGHT * 0.2,
    },
    takeSeperator: { height: 20 },
    recordingButton: {
      position: 'absolute',
      flex: 5,
      alignSelf: 'center',
      bottom: SCREEN_HEIGHT * 0.05,
    },
    tipText: {
      paddingTop: 40,
      paddingBottom: 10,
      paddingHorizontal: 50,
      fontSize: 14,
      textAlign: 'center',
      fontStyle: 'italic',
      color: theme.tipText,
      fontWeight: '600',
    },
  });

  return songScreenStyles;
};

export default useSongScreenStyles;
