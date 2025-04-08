import { useColorTheme } from '@src/state/context/ThemeContext';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  recordingRow: ViewStyle;
  sideButton: ViewStyle;
  disabledButtonText: TextStyle;
  buttonText: TextStyle;
  recordButtonContainer: ViewStyle;
  timerContainer: ViewStyle;
  warningContainer: ViewStyle;
  warningText: TextStyle;
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
    disabledButtonText: {
      fontSize: 18,
      color: theme.secondaryText,
    },
    buttonText: {
      fontSize: 18,
      color: theme.primaryText,
      fontWeight: 600,
    },
    recordButtonContainer: {
      flex: 1,
      alignItems: 'center',
    },
    timerContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      position: 'absolute',
      bottom: 240,
    },
    warningContainer: {
      position: 'absolute',
      width: '80%',
      alignSelf: 'center',
      bottom: 180,
    },
    warningText: {
      textAlign: 'center',
      color: theme.error,
      fontWeight: 'bold',
      fontSize: 16,
    },
    timer: { fontSize: 92 },
  });

  return recordingStyles;
};

export default useRecordingStyles;
