import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  infoContainer: ViewStyle;
  editTextContainer: ViewStyle;
  lyricsContainer: ViewStyle;
  container: ViewStyle;
  details: ViewStyle;
}

const useLyricScreenStyles = () => {
  const lyricScreenStyles: Styles = StyleSheet.create({
    container: {
      gap: 22,
    },

    infoContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingTop: 20,
      gap: 20,
    },

    editTextContainer: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      borderColor: 'black',
      borderWidth: 1,
      width: '80%',
      height: '78%',
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },

    lyricsContainer: {
      paddingLeft: 35,
    },

    details: {
      flexDirection: 'row',
      gap: 10,
    },
  });

  return lyricScreenStyles;
};

export default useLyricScreenStyles;
