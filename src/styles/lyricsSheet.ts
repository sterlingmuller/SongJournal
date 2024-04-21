import { StyleSheet } from 'react-native';

const lyricSheetStyles = StyleSheet.create({
  container: {},

  options: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25,
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
