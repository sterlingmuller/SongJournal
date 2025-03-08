import { DimensionValue, StyleSheet, ViewStyle } from 'react-native';
import {
  DOT_HEIGHT,
  SCREEN_WIDTH,
  WAVE_BAR_GAP,
  WAVE_BAR_WIDTH,
} from '@src/components/common/constants';

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
  overlayBar: ViewStyle;
  bottomOverlayBar: ViewStyle;
  bottomBar: ViewStyle;
  dotContainer: ViewStyle;
  dot: ViewStyle;
  overlayDot: ViewStyle;
  bottomDot: ViewStyle;
  overlayBottomDot: ViewStyle;
  midpointLine: ViewStyle;
  progressOverlay: ViewStyle;
}

const baseDotStyle = {
  width: WAVE_BAR_WIDTH,
  marginRight: WAVE_BAR_GAP,
  height: DOT_HEIGHT,
  borderRadius: 2,
};
const baseBarStyle = {
  width: WAVE_BAR_WIDTH,
  marginRight: WAVE_BAR_GAP,
  borderRadius: 3,
};

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
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    waveColumn: { flexDirection: 'column', gap: 1 },
    topWaveContainer: { height: '60%', justifyContent: 'flex-end' },
    bottomWaveContainer: {
      height: '40%',
      justifyContent: 'flex-start',
    },
    midpointLine: {
      position: 'absolute',
      height: 200,
      width: 4,
      backgroundColor: 'green',
      marginLeft: '50%',
    },
    bar: {
      ...baseBarStyle,
      backgroundColor: '#3f51b5',
    },
    overlayBar: {
      ...baseBarStyle,
      backgroundColor: '#ff4081',
      top: 0.5,
    },
    bottomBar: {
      ...baseBarStyle,
      backgroundColor: '#a0a9de',
    },
    bottomOverlayBar: {
      ...baseBarStyle,
      backgroundColor: '#ff9fc0',
    },
    dot: {
      ...baseDotStyle,
      backgroundColor: '#3f51b5',
    },
    overlayDot: {
      ...baseDotStyle,
      backgroundColor: '#ff4081',
      height: DOT_HEIGHT + 0.5,
      top: 0.5,
    },
    bottomDot: {
      ...baseDotStyle,
      backgroundColor: '#a0a9de',
    },
    overlayBottomDot: {
      ...baseDotStyle,
      backgroundColor: '#FFAED5',
      top: 0.5,
    },
    dotContainer: {
      width: 10,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0)',
    },
  });

  const getDynamicStyles = (
    waveHeight: number,
    isOverlay: boolean = false,
    isBottom: boolean = false,
  ) => {
    const styleCase = (isOverlay ? 2 : 0) + (isBottom ? 1 : 0);

    switch (styleCase) {
      case 3:
        return {
          ...audioWaveStyles.bottomOverlayBar,
          height: `${waveHeight + 1}%` as DimensionValue,
        };
      case 2:
        return {
          ...audioWaveStyles.overlayBar,
          height: `${waveHeight}%` as DimensionValue,
        };
      case 1:
        return {
          ...audioWaveStyles.bottomBar,
          height: `${waveHeight}%` as DimensionValue,
        };
      case 0:
      default:
        return {
          ...audioWaveStyles.bar,
          height: `${waveHeight}%` as DimensionValue,
        };
    }
  };
  return { ...audioWaveStyles, getDynamicStyles };
};

export default useAudioWaveStyles;
