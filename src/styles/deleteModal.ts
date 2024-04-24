import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  modalContainer: ViewStyle;
  container: ViewStyle;
  buttons: ViewStyle;
  button: ViewStyle;
  title: TextStyle;
  text: TextStyle;
}

const deleteModalStyle: Styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    justifyContent: 'center',
  },

  container: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: '70%',
    borderRadius: 15,
    padding: 20,
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 20,
    fontWeight: '500',
  },

  text: {
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 30,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 5,
  },

  button: {
    width: 100,
    borderRadius: 10,
  },
});

export default deleteModalStyle;
