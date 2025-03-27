import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  buttons: ViewStyle;
  button: ViewStyle;
  buttonContainer: ViewStyle;
  disabledButton: ViewStyle;
  buttonText: TextStyle;
}

const useSaveAndCancelButtonsStyle = () => {
  const saveAndCancelButtonsStyle: Styles = StyleSheet.create({
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    button: {
      width: 100,
      borderRadius: 10,
    },
    buttonContainer: {
      width: 100,
      paddingVertical: 7,
      paddingHorizontal: 20,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
    },
    disabledButton: {
      opacity: 0.5,
    },
  });

  return saveAndCancelButtonsStyle;
};

export default useSaveAndCancelButtonsStyle;
