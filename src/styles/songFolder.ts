import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  rowContainer: ViewStyle;
  contents: ViewStyle;
  iconRow: ViewStyle;
  playIcon: ViewStyle;
  deleteRow: ViewStyle;
  playbackBar: ViewStyle;
  deleteButton: ViewStyle;
  rowPressed: ViewStyle;
  title: TextStyle;
}

const songFolderStyle: Styles = StyleSheet.create({
  rowContainer: {
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

  rowPressed: { backgroundColor: '#DDD' },

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

  deleteRow: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },

  deleteButton: {
    right: 30,
  },
});

export default songFolderStyle;
