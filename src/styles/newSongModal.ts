import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  modalContainer: ViewStyle;
  container: ViewStyle;
  textbox: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  input: TextStyle;
}

const newSongModalStyle: Styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
  },

  container: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '70%',
    height: '30%',
    borderRadius: 15,
    gap: 30,
  },

  title: {
    paddingTop: 35,
    paddingLeft: 40,
    fontSize: 24,
  },

  textbox: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 6,
    width: '75%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 35,
  },

  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  button: {
    width: 100,
    borderRadius: 10,
  },
});

export default newSongModalStyle;
