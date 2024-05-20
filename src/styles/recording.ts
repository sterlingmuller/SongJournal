import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  recordingRow: ViewStyle;
}

const useRecordingStyles = () => {
  const recordingStyles: Styles = StyleSheet.create({
    recordingRow: {
      flexDirection: 'row',
      position: 'absolute',
      flex: 5,
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'space-around',
      width: '100%',
      bottom: 50,
    },
  });

  return recordingStyles;
};

export default useRecordingStyles;
