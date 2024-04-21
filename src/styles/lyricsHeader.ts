import { StyleSheet } from 'react-native';

const lyricsHeaderStyles = StyleSheet.create({
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
