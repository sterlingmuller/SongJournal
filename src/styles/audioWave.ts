import { StyleSheet, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/context/ThemeContext';
import { SCREEN_WIDTH } from '@src/common/constants';

interface Styles {
  waveContainer: ViewStyle;
  bar: ViewStyle;
  dotContainer: ViewStyle;
  dot: ViewStyle;
}

const useAudioWaveStyles = () => {
  const { theme } = useColorTheme();

  const audioWaveStyles: Styles = StyleSheet.create({
    waveContainer: {
      alignSelf: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      height: 200,
      width: SCREEN_WIDTH * 0.7,
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
  });

  return audioWaveStyles;
};

export default useAudioWaveStyles;