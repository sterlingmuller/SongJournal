import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { useColorTheme } from '@src/state/context/ThemeContext';

interface Styles {
  container: ViewStyle;
  slider: ViewStyle;
  track: ViewStyle;
  timeContainer: ViewStyle;
  timeText: TextStyle;
}

const usePlaybackBarStyles = () => {
  const { theme } = useColorTheme();

  const playbackBarStyles: Styles = StyleSheet.create({
    // playbackBar: {
    //   height: 15,
    //   width: '66%',
    //   backgroundColor: theme.primary,
    //   alignSelf: 'center',
    // },
    container: {
      width: '60%',
      marginLeft: 20,
    },
    slider: {
      width: 200,
      height: 40,
    },
    timeContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-between',
      // marginTop: 8,
      gap: 10,
    },
    timeText: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    track: {
      height: 30, // Adjust the height to control thickness
      borderRadius: 5,
    },
  });

  return playbackBarStyles;
};

export default usePlaybackBarStyles;
