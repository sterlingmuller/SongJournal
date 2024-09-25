import { StyleSheet, ViewStyle } from 'react-native';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  waveContainer: ViewStyle;
  bar: ViewStyle;
  dotContainer: ViewStyle;
  dot: ViewStyle;
  midpointLine: ViewStyle;
}

const useAudioWaveStyles = () => {
  const audioWaveStyles: Styles = StyleSheet.create({
    waveContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      height: 200,
      width: SCREEN_WIDTH * 0.7,
      position: 'relative',
      marginTop: 150,
    },
    bar: {
      width: 8,
      marginHorizontal: 2,
      borderRadius: 3,
    },
    dotContainer: {
      width: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: '#3f51b5',
    },
    midpointLine: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: 2,
      left: '50%',
      backgroundColor: 'green',
    },
  });

  return audioWaveStyles;
};

export default useAudioWaveStyles;
