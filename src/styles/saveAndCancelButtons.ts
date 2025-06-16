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
      minWidth: 100,
      paddingVertical: 7,
      paddingHorizontal: 20,
      marginVertical: 7,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    disabledButton: {
      opacity: 0.6,
    },
  });

  return saveAndCancelButtonsStyle;
};

export default useSaveAndCancelButtonsStyle;
