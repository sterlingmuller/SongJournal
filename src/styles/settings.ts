import {StyleSheet} from 'react-native';

const settingsStyle = StyleSheet.create({
  container: {
height: '100%'
  },

  content: {
    gap: 20,
    paddingTop: 15,
    paddingHorizontal: 25,
  },

  sectionTitle: {
    fontSize: 18,
    paddingBottom: 5
  },

  title: {
    fontSize: 30,
    paddingLeft: 40
  },

  version: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center'
  },

  about: {
    textAlign: 'center',
  },

  aboutSignature: {
    textAlign: 'center',
    paddingTop: 10
  }
});

export default settingsStyle;