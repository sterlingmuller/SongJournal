import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  takes: ViewStyle;
  takeSeperator: ViewStyle;
  footer: ViewStyle;
  recordingButton: ViewStyle;
}

const useSongScreenStyles = () => {
  const songScreenStyles: Styles = StyleSheet.create({
    takes: {
      paddingTop: 25,
    },
    takeSeperator: { height: 20 },
    footer: { height: 180 },
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
