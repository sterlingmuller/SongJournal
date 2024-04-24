import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  options: ViewStyle;
  textContainer: ViewStyle;
  container: ViewStyle;
}

const lyricSheetStyles: Styles = StyleSheet.create({
  container: {
    gap: 22,
  },

  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    gap: 20,
  },

  textContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: 'black',
    borderWidth: 1,
    width: '80%',
    height: '80%',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default lyricSheetStyles;
