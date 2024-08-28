import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  container: ViewStyle;
  sliderContainer: ViewStyle;
  slider: ViewStyle;
  track: ViewStyle;
  timeContainer: ViewStyle;
  timeText: TextStyle;
}

const usePlaybackBarStyles = () => {
  const { theme } = useColorTheme();

  const playbackBarStyles: Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginLeft: 10,
    },
    sliderContainer: {
      width: SCREEN_WIDTH * 0.5,
      marginRight: 10,
    },
    slider: {
      width: 200,
      height: 40,
    },
    timeContainer: {
      flexDirection: 'row',
      gap: 10,
    },
    timeText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    track: {
      height: 30,
      borderRadius: 5,
    },
  });

  return playbackBarStyles;
};

export default usePlaybackBarStyles;
