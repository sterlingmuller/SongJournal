import { StyleSheet, ViewStyle } from 'react-native';

interface CreateNewSongButtonStyles {
  container: ViewStyle;
}

const createNewSongButtonStyles: CreateNewSongButtonStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 5,
    backgroundColor: '#fcd470',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 25,
    paddingHorizontal: 35,
    bottom: 100,
    right: 0,
    marginRight: 20,
    marginBottom: 20,
    elevation: 5,
  },
});

export default createNewSongButtonStyles;
