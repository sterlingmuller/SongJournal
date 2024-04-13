import {StyleSheet} from 'react-native';

const settingsStyle = StyleSheet.create({
  container: {
height: '100%'
  },

  header: {

  },

  content: {
    gap: 15
  },

  text: {
  },

  sectionTitle: {
    fontSize: 16,
    paddingLeft: 15
  },

  title: {
    fontSize: 24,
    paddingLeft: 30
  },

  version: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center'
  }
});

export default settingsStyle;