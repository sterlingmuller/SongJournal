import { Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  container: ViewStyle;
  takesContainer: ViewStyle;
  takesSliderContainer: ViewStyle;
  sliderContainer: ViewStyle;
  slider: ViewStyle;
  track: ViewStyle;
  timeContainer: ViewStyle;
  timeText: TextStyle;
}

const usePlaybackBarStyles = () => {
  const playbackBarStyles: Styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginLeft: 14,
    },
    takesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: Platform.OS === 'ios' ? 0 : 10,
    },
    sliderContainer: {
      zIndex:1,
      width: SCREEN_WIDTH * 0.5,
      marginRight: 10,
    },
    takesSliderContainer: {
      zIndex:1,
      width: SCREEN_WIDTH * 0.35,
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
