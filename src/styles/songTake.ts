import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  contents: ViewStyle;
  container: ViewStyle;
  iconRow: ViewStyle;
  playIcon: ViewStyle;
  playbackBar: ViewStyle;
  title: TextStyle;
}

const songTakeStyle: Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    paddingLeft: 25,
    paddingRight: 30,
    width: '90%',
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
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
    gap: 18,
  },

  playIcon: {
    position: 'absolute',
    alignSelf: 'center',
    paddingBottom: 40,
    right: 20,
  },

  playbackBar: {
    height: 15,
    width: '52%',
    backgroundColor: 'coral',
    alignSelf: 'center',
    marginLeft: 10,
  },
});

export default songTakeStyle;
