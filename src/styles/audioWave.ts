import { StyleSheet, ViewStyle } from 'react-native';
import { SCREEN_WIDTH } from '@src/components/common/constants';

interface Styles {
  waveContainer: ViewStyle;
  waveContent: ViewStyle;
  bar: ViewStyle;
  dotContainer: ViewStyle;
  dot: ViewStyle;
  midpointLine: ViewStyle;
}

const useAudioWaveStyles = () => {
  const audioWaveStyles: Styles = StyleSheet.create({
    waveContainer: {
      justifyContent: 'center',
      // flexDirection: 'row',
      marginLeft: '50%',
      // height: 200,
      // marginTop: 100,
      flex: 1,
      marginBottom: 200,
    },
    waveContent: {
      justifyContent: 'flex-start',
      // alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      // overflow: 'hidden',
      // width: SCREEN_WIDTH * 0.7,
    },
    midpointLine: {
      position: 'absolute',
      height: 200,
      // top: 0,
      // bottom: 0,
      width: 4,
      backgroundColor: 'green',
    },
    bar: {
      width: 6,
      marginHorizontal: 1,
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
  });

  return audioWaveStyles;
};

export default useAudioWaveStyles;
