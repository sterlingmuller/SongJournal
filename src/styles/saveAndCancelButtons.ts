import { StyleSheet, ViewStyle } from 'react-native';

interface Styles {
  buttons: ViewStyle;
  button: ViewStyle;
}

const saveAndCancelButtonsStyle: Styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  button: {
    width: 100,
    borderRadius: 10,
  },
});

export default saveAndCancelButtonsStyle;
