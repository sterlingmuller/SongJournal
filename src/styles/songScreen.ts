import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  takes: ViewStyle;
  recordingButton: ViewStyle;
}

const useSongScreenStyles = () => {
  const songScreenStyles: Styles = StyleSheet.create({
    takes: {
      marginTop: 25,
      gap: 20,
    },
    recordingButton: {
      position: 'absolute',
      flex: 5,
      alignSelf: 'center',
      bottom: 50,
    },
  });

  return songScreenStyles;
};

export default useSongScreenStyles;
