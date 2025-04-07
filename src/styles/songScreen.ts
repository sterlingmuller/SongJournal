import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  takes: ViewStyle;
  takeSeperator: ViewStyle;
  footer: ViewStyle;
  recordingButton: ViewStyle;
  tipText: TextStyle;
}

const useSongScreenStyles = () => {
  const { theme } = useColorTheme();

  const songScreenStyles: Styles = StyleSheet.create({
    takes: {
      paddingTop: 25,
    },
    takeSeperator: { height: 20 },
    footer: { height: 180 },
    recordingButton: {
      position: 'absolute',
      flex: 5,
      alignSelf: 'center',
      bottom: 50,
    },
    tipText: {
      paddingTop: 40,
      paddingBottom: 10,
      paddingHorizontal: 30,
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
