import { StyleSheet } from 'react-native';

const settingsStyle = StyleSheet.create({
  container: {
    height: '100%',
  },

  content: {
    gap: 20,
    paddingTop: 15,
    paddingHorizontal: 25,
  },

  sectionTitle: {
    fontSize: 16,
    paddingBottom: 5,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    paddingLeft: 40,
  },

  version: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },

  about: {
    textAlign: 'center',
  },

  aboutSignature: {
    textAlign: 'center',
    paddingTop: 10,
  },

  selectedTheme: {
    backgroundColor: '#C5C2B7',
    borderRadius: 20,
    marginRight: 40,
  },

  themeLabel: {
    paddingVertical: 4,
    marginLeft: 55,
  },
});

export default settingsStyle;
