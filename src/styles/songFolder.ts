import { StyleSheet } from 'react-native';

const songFolderStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 20,
    width: '100%',
    height: '15%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },

  info: {
    flexDirection: 'column',
    gap: 10
  }
});

export default songFolderStyle;