import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  container: ViewStyle;
  contents: ViewStyle;
  iconRow: ViewStyle;
  playIcon: ViewStyle;
  playbackBar: ViewStyle;
  title: TextStyle;
}

const songFolderStyle: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingLeft: 25,
    paddingRight: 30,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    justifyContent: 'space-between',
    alignContent: 'center',
  },

  contents: {
    flexDirection: 'column',
    gap: 10,
  },

  title: {
    fontSize: 24,
  },

  iconRow: {
    flexDirection: 'row',
    gap: 24,
  },

  playIcon: {
    position: 'absolute',
    alignSelf: 'center',
    paddingBottom: 40,
    right: 40,
  },

  playbackBar: {
    height: 15,
    width: '66%',
    backgroundColor: 'coral',
    alignSelf: 'center',
  },
});

export default songFolderStyle;
