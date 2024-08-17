import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  recordingRow: ViewStyle;
  sideButton: ViewStyle;
  buttonText: TextStyle;
  recordButtonContainer: ViewStyle;
  timerContainer: ViewStyle;
  timer: TextStyle;
}

const useRecordingStyles = () => {
  const { theme } = useColorTheme();

  const recordingStyles: Styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
      display: 'flex',
      flexDirection: 'column',
    },
    recordingRow: {
      flexDirection: 'row',
      position: 'absolute',
      flex: 5,
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      bottom: 50,
    },
    sideButton: {
      width: 120,
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
    },
    recordButtonContainer: {
      flex: 1,
      alignItems: 'center',
    },
    timerContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 200,
    },
    timer: { fontSize: 82 },
  });

  return recordingStyles;
};

export default useRecordingStyles;
