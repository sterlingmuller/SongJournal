import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  titlePlusArrow: ViewStyle;
  info: ViewStyle;
}

const lyricsHeaderStyles: Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    height: 115,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'coral',
    zIndex: 10,
    paddingHorizontal: 20,
  },

  titlePlusArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },

  title: {
    fontSize: 32,
  },

  info: {
    left: 0,
  },
});

export default lyricsHeaderStyles;
