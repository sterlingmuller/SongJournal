import { StyleSheet, ViewStyle } from 'react-native';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  container: ViewStyle;
  waveContainer: ViewStyle;
  maskedView: ViewStyle;
  maskElementContainer: ViewStyle;
  playedSection: ViewStyle;
  unplayedSection: ViewStyle;
  waveContent: ViewStyle;
  bar: ViewStyle;
  dotContainer: ViewStyle;
  dot: ViewStyle;
  midpointLine: ViewStyle;
}

const useAudioWaveStyles = () => {
  const audioWaveStyles: Styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
      marginBottom: 200,
    },
    waveContainer: {
      height: 180,
      // overflow: 'hidden',
      width: SCREEN_WIDTH * 0.9,
      alignSelf: 'center',
    },
    maskedView: {
      flex: 1,
      flexDirection: 'row',
      height: '100%',
    },
    maskElementContainer: {
      // flex: 1,
      flexDirection: 'column',
      height: '100%',
      left: '50%',
    },
    playedSection: {
      // flex: 1,
      zIndex: 1,
      backgroundColor: '#ff4081',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
    },
    unplayedSection: { flex: 1, backgroundColor: '#3f51b5' },
    waveContent: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
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
      width: 6,
      marginHorizontal: 1,
      borderRadius: 3,
      backgroundColor: 'white',
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
  });

  return audioWaveStyles;
};

export default useAudioWaveStyles;
