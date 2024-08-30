import { SCREEN_HEIGHT } from '@src/components/common/constants';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface Styles {
  modal: ViewStyle;
  container: ViewStyle;
  textbox: ViewStyle;
  buttonContainer: ViewStyle;
  title: TextStyle;
  input: TextStyle;
}

const useTakeNotesModalStyles = () => {
  const takeNotesModalStyles: Styles = StyleSheet.create({
    modal: {
      margin: 0,
    },
    container: {
      alignSelf: 'center',
      backgroundColor: '#fff',
      width: '80%',
      maxHeight: SCREEN_HEIGHT * 0.6,
      borderRadius: 15,
      gap: 20,
    },

    title: {
      paddingTop: 35,
      paddingLeft: 40,
      fontSize: 24,
    },

    textbox: {
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      padding: 8,
      width: '85%',
      height: '64%',
      borderWidth: 1,
      borderColor: '#ccc',
      marginLeft: 25,
      marginBottom: 10,
    },

    input: {
      flex: 1,
      fontSize: 14,
    },

    buttonContainer: {
      paddingBottom: 20,
    },
  });

  return takeNotesModalStyles;
};

export default useTakeNotesModalStyles;
