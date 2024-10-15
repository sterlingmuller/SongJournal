import { StyleSheet, ViewStyle } from 'react-native';
import { SCREEN_WIDTH, WAVE_BAR_WIDTH } from '@src/components/common/constants';

interface Styles {
  container: ViewStyle;
  waveContainer: ViewStyle;
  waveColumn: ViewStyle;
  topWaveContainer: ViewStyle;
  bottomWaveContainer: ViewStyle;
  maskedView: ViewStyle;
  maskElementContainer: ViewStyle;
  maskElementContainerNotRecording: ViewStyle;
  playedSection: ViewStyle;
  unplayedSection: ViewStyle;
  waveformContainer: ViewStyle;
  bar: ViewStyle;
  dotContainer: ViewStyle;
  dot: ViewStyle;
  midpointLine: ViewStyle;
}

const useAudioWaveStyles = () => {
  const audioWaveStyles: Styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      top: 100,
    },
    waveContainer: {
      height: 180,
      width: SCREEN_WIDTH * 0.9,
      alignSelf: 'center',
    },
    maskedView: {
      flex: 1,
    },
    maskElementContainer: {
      flexDirection: 'row',
      height: '100%',
    },
    maskElementContainerNotRecording: {
      left: '50%',
    },
    playedSection: {
      position: 'absolute',
      backgroundColor: '#ff4081',
      zIndex: 1,
      top: 0,
      bottom: 0,
      right: '50%',
    },
    unplayedSection: { flex: 1, backgroundColor: '#3f51b5' },
    waveformContainer: {
      flexDirection: 'row',
    },
    waveColumn: { flexDirection: 'column', gap: 1 },
    topWaveContainer: { height: '60%', justifyContent: 'flex-end' },
    bottomWaveContainer: {
      height: '40%',
      justifyContent: 'flex-start',
      opacity: 0.3,
    },
    waveContentReversed: {
      alignItems: 'flex-start',
      opacity: 0.3,
    },
    midpointLine: {
      position: 'absolute',
      height: 200,
      width: 4,
      backgroundColor: 'green',
      marginLeft: '50%',
    },
    bar: {
      width: WAVE_BAR_WIDTH,
      marginHorizontal: 1,
      borderRadius: 3,
      backgroundColor: 'blue',
    },
    dotContainer: {
      width: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dot: {
      width: WAVE_BAR_WIDTH,
      marginHorizontal: 1,
      height: 100,
      borderRadius: 2,
      backgroundColor: '#3f51b5',
    },
  });

  return audioWaveStyles;
};

export default useAudioWaveStyles;
